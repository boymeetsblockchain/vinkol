import { Country, Currency } from "@/lib/markets/types";

/**
 * The server's quote responses, which were entirely untyped — all three quote
 * getters returned `response.data` as `any`, and the one local shape that did
 * exist carried neither currency nor tax.
 *
 * Every figure here is authoritative. The client renders these and computes
 * none of them: `serviceFee` and `taxAmount` are itemised by the server from
 * the market's own rates, and `grandTotal` is what the gateway will actually
 * charge. Reading `price` and adding a locally-guessed fee is how the store
 * checkout came to display a total ~15% below the real Canadian charge.
 */
export interface QuoteCharges {
  country: Country;
  currency: Currency;
  /** Processing fee. Rate differs by market and is never sent to the client. */
  serviceFee: number;
  taxAmount: number;
  taxRate: number;
  /** "HST" in Canada, empty in Nigeria. Empty hides the row. */
  taxLabel: string;
  /** Charge the gateway will take. The only total safe to display. */
  grandTotal: number;
}

/** Claimed atomically at order time, and valid for 15 minutes. */
export interface QuoteClaim {
  quoteId: string;
  expiresAt: string;
}

/** POST /orders/get-quote */
export interface DeliveryQuote extends QuoteCharges, QuoteClaim {
  /** The bare fare, before charges. Not a total — do not display it as one. */
  price: number;
  discountedPrice?: number;
}

/**
 * POST /orders/shopping-delivery-fee
 *
 * Itemised when the request carried the basket. The charge fields are optional
 * because a request without `products` still gets a delivery-only quote.
 */
export interface ShoppingDeliveryQuote extends QuoteClaim {
  price: number;
  distance?: number;
  country: Country;
  currency: Currency;
  taxRate: number;
  taxLabel: string;
  /** The basket as the server valued it, not as the client totalled it. */
  goodsAmount?: number;
  deliveryFee?: number;
  serviceFee?: number;
  taxAmount?: number;
  grandTotal?: number;
}

/** POST /orders/get-bulk-quote */
export interface BulkQuote extends QuoteCharges, QuoteClaim {
  quote: unknown;
  totalAmount: number;
  totalDistance?: number;
  route?: unknown;
  stops?: unknown;
}

/** POST /orders/multi-order-quote */
export interface MultiOrderQuote extends QuoteCharges, QuoteClaim {
  quote: unknown;
  quoteDetails?: unknown;
  totalAmount: number;
  totalOrders: number;
}

/**
 * A quote can no longer be used, and the customer must re-quote. Both cases
 * come back as a 400, so they are distinguished by message.
 */
export const isQuoteUnusable = (message?: string): boolean =>
  !!message && /quote (has already been used|has expired|not found)/i.test(message);
