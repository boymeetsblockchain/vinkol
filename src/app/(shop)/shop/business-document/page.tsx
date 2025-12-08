"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/button";
import { useSubmitBusinessDoc } from "@/services/shops/mutation";
import Link from "next/link";

function Complete() {
  const router = useRouter();

  const [docType, setdocType] = useState<string>("");
  const [idImage, setIdImage] = useState<File | null>(null);

  const { mutate: submitBusinessDoc, isPending } = useSubmitBusinessDoc();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("documentType", docType);
    if (idImage) {
      formData.append("image", idImage);
    }

    // console.log("Submitting KYC with formData:", formData.values());
    submitBusinessDoc(formData, {
      onSuccess: () => {
        toast.success("Business Document submitted successfully!");
        router.push("/shop/account");
      },
      onError: (error) => {
        console.error("Business document submission failed:", error);
        toast.error(error.message || "Failed to submit business document.");
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
              <h1 className="text-3xl font-bold ">
                Complete Registration (Business Documents)
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Submit a copy of your business registration documents eg: CAC,
                Certificate of Incorporation, Memorandum & Article of
                Registration.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* ID Type Select */}
              <div className="flex flex-col gap-2">
                <label htmlFor="documentType" className="text-sm text-gray-700">
                  Select Document Type
                </label>
                <select
                  id="documentType"
                  className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 focus:outline-none"
                  value={docType}
                  onChange={(e) => setdocType(e.target.value)}
                  disabled={isPending}
                  required
                >
                  <option value="">Select Document Type</option>
                  <option value="cac">CAC</option>
                  <option value="certificate-of-incorporation">
                    Certificate of Incorporation
                  </option>
                  <option value="memorandum-of-registration">
                    Memorandum/Article of Registration
                  </option>
                </select>
              </div>

              {/* ID Image Upload */}
              <div className="flex flex-col gap-2">
                <label htmlFor="idImage" className="text-sm text-gray-700">
                  Upload Business Document Image (Max 2MB)
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
                {isPending ? "Submitting..." : "Submit Business Document"}
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
