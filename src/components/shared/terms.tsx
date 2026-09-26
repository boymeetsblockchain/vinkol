"use client";

import Link from "next/link";

import { marketLink } from "@/lib/markets";
import { useMarket } from "@/lib/markets/useMarket";

/**
 * The tick-box that records agreement to the terms.
 *
 * Its links are market-aware, which matters more here than anywhere else on
 * the site: the two markets have genuinely different agreements, and a
 * Canadian customer ticking this box was previously agreeing to the Nigerian
 * document. `marketLink` returns the path unchanged for Nigeria, so nothing
 * moves for the market that was already correct.
 */

type TermsCheckboxProps = {
  isChecked: boolean;
  isBooking?: boolean;
  onChange: (checked: boolean) => void;
};

export const TermsCheckbox = ({
  isChecked,
  onChange,
  isBooking,
}: TermsCheckboxProps) => {
  const { country } = useMarket();

  const terms = isBooking
    ? "/terms-and-conditions-customer"
    : "/terms-and-conditions";

  return (
    <label className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 accent-blue-600"
      />
      <span>
        I agree to the{" "}
        <Link
          href={marketLink(terms, country)}
          className="text-blue-600 underline"
        >
          Terms &amp; Conditions
        </Link>{" "}
        and{" "}
        <Link
          href={marketLink("/privacy-policy", country)}
          className="text-blue-600 underline"
        >
          Privacy Policy
        </Link>
        .
      </span>
    </label>
  );
};
