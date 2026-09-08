import { Country, DEFAULT_COUNTRY } from "./markets/types";

/**
 * Phone numbers in one canonical E.164 form.
 *
 * Mirrors the server's `src/lib/phone.ts`. The two disagreed before: forms
 * required exactly 11 characters — Nigeria's local format — while the server's
 * OTP schema required E.164 with a leading +. So the frontend's own validation
 * produced values the server rejected, and a 10-digit Canadian number failed
 * before it ever left the browser.
 */

export const E164_PATTERN = /^\+[1-9]\d{1,13}$/;

/**
 * Shortest total digit count we will accept, dialling code included.
 *
 * E.164 permits as few as two digits after the +, so the pattern alone accepts
 * "+234123" — which is what "123" typed into a Nigerian form becomes. No real
 * subscriber number in either market is under eleven digits with its country
 * code, and 8 is the floor across every country code in use.
 */
const MIN_DIGITS = 8;

const isPlausible = (candidate: string) =>
  E164_PATTERN.test(candidate) && candidate.length - 1 >= MIN_DIGITS;

const DIALLING_CODE: Record<Country, string> = { NG: "234", CA: "1" };

/**
 * National subscriber digits, dialling code excluded. Both markets use ten —
 * a Nigerian mobile without its leading 0, a Canadian number with its area
 * code. Enforced only when interpreting a number *as* local to a market, so a
 * genuine foreign number typed with its + is still accepted.
 */
const NATIONAL_DIGITS: Record<Country, number> = { NG: 10, CA: 10 };

/** National trunk prefix to drop before prepending the dialling code. */
const TRUNK_PREFIX: Record<Country, string> = { NG: "0", CA: "1" };

/** Null when the input cannot be read as a number for that market. */
export function normalizePhone(
  input: string,
  country: Country = DEFAULT_COUNTRY,
): string | null {
  const trimmed = (input ?? "").trim();
  if (!trimmed) return null;

  const hadPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return null;

  // Already international, whether or not the + survived the round trip.
  if (hadPlus) {
    const candidate = `+${digits}`;
    return isPlausible(candidate) ? candidate : null;
  }

  const code = DIALLING_CODE[country] ?? DIALLING_CODE[DEFAULT_COUNTRY];
  if (digits.startsWith(code)) {
    const candidate = `+${digits}`;
    return isPlausible(candidate) ? candidate : null;
  }

  const trunk = TRUNK_PREFIX[country] ?? TRUNK_PREFIX[DEFAULT_COUNTRY];
  const national = digits.startsWith(trunk)
    ? digits.slice(trunk.length)
    : digits;

  if (national.length !== NATIONAL_DIGITS[country]) return null;

  const candidate = `+${code}${national}`;
  return isPlausible(candidate) ? candidate : null;
}

export const phonePlaceholder = (country: Country): string =>
  country === "CA" ? "e.g. 416 555 0142" : "e.g. 08012345678";
