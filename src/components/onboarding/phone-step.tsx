"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/button";
import { OnboardingShell } from "@/components/onboarding/shell";
import { useMarket } from "@/lib/markets/useMarket";
import { normalizePhone, phonePlaceholder } from "@/lib/phone";
import {
  OnboardingRole,
  completedSteps,
  pathAfter,
} from "@/lib/onboarding/steps";
import { useSendSmsOtp, useVerifyPhoneNumber } from "@/services/rider/mutation";
import { useGetUserBank, useUserProfile } from "@/services/rider/query";

/**
 * Phone verification for riders and shoppers.
 *
 * Shared rather than copied: the shopper flow had no phone step at all, and the
 * rider one read the email from a localStorage key ("ride-email") that only the
 * rider auth modal ever wrote — so the same page would have failed outright for
 * a shopper. The email comes from the profile now, with the old key as a
 * fallback for anyone mid-flow.
 */

const FIELD =
  "w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:bg-white transition-all";

export const PhoneStep = ({ role }: { role: OnboardingRole }) => {
  const router = useRouter();
  const { data: profileData } = useUserProfile();
  const { data: userBank } = useGetUserBank();
  const profile = profileData?.data;
  const market = useMarket(profile?.country);

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: sendOtp } = useSendSmsOtp();
  const { mutateAsync: verifyPhone } = useVerifyPhoneNumber();

  const email =
    profile?.email ??
    (typeof window !== "undefined"
      ? localStorage.getItem("ride-email")
      : null);

  // Was `bank` or the dashboard, which jumped over ID, vehicle and guarantor —
  // collecting payout details before any of the checks that justify them.
  const nextPath = pathAfter(role, "phone", profile, !!userBank?.data);

  const handleSendOtp = async () => {
    const normalized = normalizePhone(phone, market.country);
    if (!normalized) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    if (!email) {
      toast.error("We could not find your account. Please sign in again.");
      return;
    }

    setIsLoading(true);
    try {
      await sendOtp({ phone: normalized, email });
      setPhone(normalized);
      toast.success(`Code sent to ${normalized}`);
      setOtpSent(true);
    } catch (error: any) {
      toast.error(error?.message ?? "Failed to send the code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length < 4) {
      toast.error("Please enter the 4-digit code.");
      return;
    }
    if (!email) {
      toast.error("We could not find your account. Please sign in again.");
      return;
    }

    setIsLoading(true);
    try {
      await verifyPhone({ email, phone, otp });
      toast.success("Phone number verified.");
      router.push(nextPath);
    } catch (error: any) {
      toast.error(error?.message ?? "Verification failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OnboardingShell
      role={role}
      stepKey="phone"
      profile={profile}
      title="Verify your phone number"
      description="Customers and our support team reach you on this number, so we send a code to confirm it works."
      completed={completedSteps(role, profile, !!userBank?.data)}
    >
      <form onSubmit={handleVerify} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            className={FIELD}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={phonePlaceholder(market.country)}
            disabled={otpSent}
            required
          />
        </div>

        {!otpSent ? (
          <Button
            variant="auth"
            type="button"
            className="w-full rounded-md"
            onClick={handleSendOtp}
            disabled={isLoading || !phone}
          >
            {isLoading ? "Sending…" : "Send code"}
          </Button>
        ) : (
          <>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="otp" className="text-sm font-medium text-gray-700">
                Enter the 4-digit code
              </label>
              <input
                id="otp"
                inputMode="numeric"
                maxLength={4}
                className={FIELD}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="1234"
                required
              />
            </div>

            <Button
              variant="auth"
              type="submit"
              className="w-full rounded-md"
              disabled={isLoading || otp.length < 4}
            >
              {isLoading ? "Verifying…" : "Verify"}
            </Button>

            <button
              type="button"
              onClick={() => {
                setOtpSent(false);
                setOtp("");
              }}
              className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4 w-fit"
            >
              Use a different number
            </button>
          </>
        )}
      </form>
    </OnboardingShell>
  );
};
