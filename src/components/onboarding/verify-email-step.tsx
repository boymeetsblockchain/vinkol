"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/button";
import { OnboardingShell } from "@/components/onboarding/shell";
import { OnboardingRole, pathAfter } from "@/lib/onboarding/steps";
import {
  useResendOtpMutation as useResendStoreOtp,
  useVerifyEmailMutation as useVerifyStoreEmail,
} from "@/services/shops/mutation";
import {
  useResendOtpMutation as useResendUserOtp,
  useVerifyEmailMutation as useVerifyUserEmail,
} from "@/services/rider/mutation";

/**
 * Email verification, for any role.
 *
 * Was three copies of the same 212-line component — one per role — differing
 * only in which service module they imported and two hardcoded push targets.
 *
 * No profile is fetched: `accessToken` is written by this step's own mutation,
 * so a read on mount would be unauthenticated. This is step 1 of every flow,
 * so the stepper is correct without one.
 */

const RESEND_SECONDS = 60;

const backTo: Record<OnboardingRole, { path: string; label: string }> = {
  store: { path: "/shop/login", label: "Back to login" },
  rider: { path: "/become-a-rider", label: "Back to rider info" },
  shopper: {
    path: "/become-a-personal-shopper",
    label: "Back to shopper info",
  },
};

export const VerifyEmailStep = ({ role }: { role: OnboardingRole }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [otp, setOtp] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  // Both are hooked unconditionally so hook order never varies by role; a
  // mutation fires nothing until it is called.
  const storeVerify = useVerifyStoreEmail();
  const userVerify = useVerifyUserEmail();
  const storeResend = useResendStoreOtp();
  const userResend = useResendUserOtp();

  const verify = role === "store" ? storeVerify : userVerify;
  const resend = role === "store" ? storeResend : userResend;

  const email = searchParams.get("email") ?? "";

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((n) => n - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length < 4) {
      toast.error("Please enter the 4-digit code.");
      return;
    }
    if (!email) {
      toast.error("We could not tell which account this is. Please sign up again.");
      return;
    }

    verify.mutate(
      { email, otp },
      {
        onSuccess: () => {
          toast.success("Email verified.");
          // Asked of the sequence rather than hardcoded, so this step cannot
          // skip its successor or cross into another role's flow.
          router.push(pathAfter(role, "verify-email", undefined, false));
        },
        onError: (error: Error) =>
          toast.error(error.message || "That code did not work."),
      },
    );
  };

  const handleResend = () => {
    if (!email) {
      toast.error("We could not tell which account this is.");
      return;
    }

    resend.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success("A new code is on its way.");
          setSecondsLeft(RESEND_SECONDS);
        },
        onError: (error: Error) =>
          toast.error(error.message || "Could not resend the code."),
      },
    );
  };

  return (
    <OnboardingShell
      role={role}
      stepKey="verify-email"
      title="Verify your email"
      description={
        email
          ? `We sent a 4-digit code to ${email}. Enter it below to continue.`
          : "Enter the 4-digit code we emailed you."
      }
    >
      <form onSubmit={handleVerify} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="otp" className="text-sm font-medium text-gray-700">
            Verification code
          </label>
          <input
            id="otp"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={4}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 py-3 px-4 rounded-xl text-center tracking-[0.5em] text-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:bg-white transition-all"
            placeholder="0000"
            required
            disabled={verify.isPending}
          />
        </div>

        <Button
          variant="auth"
          type="submit"
          className="w-full rounded-md"
          disabled={verify.isPending || otp.length < 4}
        >
          {verify.isPending ? "Verifying…" : "Verify email"}
        </Button>

        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <span>
            Didn&rsquo;t get it?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={secondsLeft > 0 || resend.isPending}
              className="text-[var(--color-blue-primary)] underline underline-offset-4 disabled:text-gray-400 disabled:no-underline"
            >
              {resend.isPending
                ? "Sending…"
                : secondsLeft > 0
                  ? `Resend in ${secondsLeft}s`
                  : "Resend the code"}
            </button>
          </span>

          <button
            type="button"
            onClick={() => router.push(backTo[role].path)}
            className="text-gray-500 hover:text-gray-900 underline underline-offset-4 w-fit"
          >
            {backTo[role].label}
          </button>
        </div>
      </form>
    </OnboardingShell>
  );
};
