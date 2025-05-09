"use client";
import { Button } from "@/components/button";

import { useRouter } from "next/navigation";
function CompleteAuthPage() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/rider/dashboard");
  };
  return (
    <section className="max-w-screen-2xl min-h-screen w-full px-4 md:px-20 py-10 mx-auto">
      {/* Logo */}
      <div className="mb-8">
        <img src="/logo.png" alt="Vinkol Logo" className="w-28 h-12" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center w-full h-full text-center gap-2">
        {/* Image */}
        <div className="w-40 h-40 md:w-1/3 md:h-1/3">
          <img
            src="/assets/check.png"
            alt="Check Icon"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Headings */}
        <h1 className="text-2xl md:text-3xl font-bold ">Document Submitted</h1>
        <p className="text-sm md:text-base text-gray-700 max-w-md">
          Your documents are being reviewed. You’ll be ready to take orders in
          less than 20 minutes if everything checks out.
        </p>

        {/* Button */}
        <Button
          className="mt-4 px-6 py-3 rounded-md text-white bg-blue-primary"
          onClick={handleClick}
        >
          Go to Dashboard
        </Button>
      </div>
    </section>
  );
}

export default CompleteAuthPage;
