"use client";

import { useState } from "react";
import { ArrowUpRight, Eye, EyeOff, Wallet } from "lucide-react";

import { WithdrawalModal } from "@/components/modals/withdraw";
import {
  WithdrawalHistory,
  WithdrawalRecord,
} from "@/components/dashboard/withdrawal-history";
import { useMarket } from "@/lib/markets/useMarket";
import { formatMoney } from "@/lib/money";
import {
  useGetStoreProfile,
  useGetWallet,
  useGetWithdrawalHistory,
} from "@/services/shops/query";

function WalletPage() {
  const [openModal, setOpenModal] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true);

  const { data: profile } = useGetStoreProfile();
  const { data, isLoading, isError } = useGetWallet();
  const {
    data: history,
    isLoading: historyLoading,
    isError: historyError,
    refetch: refetchHistory,
  } = useGetWithdrawalHistory();

  const market = useMarket(profile?.data?.country);
  const currentBalance = data?.data?.balance ?? 0;
  // The wallet endpoint returns the currency with the figure; a bare number is
  // unreadable once two markets are live.
  const currency = data?.data?.currency ?? market.currency;

  const records: WithdrawalRecord[] =
    history?.data?.fetchedData ?? history?.data ?? [];

  return (
    <div className="p-5 md:p-8 min-h-screen bg-gray-50">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Manage your earnings and withdrawals
        </p>
      </div>

      {isLoading ? (
        <div className="rounded-3xl bg-gray-200 animate-pulse h-52 mb-6" />
      ) : isError ? (
        <div className="rounded-3xl bg-red-50 border border-red-100 p-6 mb-6 text-red-500 text-sm text-center">
          Failed to load wallet data. Please try again.
        </div>
      ) : (
        <div className="relative rounded-3xl overflow-hidden mb-6 bg-[var(--color-blue-primary)] p-7 shadow-lg">
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/5" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/5" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 bg-white/15 rounded-full px-3 py-1.5">
                <Wallet size={14} className="text-white" />
                <span className="text-white text-xs font-medium">
                  Store Wallet
                </span>
              </div>
              <button
                onClick={() => setBalanceVisible((v) => !v)}
                aria-label={balanceVisible ? "Hide balance" : "Show balance"}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                {balanceVisible ? (
                  <EyeOff size={16} className="text-white" />
                ) : (
                  <Eye size={16} className="text-white" />
                )}
              </button>
            </div>

            <p className="text-white/70 text-sm mb-1">Available Balance</p>
            <p className="text-white font-bold text-4xl tracking-tight">
              {balanceVisible
                ? formatMoney(currentBalance, currency)
                : "••••••"}
            </p>

            <div className="mt-6">
              <button
                onClick={() => setOpenModal(true)}
                className="flex items-center gap-2 bg-white text-[var(--color-blue-primary)] font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition text-sm shadow-sm"
              >
                <ArrowUpRight size={16} />
                Withdraw Funds
              </button>
            </div>
          </div>
        </div>
      )}

      <WithdrawalHistory
        records={records}
        fallbackCurrency={currency}
        isLoading={historyLoading}
        isError={historyError}
        onRetry={refetchHistory}
      />

      <WithdrawalModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        isStore={true}
      />
    </div>
  );
}

export default WalletPage;
