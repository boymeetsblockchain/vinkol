"use client";
import { Button } from "@/components/button";
import { Header } from "@/components/shop/header";
import { useRouter } from "next/navigation";
import { useGetAllBanks } from "@/services/shops/query";
import {
  useValidateBankDetials,
  useCreateStoreBank,
  useRequestITSupport,
} from "@/services/shops/mutation";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import Link from "next/link";
import Checkbox from "@/components/shared/checkbox";

function AccountDetails() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const { data: banksData, isLoading: isLoadingBanks } = useGetAllBanks();

  const [formData, setFormData] = useState({
    bankCode: "",
    accountNumber: "",
    accountName: "",
  });
  const [accountVerified, setAccountVerified] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    mutate: validateBank,
    isPending: validatingBankLoading,
    data: validatedAccountData,
    isSuccess: validationSuccess,
    isError: validationError,
  } = useValidateBankDetials();

  const {
    mutate: createStoreBank,
    isPending: creatingStoreBank,
    isSuccess: createSuccess,
    isError: createError,
    error: createErrorMessage,
  } = useCreateStoreBank();

  const {
    mutate: requestSupport,
    // isPending: creatingStoreBank,
    // isSuccess: createSuccess,
    // isError: createError,
    error: supportErrorMessage,
  } = useRequestITSupport();

  useEffect(() => {
    if (formData.accountNumber.length === 10 && formData.bankCode) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        validateBank({
          accountNumber: formData.accountNumber,
          bankCode: formData.bankCode,
        });
      }, 500);
    } else {
      setAccountVerified(false);
      setFormData((prev) => ({ ...prev, accountName: "" }));
    }
  }, [formData.accountNumber, formData.bankCode, validateBank]);

  useEffect(() => {
    if (validationSuccess && validatedAccountData?.success) {
      setFormData((prev) => ({
        ...prev,
        accountName: validatedAccountData.data.account_name,
      }));
      setAccountVerified(true);
      toast.success("Account verified successfully!");
    } else if (validationError) {
      setFormData((prev) => ({ ...prev, accountName: "" }));
      setAccountVerified(false);
      toast.error("Account verification failed. Please check details.");
    }
  }, [validationSuccess, validatedAccountData, validationError]);

  useEffect(() => {
    if (createSuccess) {
      toast.success("Bank details saved successfully!");
      router.push("/shop/dashboard");
    } else if (createError) {
      toast.error(
        `Failed to save bank details: ${
          createErrorMessage?.message || "Unknown error"
        }`
      );
    }
  }, [createSuccess, createError, createErrorMessage, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "accountNumber" || name === "bankCode") {
      setAccountVerified(false);
      setFormData((prev) => ({ ...prev, accountName: "" }));
    }
  };

  const handleSubmit = () => {
    if (!accountVerified) {
      toast.error("Please verify your account details first.");
      return;
    }

    const selectedBank = banksData?.data.find(
      (bank: any) => bank.code === formData.bankCode
    );

    if (!selectedBank) {
      toast.error("Selected bank not found.");
      return;
    }

    if (checked) {
      requestSupport({});
    }

    createStoreBank({
      accountName: formData.accountName,
      bankCode: formData.bankCode,
      accountNumber: formData.accountNumber,
      bankName: selectedBank.name,
    });
  };

  return (
    <section className="min-h-screen flex flex-col bg-white">
      <Header />

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="w-full flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Account Details
              </h1>
              <h2 className="text-sm text-gray-600 mt-1">
                Complete details to complete profile
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <select
                name="bankCode"
                value={formData.bankCode}
                onChange={handleInputChange}
                disabled={
                  isLoadingBanks || validatingBankLoading || creatingStoreBank
                }
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-md text-blue-primary text-base"
              >
                <option value="">Select Bank</option>
                {banksData?.data.map((bank: any, index: number) => (
                  <option key={index} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
              </select>

              <div className="relative">
                <input
                  type="number"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  placeholder="Account number"
                  className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-md placeholder:text-blue-primary placeholder:text-base"
                  maxLength={10}
                  disabled={validatingBankLoading || creatingStoreBank}
                />
                {validatingBankLoading && (
                  <div className="absolute right-3 top-2.5">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                  </div>
                )}
              </div>

              <input
                type="text"
                name="accountName"
                value={formData.accountName}
                onChange={handleInputChange}
                placeholder="Account name"
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-md placeholder:text-blue-primary placeholder:text-base"
                readOnly
              />

              {accountVerified && (
                <div className="text-green-600 text-sm">✓ Account verified</div>
              )}
            </div>
            <div>
              <Checkbox
                isChecked={checked}
                onChange={() => setChecked(!checked)}
                label="Check this box if you will need assistance from our IT team"
              />{" "}
            </div>

            <Button
              variant="auth"
              className="w-full rounded-md mt-4"
              onClick={handleSubmit}
              disabled={
                !accountVerified || creatingStoreBank || validatingBankLoading
              }
            >
              {creatingStoreBank ? "Submitting..." : "Submit"}
            </Button>
            <Button
              variant="outline"
              className="rounded-md text-blue-500 -mt-4"
            >
              <Link href={"/shop/dashboard"} className="w-full">
                Skip
              </Link>
            </Button>
          </div>

          <div className="hidden md:block">
            <img
              src="/assets/riderauth.jpg"
              alt="Rider Auth Illustration"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountDetails;
