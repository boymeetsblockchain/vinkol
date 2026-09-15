"use client";

import { PayoutSettings } from "@/components/dashboard/payout-settings";
import { useGetStoreProfile } from "@/services/shops/query";

/**
 * Was a static copy of the store-profile form whose Save button did nothing,
 * with three hardcoded Nigerian states. Store details are edited on the
 * Profile screen, so this is now the payout and account screen — the thing
 * that genuinely had no home outside onboarding.
 */
export default function StoreSettingsPage() {
  const { data } = useGetStoreProfile();

  return (
    <div className="p-5 md:p-8 min-h-screen bg-gray-50">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Payouts and account details
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <PayoutSettings owner="store" country={data?.data?.country} />
      </div>
    </div>
  );
}
