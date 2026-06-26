"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, Bike, CheckCircle2, Clock, Package } from "lucide-react";
import { useTrackOrders } from "@/services/orders/query";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/button";
import { toast } from "sonner";
import Link from "next/link";

type TrackingStep = {
  label: string;
  sublabel?: string;
  icon: React.ElementType;
  activeStatuses: string[];
  doneStatuses: string[];
};

const STEPS: TrackingStep[] = [
  {
    label: "Order Placed",
    sublabel: "Waiting for a rider",
    icon: Clock,
    activeStatuses: ["pending", "confirmed"],
    doneStatuses: ["accepted", "picked", "delivered"],
  },
  {
    label: "Rider Assigned",
    sublabel: "Rider on route to pickup",
    icon: Bike,
    activeStatuses: ["accepted"],
    doneStatuses: ["picked", "delivered"],
  },
  {
    label: "Package Picked Up",
    sublabel: "Package with rider, in transit",
    icon: Package,
    activeStatuses: ["picked"],
    doneStatuses: ["delivered"],
  },
  {
    label: "Delivered",
    sublabel: "Package delivered successfully",
    icon: CheckCircle2,
    activeStatuses: ["delivered"],
    doneStatuses: [],
  },
];

function getStepState(step: TrackingStep, status: string) {
  const s = status.toLowerCase();
  if (step.doneStatuses.includes(s)) return "done";
  if (step.activeStatuses.includes(s)) return "active";
  return "pending";
}

export function TrackPageClient() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") ?? "";

  const [inputId, setInputId] = useState(initialId);
  const [trackingId, setTrackingId] = useState(initialId);
  const [enabled, setEnabled] = useState(!!initialId);

  const { data, isPending, isError, error } = useTrackOrders(trackingId, { enabled });
  const order = data?.data;

  // Update URL without full navigation
  useEffect(() => {
    if (trackingId) {
      const url = new URL(window.location.href);
      url.searchParams.set("id", trackingId);
      window.history.replaceState({}, "", url.toString());
    }
  }, [trackingId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputId.trim()) {
      toast.error("Please enter a tracking ID");
      return;
    }
    setTrackingId(inputId.trim());
    setEnabled(true);
  };

  const status = order?.status ?? "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-screen-md mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            Track Your Delivery
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Enter your tracking ID to see real-time delivery status.
          </p>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={17}
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="e.g. VNK-2024-XXXXX"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
                aria-label="Tracking ID"
                className="w-full pl-9 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-primary bg-white placeholder-gray-400"
              />
            </div>
            <Button type="submit" size="lg" aria-label="Search tracking ID">
              Track
            </Button>
          </form>
        </div>
      </div>

      <div className="max-w-screen-md mx-auto px-4 py-8">
        {/* Loading */}
        {isPending && enabled && (
          <div className="flex items-center justify-center py-16" role="status" aria-live="polite">
            <div className="w-8 h-8 border-2 border-blue-primary/30 border-t-blue-primary rounded-full animate-spin" />
            <span className="ml-3 text-gray-500 text-sm">Looking up your order…</span>
          </div>
        )}

        {/* Error */}
        {isError && !isPending && (
          <div
            className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center"
            role="alert"
          >
            <p className="text-red-700 font-semibold mb-1">Order not found</p>
            <p className="text-red-500 text-sm">
              {(error as any)?.message || "We couldn't find an order with that tracking ID. Please check and try again."}
            </p>
          </div>
        )}

        {/* Order found */}
        {order && !isPending && (
          <div className="space-y-5" aria-live="polite">
            {/* Summary card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                    Tracking ID
                  </p>
                  <p className="font-bold text-gray-900 text-lg">{order.trackingId}</p>
                </div>
                <StatusBadge status={status} />
              </div>

              {/* Route */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center pt-1">
                  <div className="w-3 h-3 bg-blue-primary rounded-full" aria-hidden="true" />
                  <div className="flex-1 w-px bg-gray-200 my-1" aria-hidden="true" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" aria-hidden="true" />
                </div>
                <div className="flex flex-col justify-between gap-3 flex-1">
                  <div>
                    <p className="text-xs text-gray-400">Pickup</p>
                    <p className="text-sm font-medium text-gray-800 flex items-center gap-1.5">
                      <MapPin size={13} className="text-blue-primary shrink-0" aria-hidden="true" />
                      {order.pickupLocation}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Dropoff</p>
                    <p className="text-sm font-medium text-gray-800 flex items-center gap-1.5">
                      <MapPin size={13} className="text-green-500 shrink-0" aria-hidden="true" />
                      {order.dropoffLocation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Vehicle */}
              {order.vehicleRequest && (
                <p className="mt-4 text-xs text-gray-400">
                  Vehicle:{" "}
                  <span className="text-gray-700 font-medium capitalize">{order.vehicleRequest}</span>
                </p>
              )}
            </div>

            {/* Timeline */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-5">Delivery Progress</h2>
              <ol className="space-y-0">
                {STEPS.map((step, index) => {
                  const state = getStepState(step, status);
                  const Icon = step.icon;
                  const isLast = index === STEPS.length - 1;

                  return (
                    <li key={step.label} className="flex gap-4">
                      {/* Icon + vertical line */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            state === "done"
                              ? "bg-green-100"
                              : state === "active"
                                ? "bg-blue-primary"
                                : "bg-gray-100"
                          }`}
                          aria-hidden="true"
                        >
                          <Icon
                            size={15}
                            className={
                              state === "done"
                                ? "text-green-600"
                                : state === "active"
                                  ? "text-white"
                                  : "text-gray-400"
                            }
                          />
                        </div>
                        {!isLast && (
                          <div
                            className={`w-px flex-1 mt-1 mb-1 min-h-[24px] ${
                              state === "done" ? "bg-green-200" : "bg-gray-100"
                            }`}
                            aria-hidden="true"
                          />
                        )}
                      </div>

                      {/* Text */}
                      <div className={`pb-5 ${isLast ? "" : ""}`}>
                        <p
                          className={`text-sm font-semibold ${
                            state === "active"
                              ? "text-blue-primary"
                              : state === "done"
                                ? "text-green-700"
                                : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{step.sublabel}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Rider info (if assigned) */}
            {order.rider && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h2 className="text-sm font-semibold text-gray-700 mb-4">Your Rider</h2>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-primary/10 rounded-full flex items-center justify-center text-blue-primary font-bold text-base shrink-0">
                    {(order.rider.firstname?.[0] ?? "R").toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {order.rider.firstname} {order.rider.lastname}
                    </p>
                    <p className="text-sm text-gray-400">Verified Vinkol Rider</p>
                  </div>
                </div>
              </div>
            )}

            {/* Book another */}
            <div className="text-center pt-2">
              <Link
                href="/book-a-delivery"
                className="text-sm text-blue-primary font-medium hover:underline"
              >
                Book another delivery →
              </Link>
            </div>
          </div>
        )}

        {/* Empty state — no search yet */}
        {!enabled && !isPending && (
          <div className="text-center py-16">
            <div
              className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4"
              aria-hidden="true"
            >
              <Search className="text-blue-primary" size={24} />
            </div>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              Enter your tracking ID above to see live delivery status, route, and rider details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
