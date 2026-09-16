import type { Metadata } from "next";
import Link from "next/link";
import { XCircle } from "lucide-react";

import { Button } from "@/components/button";
import { OrderState, OrderStateShell } from "@/components/order/state";
import { marketLink } from "@/lib/markets";
import { marketFromRequest } from "@/lib/markets/server";

export const metadata: Metadata = {
  title: "Payment cancelled",
  // A transactional landing page reached only from the gateway. Nothing here
  // belongs in a search result.
  robots: { index: false, follow: false },
};

/**
 * Where Stripe sends a customer who backs out of its checkout.
 *
 * Its own route rather than a query parameter on the success page, so the URL
 * a customer is left looking at does not say "success" when they cancelled.
 *
 * Deliberately static: no reference to verify and no API call to make. Stripe
 * appends ?reference and ?status, but nothing was charged, so there is nothing
 * to look up — and the order the customer abandoned is already Pending
 * server-side, where the stale-order job clears it.
 */
export default async function OrderCancelledPage() {
  const country = await marketFromRequest();

  return (
    <OrderStateShell>
      <OrderState
        icon={<XCircle className="text-gray-500" size={48} />}
        title="Payment cancelled"
        description={
          <>
            You left the payment page before it finished, so nothing was charged
            and your order was not placed.
            <br />
            Prices are quoted fresh each time, so please start again when you
            are ready — your basket is untouched.
          </>
        }
        actions={
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/book-a-delivery">
              <Button className="py-2 px-4">Book a delivery</Button>
            </Link>
            <Link href={marketLink("/", country)}>
              <Button variant="outline" className="py-2 px-4">
                Return home
              </Button>
            </Link>
          </div>
        }
      />
    </OrderStateShell>
  );
}
