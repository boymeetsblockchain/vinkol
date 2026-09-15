/**
 * Mirrors the server's `interfaces/marketInterfaces.ts` and the projection
 * served by `GET /others/markets`. Mirrored by hand rather than shared, and
 * deliberately narrower than the server's MarketConfig: the rate card,
 * processing fee rate and revenue split are not here because nothing on the
 * client may compute a price. Every monetary figure shown to a user comes from
 * a quote or an order.
 */

export type Country = "NG" | "CA";
export type Currency = "NGN" | "CAD";

/**
 * Globus is deliberately absent: it is switched off for now, and the server
 * still returns it for Nigeria, so leaving it in the union would let it render
 * again. Add it back here first if it is ever re-enabled.
 */
export type PaymentSource = "Paystack" | "Stripe" | "Wallet";

export interface BankAccountShape {
  /** False in Canada: the name cannot be resolved, so it must be entered. */
  supportsAccountResolution: boolean;
  accountNumberLength: { min: number; max: number };
  /** True in Canada, which needs institution + transit instead of a bankCode. */
  requiresInstitutionAndTransit: boolean;
}

export interface MarketConfig {
  country: Country;
  currency: Currency;
  currencyDecimals: number;
  locale: string;
  timezone: string;
  tax: { label: string };
  paymentSources: PaymentSource[];
  customerWalletsEnabled: boolean;
  tippingEnabled: boolean;
  minimumTip: number;
  bankAccount: BankAccountShape;
}

export const COUNTRIES: Country[] = ["NG", "CA"];

export const isCountry = (value: unknown): value is Country =>
  typeof value === "string" && (COUNTRIES as string[]).includes(value);

export const DEFAULT_COUNTRY: Country = "NG";

export const CURRENCY_FOR: Record<Country, Currency> = {
  NG: "NGN",
  CA: "CAD",
};

export const COUNTRY_NAMES: Record<Country, string> = {
  NG: "Nigeria",
  CA: "Canada",
};

/**
 * ISO 3166-1 alpha-2 lowercased, which is what the Google Places
 * `componentRestrictions` option expects.
 */
export const PLACES_COUNTRY: Record<Country, string> = {
  NG: "ng",
  CA: "ca",
};
