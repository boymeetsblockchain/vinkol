"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/button";
import { Country } from "@/lib/markets/types";
import { normalizePhone, phonePlaceholder } from "@/lib/phone";
import { useSendSmsOtp, useVerifyPhoneNumber } from "@/services/rider/mutation";

/**
 * Send a code, then confirm it. Shared by the onboarding step and the
 * dashboard, in the same shape as `BankForm` — which is what let the bank step
 * be skipped safely. Phone verification had no dashboard equivalent at all, so
 * a shopper who skipped it had no route back from anywhere in the UI.
 */

const FIELD =
  "w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:bg-white transition-all";

interface Props {
  email: string | null;
  country: Country;
  onVerified: () => void;
  initialPhone?: string;
}

export const VerifyPhoneForm = ({
  email,
  country,
  onVerified,
  initialPhone = "",
}: Props) => {
  const [phone, setPhone] = useState(initialPhone);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: sendOtp } = useSendSmsOtp();
  const { mutateAsync: verifyPhone } = useVerifyPhoneNumber();

  const handleSendOtp = async () => {
    const normalized = normalizePhone(phone, country);
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
      // Kept in the normalised form the server stored: its verify lookup
      // matches on the number itself, and a differently-formatted one comes
      // back as "user not found" rather than as a formatting problem.
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
      onVerified();
    } catch (error: any) {
      toast.error(error?.message ?? "Verification failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          placeholder={phonePlaceholder(country)}
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
  );
};
