"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, Package } from "lucide-react";

import { useMarket } from "@/lib/markets/useMarket";
import { formatMoney } from "@/lib/money";
import { IOrder } from "@/types/order";
import { useGetStoreOrders } from "@/services/orders/query";
import { useGetStoreProfile } from "@/services/shops/query";

/**
 * Completed and cancelled orders.
 *
 * This page previously rendered six hardcoded deliveries with invented naira
 * amounts and Lagos, Abuja, Kano and Ibadan addresses, and made no API call at
 * all. It was unlinked from the sidebar, which is the only reason no merchant
 * saw it.
 */

const CLOSED_STATUSES = ["Delivered", "Cancelled"] as const;

const STATUS_STYLE: Record<string, string> = {
  Delivered: "bg-green-50 text-green-700 border-green-100",
  Cancelled: "bg-red-50 text-red-700 border-red-100",
};

export default function StoreHistoryPage() {
  const [status, setStatus] =
    useState<(typeof CLOSED_STATUSES)[number]>("Delivered");
  const [page, setPage] = useState(1);

  const { data: profile } = useGetStoreProfile();
  const market = useMarket(profile?.data?.country);
  const { data, isLoading, isError, refetch } = useGetStoreOrders({
    page,
    status,
    page_size: 20,
  });

  const orders: IOrder[] = data?.data?.fetchedData ?? [];
  const totalPages = data?.data?.no_of_pages ?? 1;
  const total = data?.data?.total ?? 0;

  return (
    <div className="p-5 md:p-8 min-h-screen bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Order history</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          {isLoading ? "Loading…" : `${total} ${status.toLowerCase()} orders`}
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        {CLOSED_STATUSES.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              setStatus(option);
              setPage(1);
            }}
            className={
              status === option
                ? "px-4 py-2 rounded-full text-sm font-semibold bg-[var(--color-blue-primary)] text-white"
                : "px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }
          >
            {option}
          </button>
        ))}
      </div>

      {isError ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 flex flex-col items-center gap-3 text-center">
          <AlertCircle size={28} className="text-red-500" />
          <p className="text-sm text-gray-600">
            We could not load your order history.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="text-sm font-semibold text-[var(--color-blue-primary)] hover:underline underline-offset-4"
          >
            Try again
          </button>
        </div>
      ) : isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse space-y-3"
            >
              <div className="h-4 w-1/3 bg-gray-100 rounded" />
              <div className="h-3 w-1/2 bg-gray-100 rounded" />
              <div className="h-3 w-1/4 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center gap-3 text-center">
          <Package size={28} className="text-gray-300" />
          <p className="font-semibold text-gray-800">
            No {status.toLowerCase()} orders yet
          </p>
          <Link
            href="/shop/dashboard"
            className="text-sm font-semibold text-[var(--color-blue-primary)] hover:underline underline-offset-4"
          >
            See current orders
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-bold text-gray-900">
                    Order #{order.trackingId}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${
                    STATUS_STYLE[order.status] ??
                    "bg-gray-50 text-gray-700 border-gray-100"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <Row label="Deliver to" value={order.dropoffLocation} />
                <Row label="State" value={order.state} />
                <Row
                  label="Delivery type"
                  value={order.deliveryType}
                />
                <Row label="Payment" value={order.paymentStatus} />
              </dl>

              <p className="text-sm font-semibold text-gray-700 mt-4">
                Amount:{" "}
                <span className="text-[var(--color-blue-primary)]">
                  {formatMoney(
                    order.grandTotal ?? order.totalAmount ?? order.amount,
                    order.currency ?? market.currency,
                  )}
                </span>
              </p>

              {order.note && (
                <p className="text-sm text-gray-500 italic mt-1">
                  Note: {order.note}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

const Row = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <dt className="text-xs text-gray-400 uppercase tracking-wide font-medium">
      {label}
    </dt>
    <dd className="text-gray-800">{value || "—"}</dd>
  </div>
);
