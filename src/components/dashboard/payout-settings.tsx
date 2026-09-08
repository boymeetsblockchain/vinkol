"use client";

import { CheckCircle2, Clock, Landmark } from "lucide-react";

import { BankForm } from "@/components/banks/bank-form";
import { contentFor } from "@/lib/markets";
import { COUNTRY_NAMES, Country } from "@/lib/markets/types";
import { useMarket } from "@/lib/markets/useMarket";
import { BankOwner } from "@/services/banks/api";
import { useBank } from "@/services/banks/query";

/**
 * Payout details, editable.
 *
 * These could previously only be entered once, during onboarding — so anyone
 * who mistyped an account number had no way to correct it, on the only
 * interface a merchant has. The server's PATCH endpoints existed the whole
 * time; nothing on the client ever called them.
 */
export const PayoutSettings = ({
  owner,
  country,
}: {
  owner: BankOwner;
  country?: Country;
}) => {
  const market = useMarket(country);
  const { payout } = contentFor(market.country);
  const { data: bank } = useBank(owner);

  return (
    <div className="flex flex-col gap-8 max-w-xl">
      <section>
        <h2 className="text-lg font-bold text-gray-900">How payouts work</h2>
        <p className="text-sm text-gray-500 mt-1">
          {owner === "store" ? payout.storeFaq : payout.riderFaq}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
          <Landmark size={16} className="text-gray-400 flex-shrink-0" />
          <span>
            Operating in <strong>{COUNTRY_NAMES[market.country]}</strong>, paid
            in {market.currency}. Contact support if this is wrong — it affects
            your pricing and payouts.
          </span>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-4 mb-1">
          <h2 className="text-lg font-bold text-gray-900">Payout details</h2>
          {bank && (
            <span
              className={
                bank.verified
                  ? "flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-100 rounded-full px-2.5 py-1"
                  : "flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-2.5 py-1"
              }
            >
              {bank.verified ? (
                <>
                  <CheckCircle2 size={12} /> Verified
                </>
              ) : (
                <>
                  <Clock size={12} /> Checked at payout
                </>
              )}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-5">
          {bank
            ? "Update these if your account has changed. We use them for your next withdrawal."
            : "Add an account so you can withdraw your earnings."}
        </p>

        <BankForm owner={owner} country={country} />
      </section>
    </div>
  );
};
