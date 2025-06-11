"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button"; // Assuming your Button component path
import {
  useVerifyEmailMutation,
  useResendOtpMutation,
} from "@/services/shops/mutation"; // Assuming these are correctly defined

// Define the props for the VerifyOtpPage component (if any are passed from parent)
interface VerifyOtpPageProps {
  // No specific props are needed for this page as it will fetch email from URL or state
}

/**
 * VerifyOtpPage component allows users to enter an OTP received via email
 * to verify their account. It also provides an option to resend the OTP.
 */
export const VerifyOtpPage = ({}: VerifyOtpPageProps) => {
  // State to store the OTP entered by the user
  const [otp, setOtp] = useState<string>("");
  // State to store the email, potentially pre-filled from URL params or previous navigation
  const [email, setEmail] = useState<string>("");
  // State for a countdown timer for OTP resend
  const [resendTimer, setResendTimer] = useState<number>(60); // 60 seconds
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);

  // Initialize Next.js router and search params hook
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize mutations for email verification and OTP resend
  const {
    mutate: verifyEmail,
    isPending: isVerifying,
    isSuccess: isVerifySuccess,
    isError: isVerifyError,
    error: verifyError,
  } = useVerifyEmailMutation();

  const {
    mutate: resendOtp,
    isPending: isResending,
    isSuccess: isResendSuccess,
    isError: isResendError,
    error: resendError,
  } = useResendOtpMutation();

  // Effect to extract email from URL search parameters on component mount
  useEffect(() => {
    const emailFromParams = searchParams.get("email");
    if (emailFromParams) {
      setEmail(emailFromParams);
    } else {
      toast.error("Email not found. Please go back to registration.");
      // router.push("/rider/register");
    }
  }, [searchParams, router]);

  // Effect for the resend OTP countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined;
    if (isResendDisabled && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setIsResendDisabled(false);
      if (timer) clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer); // Cleanup on unmount
    };
  }, [isResendDisabled, resendTimer]);

  // Effect to handle success/error states for verifyEmail mutation
  useEffect(() => {
    if (isVerifySuccess) {
      toast.success("Email verified successfully!");
      // Redirect to a dashboard or login page after successful verification
      router.push("/shop/setup-profile");
    }
    if (isVerifyError) {
      const errorMessage = verifyError?.message || "Email verification failed.";
      toast.error(errorMessage);
    }
  }, [isVerifySuccess, isVerifyError, verifyError, router]);

  // Effect to handle success/error states for resendOtp mutation
  useEffect(() => {
    if (isResendSuccess) {
      toast.success("OTP resent successfully! Check your email.");
      setResendTimer(60); // Reset timer
      setIsResendDisabled(true); // Disable resend button
    }
    if (isResendError) {
      const errorMessage = resendError?.message || "Failed to resend OTP.";
      toast.error(errorMessage);
    }
  }, [isResendSuccess, isResendError, resendError]);

  /**
   * Handles the OTP verification form submission.
   * @param {React.FormEvent} e - The form event.
   */
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }
    if (!email) {
      toast.error("Email is missing. Cannot verify OTP.");
      return;
    }

    // Call the verifyEmail mutation
    verifyEmail({ email, otp });
  };

  /**
   * Handles the resend OTP request.
   */
  const handleResendOtp = () => {
    if (!email) {
      toast.error("Email is missing. Cannot resend OTP.");
      return;
    }

    resendOtp({ email });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Verify Your Email
          </h1>
          <p className="mt-2 text-gray-600">
            A 4-digit verification code has been sent to{" "}
            <span className="font-semibold text-blue-600">
              {email || "your email"}
            </span>
            . Please enter it below.
          </p>
        </div>

        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-700"
          >
            Verification Code
          </label>
          <input
            id="otp"
            name="otp"
            type="text" // Use text for OTP, but enforce numeric input with pattern/validation
            inputMode="numeric"
            pattern="[0-9]{4}" // Expects exactly 6 digits
            maxLength={4}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center tracking-widest"
            placeholder="______"
            required
            disabled={isVerifying}
          />

          <Button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isVerifying}
          >
            {isVerifying ? "Verifying..." : "Verify Account"}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600">
          <p>
            Didn't receive the code?{" "}
            <Button
              variant="link" // Assuming you have a 'link' variant for a button that looks like text
              onClick={handleResendOtp}
              disabled={isResendDisabled || isResending}
              className="text-blue-600 hover:underline px-0"
            >
              {isResending
                ? "Sending..."
                : isResendDisabled
                ? `Resend in ${resendTimer}s`
                : "Resend Code"}
            </Button>
          </p>
          <p className="mt-2">
            <Button
              variant="link"
              onClick={() => router.push("/shop/login")} // Redirect to login page
              className="text-gray-600 hover:underline px-0"
            >
              Go back to Login
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};
