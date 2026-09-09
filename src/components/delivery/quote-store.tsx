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
import { clearCart, getCartFromStorage } from "@/config/storage";
import { contentFor } from "@/lib/markets";
import { useMarket } from "@/lib/markets/useMarket";
import { PaymentSource } from "@/lib/markets/types";
import { formatMoney } from "@/lib/money";
import { useCreateOrderFromStore } from "@/services/orders/mutation";
import { isQuoteUnusable } from "@/types/quote";

interface CartItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  quantity: number;
}

export const QuotePage = () => {
  const router = useRouter();
  const [session, setSession] = useState<CheckoutSession | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [expired, setExpired] = useState(false);
  const [paymentSource, setPaymentSource] = useState<PaymentSource | null>(null);

  useEffect(() => {
    const stored = getCheckoutSession();
    setSession(stored);
    setCartItems(getCartFromStorage());
    if (stored && isCheckoutExpired(stored)) setExpired(true);
  }, []);

  const market = useMarket(session?.country);
  const { coverAmount } = contentFor(market.country);

  useEffect(() => {
    if (!paymentSource && market.config.paymentSources.length > 0) {
      setPaymentSource(market.config.paymentSources[0]);
    }
  }, [market.config.paymentSources, paymentSource]);

  const { mutate, isPending, isSuccess } = useCreateOrderFromStore({
    onSuccess: (res) => {
      const url = res.data?.authorization_url;
      clearCheckoutSession();

      if (url) {
        // The cart is cleared once the payment is verified, not here: a
        // customer who abandons the gateway still has their basket.
        router.push(url);
        return;
      }

      toast.success("Order created successfully.");
      clearCart();
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

  const restart = () => {
    clearCheckoutSession();
    router.push(session?.store ? `/shops/${session.store}` : "/explore-shop");
  };

  const handleProceedToPayment = () => {
    if (!session || !paymentSource) return;

    if (isCheckoutExpired(session)) {
      setExpired(true);
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your basket is empty.");
      return;
    }

    mutate({
      orderType: "Shopping",
      state: session.state,
      guest: session.guest,
      // Ignored by the server when the quote carries a priced basket; sent so
      // a quote taken before itemisation still has an amount to fall back on.
      amount: session.goodsAmount ?? goodsAmount,
      store: session.store!,
      products: cartItems.map((item) => ({
        product: item.id,
        quantity: item.quantity,
      })),
      // The quote is the price. Any fee sent beside it would be ignored.
      quoteId: session.quoteId,
      dropoffLocation: session.dropoffLocation,
      deliveryType: "regular",
      paymentSource,
      callbackUrl: new URL("/order/success", window.location.origin).toString(),
    });
  };

  // Only a fallback for the line items: the authoritative basket value is the
  // one the server priced, which is also what the order is charged for.
  const goodsAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (session === null) {
    return (
      <Shell>
        <Notice
          title="We could not find your quote"
          body="Quotes are held for this browser tab only. Please go back to the store and check out again to get a fresh price."
          action={<Button onClick={restart}>Back to store</Button>}
        />
      </Shell>
    );
  }

  if (expired) {
    return (
      <Shell>
        <Notice
          title="This quote has expired"
          body="Prices are held for 15 minutes so the amount you see is the amount you pay. Your basket is still here — check out again for a new price."
          action={<Button onClick={restart}>Get a new quote</Button>}
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
        Your order
      </p>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Review and pay</h1>
      <p className="text-gray-500 text-sm mb-6">
        Check your basket and delivery details before paying.
      </p>

      <ul className="divide-y divide-gray-100 border-y border-gray-100">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex items-baseline justify-between gap-4 py-3"
          >
            <span className="text-sm text-gray-700">
              {item.title}
              <span className="text-gray-400"> × {item.quantity}</span>
            </span>
            <span className="text-sm font-medium text-gray-900 tabular-nums">
              {formatMoney(item.price * item.quantity, session.currency)}
            </span>
          </li>
        ))}
      </ul>

      <dl className="space-y-3 text-gray-800 mt-6">
        <Detail label="Deliver to" value={session.dropoffLocation} />
        <Detail label="State" value={session.state} />
      </dl>

      <ChargesBreakdown
        currency={session.currency}
        goodsAmount={session.goodsAmount ?? goodsAmount}
        deliveryFee={session.deliveryFee}
        serviceFee={session.serviceFee}
        taxAmount={session.taxAmount}
        taxLabel={session.taxLabel}
        grandTotal={session.grandTotal}
      />

      {session.grandTotal === undefined && (
        // Only reachable for a quote taken before the delivery-fee endpoint
        // itemised its charges.
        <p className="mt-3 text-xs text-gray-500">
          Service fee{session.taxLabel ? ` and ${session.taxLabel}` : ""} are
          calculated at payment and shown on your receipt.
        </p>
      )}

      <PaymentSourceSelector
        sources={market.config.paymentSources}
        value={paymentSource}
        onChange={setPaymentSource}
        isLoading={market.isLoading}
      />

      <div className="mt-8 text-center">
        <Button
          onClick={handleProceedToPayment}
          disabled={isPending || !paymentSource || cartItems.length === 0}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors duration-200 text-lg"
        >
          {isPending ? "Processing..." : "Proceed To Payment"}
        </Button>
      </div>

      <p className="text-center my-4 text-gray-500 text-sm">
        Vinkol covers up to {coverAmount} of damage or loss. Please note at
        checkout if goods are fragile.
      </p>
    </Shell>
  );
};

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 border border-gray-100">
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
