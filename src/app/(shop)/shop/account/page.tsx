"use client";
import { Button } from "@/components/button";
import { Header } from "@/components/shop/header";
import { useRouter } from "next/navigation";

function AccountDetails() {
  const router = useRouter();

  return (
    <section className="min-h-screen flex flex-col bg-white">
      <Header />

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left: Form Section */}
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
              <input
                type="text"
                placeholder="Select Bank"
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-md placeholder:text-blue-primary placeholder:text-base"
              />
              <input
                type="number"
                placeholder="Account number"
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-md placeholder:text-blue-primary placeholder:text-base"
              />
              <input
                type="text"
                placeholder="Name"
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-md placeholder:text-blue-primary placeholder:text-base"
              />
            </div>

            <Button
              variant="auth"
              className="w-full rounded-md mt-4"
              onClick={() => router.push("/shop/dashboard")}
            >
              Submit
            </Button>
          </div>

          {/* Right: Image Section */}
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
