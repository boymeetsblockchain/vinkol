"use client";

import { useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/button";

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
 *
 * A verified number is shown settled, behind a "Change number" button, rather
 * than as an editable box with a "Send code" button under it — which read as
 * though the number still needed verifying. Changing it always goes through the
 * same code: the server clears `isPhoneVerified` on any change, so a new number
 * is unverified until its own OTP is confirmed.
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
  const [changing, setChanging] = useState(false);

  const showForm = !isPhoneVerified || changing;

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
          ? "This is the number customers and support reach you on. Change it and we will send a code to the new number."
          : "You need a verified number before you can accept orders."}
      </p>

      {showForm ? (
        <div className="flex flex-col gap-4">
          <VerifyPhoneForm
            email={email ?? null}
            country={market.country}
            initialPhone={phone ?? ""}
            onVerified={() => {
              setChanging(false);
              queryClient.invalidateQueries({ queryKey: ["userProfile"] });
            }}
          />
          {changing && (
            <button
              type="button"
              onClick={() => setChanging(false)}
              className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4 w-fit"
            >
              Keep my current number
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5">
          <span className="text-sm font-medium text-gray-900">{phone}</span>
          <Button
            variant="secondary"
            className="rounded-md"
            onClick={() => setChanging(true)}
          >
            Change number
          </Button>
        </div>
      )}
    </section>
  );
};
