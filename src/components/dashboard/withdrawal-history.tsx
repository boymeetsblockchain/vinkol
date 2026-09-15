"use client";

import { AlertCircle, ArrowUpRight, Wallet } from "lucide-react";

import { Currency } from "@/lib/markets/types";
import { formatMoney } from "@/lib/money";

/**
 * Withdrawal history, which had a hook and no screen.
 *
 * `useGetWithdrawalHistory` existed in both the store and rider services and
 * was never consumed anywhere; every wallet page rendered a hardcoded
 * "No transactions yet" panel instead, so a rider or merchant had no way to
 * see whether a payout request had been approved.
 */

export interface WithdrawalRecord {
  _id: string;
  amount: number;
  currency?: Currency;
  status: "Pending" | "Approved" | "Rejected";
  reason?: string;
  createdAt: string;
  bank?:
    | { accountName?: string; accountNumber?: string; bankName?: string }
    | string;
}

const STATUS_STYLE: Record<WithdrawalRecord["status"], string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-100",
  Approved: "bg-green-50 text-green-700 border-green-100",
  Rejected: "bg-red-50 text-red-700 border-red-100",
};

const STATUS_HINT: Record<WithdrawalRecord["status"], string> = {
  Pending: "Awaiting review",
  Approved: "Sent to your account",
  Rejected: "Not approved",
};

const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
};

interface Props {
  records: WithdrawalRecord[];
  /** The account's currency, for records that predate the currency field. */
  fallbackCurrency: Currency;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

export const WithdrawalHistory = ({
  records,
  fallbackCurrency,
  isLoading,
  isError,
  onRetry,
}: Props) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
    <h2 className="font-bold text-gray-900 mb-1">Withdrawals</h2>
    <p className="text-xs text-gray-400 mb-6">
      Payouts stay manual — you request, we review, then we send it.
    </p>

    {isError ? (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
        <AlertCircle size={24} className="text-red-500" />
        <p className="text-sm text-gray-600">
          We could not load your withdrawals.
        </p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="text-sm font-semibold text-[var(--color-blue-primary)] hover:underline underline-offset-4"
          >
            Try again
          </button>
        )}
      </div>
    ) : isLoading ? (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 animate-pulse">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-1/3 bg-gray-100 rounded" />
              <div className="h-3 w-1/4 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    ) : records.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
          <Wallet size={24} className="text-[var(--color-blue-primary)]" />
        </div>
        <p className="font-semibold text-gray-800">No withdrawals yet</p>
        <p className="text-gray-400 text-sm mt-1">
          Request one whenever you want to move your balance out.
        </p>
      </div>
    ) : (
      <ul className="divide-y divide-gray-100">
        {records.map((record) => (
          <li key={record._id} className="flex items-center gap-3 py-3.5">
            <span className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <ArrowUpRight
                size={18}
                className="text-[var(--color-blue-primary)]"
              />
            </span>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">
                {formatMoney(
                  record.amount,
                  record.currency ?? fallbackCurrency,
                )}
              </p>
              <p className="text-xs text-gray-400">
                {formatDate(record.createdAt)} · {STATUS_HINT[record.status]}
              </p>
              {record.status === "Rejected" && record.reason && (
                <p className="text-xs text-red-600 mt-0.5">{record.reason}</p>
              )}
            </div>

            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${STATUS_STYLE[record.status]}`}
            >
              {record.status}
            </span>
          </li>
        ))}
      </ul>
    )}
  </div>
);
