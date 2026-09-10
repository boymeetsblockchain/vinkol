"use client";

import { useEffect } from "react";

import { useIsSignedIn } from "@/lib/auth/useIsSignedIn";
import { PaymentSource } from "@/lib/markets/types";

/**
 * The payment methods this market permits, from GET /others/markets.
 *
 * Every quote page previously hardcoded `"Paystack" | "Globus"` with the Globus
 * option commented out, so Paystack was the only reachable method and Stripe
 * appeared nowhere in the frontend at all. The market decides now.
 *
 * Two things the market alone cannot decide, both filtered here so the four
 * quote screens stay unchanged:
 *
 * - **Wallet** is a customer balance, not a gateway. The config is per country,
 *   so it can never express "this viewer has no wallet", and a signed-out
 *   visitor was being offered to pay from a balance they do not have.
 * - **Globus** is switched off. It was commented out of all four screens
 *   deliberately, and came back when they moved onto this shared selector: the
 *   server still lists it for Nigeria. Filtering against the labels means a
 *   source this build does not know about cannot render as a blank radio.
 */

const LABELS: Record<PaymentSource, string> = {
  Paystack: "Card or bank transfer",
  Stripe: "Credit or debit card",
  Wallet: "Vinkol wallet",
};

const HINTS: Partial<Record<PaymentSource, string>> = {
  Paystack: "Paystack — cards, transfers and USSD",
  Stripe: "Processed securely by Stripe",
  Wallet: "Paid from your existing balance",
};

interface Props {
  sources: PaymentSource[];
  value: PaymentSource | null;
  onChange: (source: PaymentSource) => void;
  /** True while market config is loading, so the list is provisional. */
  isLoading?: boolean;
}

const OFFERABLE = new Set(Object.keys(LABELS));

export const PaymentSourceSelector = ({
  sources,
  value,
  onChange,
  isLoading,
}: Props) => {
  const signedIn = useIsSignedIn();

  const offered = sources.filter(
    (source) => OFFERABLE.has(source) && (source !== "Wallet" || signedIn),
  );

  // The quote screens preselect from the unfiltered list, so without this a
  // filtered-out default would leave nothing checked and still submit. Keyed on
  // the joined list because `offered` is a fresh array each render.
  const offeredKey = offered.join(",");
  useEffect(() => {
    if (!offered.length) return;
    if (!value || !offered.includes(value)) onChange(offered[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offeredKey, value]);

  if (offered.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-6">
        <p className="text-sm text-gray-500">
          {isLoading
            ? "Loading payment options…"
            : "No payment method is available for your region yet. Please contact support."}
        </p>
      </div>
    );
  }

  return (
    <fieldset className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-6">
      <legend className="text-sm font-semibold text-gray-900 px-1">
        Payment method
      </legend>
      <div className="space-y-3 mt-2">
        {offered.map((source) => (
          <label
            key={source}
            className="flex items-start gap-3 cursor-pointer rounded-lg p-2 -m-2 hover:bg-white transition-colors"
          >
            <input
              type="radio"
              name="paymentSource"
              value={source}
              checked={value === source}
              onChange={() => onChange(source)}
              className="mt-1 w-4 h-4 accent-[var(--color-blue-primary)]"
            />
            <span>
              <span className="block font-medium text-gray-900 text-sm">
                {LABELS[source]}
              </span>
              {HINTS[source] && (
                <span className="block text-xs text-gray-500 mt-0.5">
                  {HINTS[source]}
                </span>
              )}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};
