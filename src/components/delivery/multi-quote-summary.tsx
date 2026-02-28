"use client";

import { Button } from "@/components/ui/button";
import { Package, DollarSign } from "lucide-react";
import { useCreateMultiOrderMutation } from "@/services/orders/mutation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IMultiQuoteData {
  guest: {
    email: string;
    firstname: string;
    lstname: string;
    phone: string;
  };
  totalAmount: number;
  quote: string;
  totalOrders: number;
}

interface Props {
  quote: IMultiQuoteData;
  onEdit: () => void;
}

export const MultiQuoteSummary = ({ quote, onEdit }: Props) => {
  const router = useRouter();
  const { mutate: createOrder, isPending } = useCreateMultiOrderMutation({
    onSuccess: (res) => {
      // redirect to authorization url
      const url = res.data?.authorization_url;
      if (url) {
        router.push(url);
      }
    },
    onError: (err) => {
      console.error("Create multi-order error", err);
      toast.error(err.message);
    },
  });

  const handlePayment = () => {
    const url = new URL(`/order/success`, window.location.origin).toString();
    createOrder({
      quoteId: quote.quote,
      callbackUrl: url,
    });
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Delivery Quote</h2>
        <p className="text-gray-600">
          Review your multi-delivery order quote before proceeding.
        </p>
      </div>

      {/* Summary Card */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SummaryItem
            label="Total Amount"
            value={`₦${quote.totalAmount.toLocaleString()}`}
          />
          <SummaryItem
            label="Total Orders"
            value={`${quote.totalOrders} Orders`}
          />
        </div>
      </div>

      {/* Guest Information */}
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
        <h3 className="text-xl font-semibold">Sender Information</h3>
        <div className="bg-gray-200 h-px w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">
              {quote.guest.firstname} {quote.guest.lstname}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{quote.guest.email}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{quote.guest.phone}</p>
          </div>
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

const SummaryItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-start gap-4">
    {icon && <div className="text-blue-primary mt-1">{icon}</div>}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  </div>
);

export default MultiQuoteSummary;
