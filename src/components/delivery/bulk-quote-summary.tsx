"use client";

import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import { MapPin, Truck, ArrowRight } from "lucide-react";
import { useCreateBulkOrderMutation } from "@/services/orders/mutation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
};

interface Props {
  quote: BulkQuoteData;
  onEdit: () => void;
}

export const BulkQuoteSummary = ({ quote, onEdit }: Props) => {
  const router = useRouter();
  const { mutate: createOrder, isPending } = useCreateBulkOrderMutation({
    onSuccess: (res) => {
      // redirect to authorization url
      const url = res.data?.authorization_url;
      if (url) {
        router.push(url);
      }
    },
    onError: (err) => {
      console.error("Create bulk order error", err);
      toast.error(err.message);
    },
  });

  const handlePayment = () => {
    createOrder({
      quoteId: quote.quote,
      callbackUrl: "http://localhost:3000/order/success",
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
            value={`₦${quote.totalAmount.toLocaleString()}`}
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
              <div className="flex items-start gap-3">
                <MapPin className="text-gray-500 mt-1" size={18} />
                <div className="text-sm">
                  <p className="font-medium">Pickup</p>
                  <p className="text-gray-600">{leg.from.location.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 ml-6 text-gray-400">
                <ArrowRight size={16} />
                <span className="text-xs">{leg.distance} km</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-gray-500 mt-1" size={18} />
                <div className="text-sm">
                  <p className="font-medium">Drop-off</p>
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

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-4">
        <Button variant="outline" className="w-full md:w-auto" onClick={onEdit}>
          Edit delivery details
        </Button>

        <Button
          className="w-full md:w-auto"
          onClick={handlePayment}
          disabled={isPending}
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
