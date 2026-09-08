"use client";

import { PaymentSource } from "@/lib/markets/types";

/**
 * The payment methods this market permits, from GET /others/markets.
 *
 * Every quote page previously hardcoded `"Paystack" | "Globus"` with the Globus
 * option commented out, so Paystack was the only reachable method and Stripe
 * appeared nowhere in the frontend at all. The market decides now.
 */

const LABELS: Record<PaymentSource, string> = {
  Paystack: "Card or bank transfer",
  Globus: "Globus Bank",
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

export const PaymentSourceSelector = ({
  sources,
  value,
  onChange,
  isLoading,
}: Props) => {
  // Wallet is a customer balance, not a gateway. It is only offered where the
  // market has customer wallets, which the sources list already reflects.
  if (sources.length === 0) {
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
        {sources.map((source) => (
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
