"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/button";
import { useSubmitKycMutation } from "@/services/rider/mutation";
import Link from "next/link";

function Complete() {
  const router = useRouter();

  const [idType, setIdType] = useState<string>("");
  const [idImage, setIdImage] = useState<File | null>(null);

  const { mutate: submitKyc, isPending } = useSubmitKycMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("idType", idType);
    if (idImage) {
      formData.append("image", idImage);
    }

    console.log("Submitting KYC with formData:", formData.values());
    submitKyc(formData, {
      onSuccess: () => {
        toast.success("KYC submitted successfully!");
        router.push("/become-a-personal-shopper");
      },
      onError: (error) => {
        console.error("KYC submission failed:", error);
        toast.error(error.message || "Failed to submit KYC.");
      },
    });
  };

  return (
    <section className="max-w-screen-2xl w-full px-4 md:px-20 py-10 mx-auto">
      {/* Logo */}
      <div className="mb-8">
        <Link href={"/"}>
          {" "}
          <img src="/logo.png" alt="Vinkol Logo" className="w-28 h-12" />
        </Link>
      </div>

      {/* Content Grid */}
      <div className="flex items-center h-full justify-center max-w-screen-xl mx-auto w-full">
        <div className="grid grid-cols-1 w-full h-full md:grid-cols-2 gap-12">
          {/* Left: Form Section */}
          <div className="w-full flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold ">Complete Registration</h1>
              <p className="text-sm text-gray-600 mt-1">Submit the following</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* ID Type Select */}
              <div className="flex flex-col gap-2">
                <label htmlFor="idType" className="text-sm text-gray-700">
                  Select ID Type
                </label>
                <select
                  id="idType"
                  className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 focus:outline-none"
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  disabled={isPending}
                  required
                >
                  <option value="">Select ID Type</option>
                  <option value="nin">NIN</option>
                  <option value="national_id">National ID</option>
                  <option value="drivers_license">Driver's License</option>
                  <option value="passport">Passport</option>
                </select>
              </div>

              {/* ID Image Upload */}
              <div className="flex flex-col gap-2">
                <label htmlFor="idImage" className="text-sm text-gray-700">
                  Upload ID Image
                </label>
                <input
                  id="idImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setIdImage(e.target.files ? e.target.files[0] : null)
                  }
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  disabled={isPending}
                  required
                />
                {idImage && (
                  <p className="text-xs text-gray-500">
                    Selected file: {idImage.name}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                variant="auth"
                className="w-full rounded-md mt-4"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit KYC"}
              </Button>
            </form>
          </div>

          {/* Right: Image Section */}
          <div className="hidden md:block w-full h-full">
            <img
              src="/assets/riderauth.jpg"
              alt="Rider Auth Illustration"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Complete;
