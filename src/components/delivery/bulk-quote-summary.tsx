"use client";

import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import { MapPin, Truck, ArrowRight } from "lucide-react";
import { useCreateBulkOrderMutation } from "@/services/orders/mutation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import { ChargesBreakdown } from "@/components/delivery/charges-breakdown";
import { PaymentSourceSelector } from "@/components/delivery/payment-source";
import { useMarket } from "@/lib/markets/useMarket";
import { PaymentSource } from "@/lib/markets/types";
import { formatMoney } from "@/lib/money";
import { isQuoteUnusable } from "@/types/quote";

type Location = {
  lat: number;
  lng: number;
  address: string;
};

type RouteStop = {
  from: {
    location: Location;
    contact: string;
  };
  to: {
    location: Location;
    contact: string;
  };
  price: number;
  distance: number;
};

type BulkQuoteData = {
  quote: string;
  totalAmount: number;
  totalDistance: number;
  stops: number;
  route: RouteStop[];
  // Returned by the server on every quote. Absent here previously, which is
  // why this screen could only render naira and showed no tax line at all.
  country?: "NG" | "CA";
  currency?: "NGN" | "CAD";
  serviceFee?: number;
  taxAmount?: number;
  taxLabel?: string;
  grandTotal?: number;
};

interface Props {
  quote: BulkQuoteData;
  onEdit: () => void;
}

export const BulkQuoteSummary = ({ quote, onEdit }: Props) => {
  const router = useRouter();
  const market = useMarket(quote.country);
  const [paymentSource, setPaymentSource] = useState<PaymentSource | null>(null);

  useEffect(() => {
    if (!paymentSource && market.config.paymentSources.length > 0) {
      setPaymentSource(market.config.paymentSources[0]);
    }
  }, [market.config.paymentSources, paymentSource]);

  const { mutate: createOrder, isPending } = useCreateBulkOrderMutation({
    onSuccess: (res) => {
      const url = res.data?.authorization_url;
      if (url) {
        router.push(url);
      }
    },
    onError: (err) => {
      if (isQuoteUnusable(err.message)) {
        toast.error("This quote has expired. Please request a new one.");
        onEdit();
        return;
      }
      toast.error(err.message);
    },
  });

  const handlePayment = () => {
    if (!paymentSource) return;

    createOrder({
      quoteId: quote.quote,
      callbackUrl: new URL("/order/success", window.location.origin).toString(),
      paymentSource,
    });
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Delivery Quote</h2>
        <p className="text-gray-600">
          Review your bulk delivery details before proceeding.
        </p>
      </div>

      {/* Summary Card */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryItem
            label="Total Amount"
            value={formatMoney(
              quote.grandTotal ?? quote.totalAmount,
              market.currency,
            )}
          />
          <SummaryItem
            label="Total Distance"
            value={`${quote.totalDistance} km`}
          />
          <SummaryItem label="Stops" value={`${quote.stops}`} />
        </div>
      </div>

      {/* Route Breakdown */}
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Truck size={20} />
          Route Breakdown
        </h3>

        {/* <Separator /> */}
        <div className="bg-gray-200 h-px w-full" />

        <div className="space-y-6">
          {quote.route.map((leg, index) => (
            <div key={index} className="space-y-3">
              {index == 0 && (
                <div className="flex items-start gap-3">
                  <MapPin className="text-gray-500 mt-1" size={18} />
                  <div className="text-sm">
                    <p className="font-medium">Pickup</p>
                    <p className="text-gray-600">{leg.from.location.address}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 ml-6 text-gray-400">
                <ArrowRight size={16} />
                <span className="text-xs">{leg.distance} km</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-gray-500 mt-1" size={18} />
                <div className="text-sm">
                  <p className="font-medium">Drop-off {index + 1}</p>
                  <p className="text-gray-600">{leg.to.location.address}</p>
                </div>
              </div>

              {/* {index !== quote.route.length - 1 && <Separator />} */}
              {index !== quote.route.length - 1 && (
                <div className="bg-gray-200 h-px w-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      <ChargesBreakdown
        currency={market.currency}
        deliveryFee={quote.totalAmount}
        serviceFee={quote.serviceFee}
        taxAmount={quote.taxAmount}
        taxLabel={quote.taxLabel}
        grandTotal={quote.grandTotal}
      />

      <PaymentSourceSelector
        sources={market.config.paymentSources}
        value={paymentSource}
        onChange={setPaymentSource}
        isLoading={market.isLoading}
      />

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-4">
        <Button variant="outline" className="w-full md:w-auto" onClick={onEdit}>
          Edit delivery details
        </Button>

        <Button
          className="w-full md:w-auto"
          onClick={handlePayment}
          disabled={isPending || !paymentSource}
        >
          {isPending ? "Processing..." : "Continue with this quote"}
        </Button>
      </div>
    </section>
  );
};

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);
