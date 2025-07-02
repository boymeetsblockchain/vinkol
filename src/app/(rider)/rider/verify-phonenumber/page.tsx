"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/button";
import { useVerifyPhoneNumber, useSendSmsOtp } from "@/services/rider/mutation";
import Link from "next/link";

function Complete() {
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: verifyPhone } = useVerifyPhoneNumber();
  const { mutate: sendOtp } = useSendSmsOtp();

  const handleSendOtp = async () => {
    if (!phone) {
      toast.error("Please enter your phone number first");
      return;
    }

    // Basic phone validation
    if (!phone.startsWith("+") || phone.length < 10) {
      toast.error("Please enter a valid phone number with country code");
      return;
    }

    const email = localStorage.getItem("ride-email");
    if (!email) {
      toast.error("Email not found");
      return;
    }

    setIsLoading(true);
    try {
      await sendOtp({ phone, email });
      toast.success("OTP sent successfully");
      setOtpSent(true);
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPhone = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }

    const email = localStorage.getItem("ride-email");
    if (!email) {
      toast.error("Email not found");
      return;
    }

    setIsLoading(true);
    try {
      await verifyPhone({ email, phone, otp });
      toast.success("Phone number verified successfully");
      router.push("/rider/account");
    } catch (error: any) {
      toast.error(error.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
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
              <h1 className="text-3xl font-bold">Verify Phone Number</h1>
              <p className="text-sm text-gray-600 mt-1">
                {otpSent
                  ? "Enter the OTP sent to your phone"
                  : "Submit your phone number to receive OTP"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleVerifyPhone} className="flex flex-col gap-6">
              {/* Phone Number Input */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-md placeholder:text-gray-500"
                  id="phone"
                  type="tel"
                  placeholder="+2348137584161"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={otpSent}
                />
              </div>
              {otpSent && (
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    OTP Code
                  </label>
                  <input
                    className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-md placeholder:text-gray-500"
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                {!otpSent ? (
                  <Button
                    type="button"
                    variant="auth"
                    className="w-full rounded-md"
                    onClick={handleSendOtp}
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send OTP"}
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="auth"
                      className="w-full rounded-md"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Verifying..." : "Verify Phone Number"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full rounded-md"
                      onClick={() => setOtpSent(false)}
                      disabled={isLoading}
                    >
                      Change Phone Number
                    </Button>
                  </>
                )}
              </div>
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
