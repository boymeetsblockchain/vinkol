"use client";

import { Landmark } from "lucide-react";

import { BankForm } from "@/components/banks/bank-form";
import { SettingsCard } from "@/components/dashboard/settings-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { contentFor } from "@/lib/markets";
import { COUNTRY_NAMES, Country } from "@/lib/markets/types";
import { useMarket } from "@/lib/markets/useMarket";
import { BankOwner } from "@/services/banks/api";
import { useBank } from "@/services/banks/query";

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
    <SettingsCard
      title="Payouts"
      description={owner === "store" ? payout.storeFaq : payout.riderFaq}
      badge={
        bank ? (
          <StatusBadge
            ok={bank.verified}
            okLabel="Verified"
            pendingLabel="Checked at payout"
          />
        ) : undefined
      }
    >
      <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-6">
        <Landmark size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
        <span>
          Operating in <strong>{COUNTRY_NAMES[market.country]}</strong>, paid in{" "}
          {market.currency}. Contact support if this is wrong — it affects your
          pricing and payouts.
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-5">
        {bank
          ? "Update these if your account has changed. We use them for your next withdrawal."
          : "Add an account so you can withdraw your earnings."}
      </p>

      <BankForm owner={owner} country={country} />
    </SettingsCard>
  );
};
