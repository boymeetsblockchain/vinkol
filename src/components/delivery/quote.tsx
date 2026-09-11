"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ChargesBreakdown } from "@/components/delivery/charges-breakdown";
import { PaymentSourceSelector } from "@/components/delivery/payment-source";
import {
  CheckoutSession,
  clearCheckoutSession,
  getCheckoutSession,
  isCheckoutExpired,
} from "@/config/checkout";
import { contentFor } from "@/lib/markets";
import { useMarket } from "@/lib/markets/useMarket";
import { PaymentSource } from "@/lib/markets/types";
import { useCreateGuestOrderMutation } from "@/services/orders/mutation";
import { isQuoteUnusable } from "@/types/quote";

const titleCase = (value?: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : "N/A";

export const QuotePage = () => {
  const router = useRouter();
  const [session, setSession] = useState<CheckoutSession | null>(null);
  const [expired, setExpired] = useState(false);
  const [paymentSource, setPaymentSource] = useState<PaymentSource | null>(null);

  // sessionStorage is only readable on the client, so this cannot be initial
  // state without a hydration mismatch.
  useEffect(() => {
    const stored = getCheckoutSession();
    setSession(stored);
    if (stored && isCheckoutExpired(stored)) setExpired(true);
  }, []);

  const market = useMarket(session?.country);
  const { coverAmount } = contentFor(market.country);

  useEffect(() => {
    if (!paymentSource && market.config.paymentSources.length > 0) {
      setPaymentSource(market.config.paymentSources[0]);
    }
  }, [market.config.paymentSources, paymentSource]);

  const { mutate, isPending, isSuccess } = useCreateGuestOrderMutation({
    onSuccess: (res) => {
      const url = res.data?.authorization_url;
      clearCheckoutSession();

      // Whichever gateway the market uses, the server hands back the URL to
      // send the customer to. No gateway SDK belongs on the client.
      if (url) {
        router.push(url);
        return;
      }

      toast.success("Order created successfully.");
      setTimeout(() => router.push("/"), 3000);
    },
    onError: (err) => {
      if (isQuoteUnusable(err.message)) {
        setExpired(true);
        return;
      }
      toast.error(err.message);
    },
  });

  const rebook = () => {
    clearCheckoutSession();
    router.push("/book-a-delivery");
  };

  const handleProceedToPayment = () => {
    if (!session || !paymentSource) return;

    if (isCheckoutExpired(session)) {
      setExpired(true);
      return;
    }

    mutate({
      orderType: "Delivery",
      state: session.state,
      date: session.date ?? "",
      time: session.time ?? "",
      pickupLocation: session.pickupLocation ?? "",
      dropoffLocation: session.dropoffLocation,
      // The quote is the price. The server ignores any fee sent alongside it.
      quoteId: session.quoteId,
      deliveryType: (session.deliveryType ?? "regular") as
        | "regular"
        | "express",
      vehicleRequest: (session.vehicleRequest ?? "bike") as
        | "truck"
        | "car"
        | "bike",
      paymentSource,
      callbackUrl: new URL("/order/success", window.location.origin).toString(),
      guest: session.guest,
      note: session.note || "",
      // Absent unless the booking form collected one.
      ...(session.receiverContact
        ? { receiverContact: session.receiverContact }
        : {}),
    });
  };

  if (session === null) {
    return (
      <Shell>
        <Notice
          title="We could not find your quote"
          body="Quotes are held for this browser tab only. Please fill in the booking form again to get a fresh price."
          action={<Button onClick={rebook}>Book a delivery</Button>}
        />
      </Shell>
    );
  }

  if (expired) {
    return (
      <Shell>
        <Notice
          title="This quote has expired"
          body="Prices are held for 15 minutes so the amount you see is the amount you pay. Please request a new quote."
          action={<Button onClick={rebook}>Get a new quote</Button>}
        />
      </Shell>
    );
  }

  if (isPending) {
    return (
      <Shell>
        <div className="flex flex-col gap-4 items-center justify-center py-6">
          <Loader2
            size={96}
            strokeWidth={1}
            className="text-blue-primary animate-spin"
          />
          <p>Creating order...</p>
        </div>
      </Shell>
    );
  }

  if (isSuccess) {
    return (
      <Shell>
        <div className="flex flex-col gap-4 items-center justify-center py-6">
          <CheckCircle2 size={96} strokeWidth={1} className="text-green-600" />
          <p>Please wait...</p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-3">
        Your quote
      </p>
      <h1 className="text-3xl font-bold text-gray-900 mb-3 text-left">
        Delivery Quote
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Review your delivery details before proceeding to payment.
      </p>

      <dl className="space-y-3 text-gray-800">
        <Detail label="State" value={session.state} />
        <Detail label="Pick-up location" value={session.pickupLocation} />
        <Detail label="Drop-off location" value={session.dropoffLocation} />
        <Detail label="Date" value={session.date} />
        <Detail label="Time" value={session.time} />
        <Detail label="Delivery type" value={titleCase(session.deliveryType)} />
        <Detail
          label="Vehicle request"
          value={titleCase(session.vehicleRequest)}
        />
        <Detail label="Note" value={session.note || "No special notes."} />
      </dl>

      <ChargesBreakdown
        currency={session.currency}
        deliveryFee={session.deliveryFee}
        serviceFee={session.serviceFee}
        taxAmount={session.taxAmount}
        taxLabel={session.taxLabel}
        grandTotal={session.grandTotal ?? session.deliveryFee}
      />

      <PaymentSourceSelector
        sources={market.config.paymentSources}
        value={paymentSource}
        onChange={setPaymentSource}
        isLoading={market.isLoading}
      />

      <div className="mt-8 text-center">
        <Button
          onClick={handleProceedToPayment}
          disabled={isPending || !paymentSource}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors duration-200 text-lg"
        >
          {isPending ? "Processing..." : "Proceed To Payment"}
        </Button>
      </div>

      <p className="text-center my-4 text-gray-500 text-sm">
        Vinkol covers up to {coverAmount} of damage or loss. Please note in the
        booking form if goods are fragile.
      </p>
    </Shell>
  );
};

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-[#F7F8FA] py-10 px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 md:p-12 border border-gray-100 min-h-[400px]">
      {children}
    </div>
  </div>
);

const Notice = ({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action: React.ReactNode;
}) => (
  <div className="py-6 text-center">
    <h1 className="text-2xl font-bold text-gray-900 mb-3">{title}</h1>
    <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">{body}</p>
    {action}
  </div>
);

const Detail = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
    <dt className="text-sm text-gray-500 sm:w-44 shrink-0">{label}</dt>
    <dd className="font-medium text-gray-900">{value || "N/A"}</dd>
  </div>
);
