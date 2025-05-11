"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";

function Complete() {
  const router = useRouter();

  return (
    <section className="max-w-screen-2xl w-full px-4 md:px-20 py-10 mx-auto">
      {/* Logo */}
      <div className="mb-8">
        <img src="/logo.png" alt="Vinkol Logo" className="w-28 h-12" />
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

            {/* Phone Input */}
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Select ID"
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              />
            </div>

            {/* OTP Input */}
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Select Image"
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              />
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Vehicle Type"
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              />
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Vehicle Images(s)"
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              />
            </div>

            {/* Submit Button */}
            <Button
              variant="auth"
              className="w-full rounded-md mt-4"
              onClick={() => router.push("/rider/complete-auth")}
            >
              Submit
            </Button>
          </div>

          {/* Right: Image Section */}
          <div className="hidden md:block w-full  h-full">
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
