import { Country, Currency } from "@/lib/markets/types";

/**
 * The handoff between a booking form and its quote page.
 *
 * This used to travel in the query string — the customer's name, email, phone
 * and full street address, plus the delivery fee. That put PII into browser
 * history, server access logs and `Referer` headers, and let anyone edit the
 * fee in the address bar before it was submitted as authoritative.
 *
 * sessionStorage instead: same tab, cleared when it closes, never sent to a
 * server. The cart already travelled this way, so checkout now has one
 * transport rather than two.
 */

const KEY = "checkout";

export interface CheckoutGuest {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

/**
 * Everything the quote page needs. The money fields are the server's own
 * itemisation, carried across verbatim — nothing here is recomputed.
 */
export interface CheckoutSession {
  /** Claims the server-side price at order time. Without it the order is
   * treated as a pre-quotes client and priced as Nigerian. */
  quoteId: string;
  country: Country;
  currency: Currency;

  guest: CheckoutGuest;
  state: string;

  /** Who the package is for, when the customer chose to add them. */
  receiverContact?: { name: string; phone: string };

  /** Free-text addresses, as submitted. */
  pickupLocation?: string;
  dropoffLocation: string;

  date?: string;
  time?: string;
  deliveryType?: string;
  vehicleRequest?: string;
  orderType?: string;
  note?: string;

  /** Store order only. */
  store?: string;
  /** Basket subtotal, for display beside the server's itemised charges. */
  goodsAmount?: number;

  /** Server-itemised. Absent where the endpoint does not itemise. */
  deliveryFee: number;
  serviceFee?: number;
  taxAmount?: number;
  taxLabel?: string;
  grandTotal?: number;

  /** ISO timestamp. A quote is good for 15 minutes. */
  expiresAt?: string;
}

export const saveCheckoutSession = (session: CheckoutSession) => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    // A private window with storage disabled should not break the booking.
  }
};

export const getCheckoutSession = (): CheckoutSession | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CheckoutSession) : null;
  } catch {
    return null;
  }
};

export const clearCheckoutSession = () => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // Nothing to do.
  }
};

/** A quote past its TTL cannot be claimed, so re-quote rather than submit it. */
export const isCheckoutExpired = (session: CheckoutSession): boolean =>
  !!session.expiresAt && new Date(session.expiresAt).getTime() <= Date.now();
