"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";

function Profile() {
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
              <h1 className="text-3xl font-bold text-blue-primary">
                Number Verification
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Enter your phone number to receive an OTP.
              </p>
            </div>

            {/* Phone Input */}
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-md placeholder:text-gray-500"
              />
              <div className="flex justify-between items-center text-xs text-gray-500">
                <p>Didn’t receive OTP? Retry in 32s</p>
                <button className="text-blue-600 hover:underline">
                  Resend
                </button>
              </div>
            </div>

            {/* OTP Input */}
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-md placeholder:text-gray-500"
              />
            </div>

            {/* Submit Button */}
            <Button
              variant="auth"
              className="w-full rounded-md mt-4"
              onClick={() => router.push("/rider/complete")}
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

export default Profile;
