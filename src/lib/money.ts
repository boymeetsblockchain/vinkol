import { Currency, DEFAULT_COUNTRY, CURRENCY_FOR } from "./markets/types";

/**
 * Formatting only. There is deliberately no arithmetic here.
 *
 * Every monetary figure shown to a user comes from the server — a quote, an
 * order, a wallet balance. The client previously recomputed the processing fee
 * and displayed a grand total it never sent, which is how a Canadian customer
 * would have been quoted ~15% under what their card was charged.
 *
 * Mirrors the server's `src/lib/money.ts` display rules so the same amount
 * reads identically in an email, in the app and here.
 */

const DISPLAY: Record<Currency, { symbol: string; locale: string; decimals: number }> =
  {
    // Kobo is out of circulation, so every naira amount here is whole.
    NGN: { symbol: "₦", locale: "en-NG", decimals: 0 },
    CAD: { symbol: "C$", locale: "en-CA", decimals: 2 },
  };

const FALLBACK_CURRENCY: Currency = CURRENCY_FOR[DEFAULT_COUNTRY];

/** "₦3,450" / "C$18.70". Empty string for anything unreadable as a number. */
export function formatMoney(
  value: number | string | null | undefined,
  currency: Currency = FALLBACK_CURRENCY,
): string {
  const numeric = typeof value === "string" ? Number(value) : value;
  if (numeric === null || numeric === undefined || !Number.isFinite(numeric)) {
    return "";
  }

  const { symbol, locale, decimals } = DISPLAY[currency] ?? DISPLAY[FALLBACK_CURRENCY];
  const showDecimals = decimals > 0 && numeric % 1 !== 0;

  return `${symbol}${numeric.toLocaleString(locale, {
    minimumFractionDigits: showDecimals ? decimals : 0,
    maximumFractionDigits: decimals,
  })}`;
}

/** Just the symbol, for a label like "Price (₦)". */
export const currencySymbol = (
  currency: Currency = FALLBACK_CURRENCY,
): string => (DISPLAY[currency] ?? DISPLAY[FALLBACK_CURRENCY]).symbol;
