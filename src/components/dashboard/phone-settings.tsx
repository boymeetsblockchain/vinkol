"use client";

import { CheckCircle2, Clock } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { VerifyPhoneForm } from "@/components/phone/verify-phone-form";
import { Country } from "@/lib/markets/types";
import { useMarket } from "@/lib/markets/useMarket";

/**
 * Verify a phone number from inside the dashboard.
 *
 * The phone step can be skipped during onboarding, and this is what makes that
 * honest. Before this, the OTP form existed only inside the onboarding shell:
 * the rider settings page linked back out to it and the shopper page had no
 * phone UI at all, so a shopper who skipped could return only by typing the URL.
 */
export const PhoneSettings = ({
  email,
  phone,
  isPhoneVerified,
  country,
}: {
  email?: string;
  phone?: string;
  isPhoneVerified?: boolean;
  country?: Country;
}) => {
  const market = useMarket(country);
  const queryClient = useQueryClient();

  return (
    <section>
      <div className="flex items-center justify-between gap-4 mb-1">
        <h2 className="text-lg font-bold text-gray-900">Phone number</h2>
        <span
          className={
            isPhoneVerified
              ? "flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-100 rounded-full px-2.5 py-1"
              : "flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-2.5 py-1"
          }
        >
          {isPhoneVerified ? (
            <>
              <CheckCircle2 size={12} /> Verified
            </>
          ) : (
            <>
              <Clock size={12} /> Not verified
            </>
          )}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-5">
        {isPhoneVerified
          ? "Verified. Send a new code if you have changed your number — you will need to verify the new one before accepting orders again."
          : "You need a verified number before you can accept orders."}
      </p>

      <VerifyPhoneForm
        email={email ?? null}
        country={market.country}
        initialPhone={phone ?? ""}
        onVerified={() =>
          queryClient.invalidateQueries({ queryKey: ["userProfile"] })
        }
      />
    </section>
  );
};
