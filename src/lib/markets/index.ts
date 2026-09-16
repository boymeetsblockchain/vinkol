import { MARKET_CONTENT, MarketContent } from "./content";
import {
  COUNTRY_NAMES,
  Country,
  CURRENCY_FOR,
  Currency,
  DEFAULT_COUNTRY,
  PLACES_COUNTRY,
  isCountry,
} from "./types";

export * from "./types";
export * from "./regions";
export type { MarketContent, Testimonial } from "./content";
export { MARKET_CONTENT } from "./content";

/** Path prefix per market. Nigeria is the unprefixed default. */
export const MARKET_PREFIX: Record<Country, string> = {
  NG: "",
  CA: "/ca",
};

export const MARKET_COOKIE = "vinkol_market";

export const contentFor = (
  country: Country = DEFAULT_COUNTRY,
): MarketContent => MARKET_CONTENT[country] ?? MARKET_CONTENT[DEFAULT_COUNTRY];

export const currencyFor = (country: Country = DEFAULT_COUNTRY): Currency =>
  CURRENCY_FOR[country] ?? CURRENCY_FOR[DEFAULT_COUNTRY];

export const countryName = (country: Country = DEFAULT_COUNTRY): string =>
  COUNTRY_NAMES[country] ?? COUNTRY_NAMES[DEFAULT_COUNTRY];

/**
 * The Places `componentRestrictions` for a market. Passing both is for
 * surfaces that are market-neutral; anything that feeds an order must restrict
 * to one, since the pickup coordinates decide tax jurisdiction.
 */
export const placesCountry = (country: Country = DEFAULT_COUNTRY): string =>
  PLACES_COUNTRY[country] ?? PLACES_COUNTRY[DEFAULT_COUNTRY];

export const ALL_PLACES_COUNTRIES = Object.values(PLACES_COUNTRY);

/**
 * The market a path *names*, or null where it names none.
 *
 * The path is the authority on public pages: a /ca URL shows Canadian content
 * no matter where the visitor is, so the page can be shared and indexed.
 * Geolocation only decides where an unprefixed first visit is *sent*.
 *
 * Nullable because "no prefix" and "the Nigerian prefix" are different facts:
 * an unprefixed path names no market, which is what lets a caller fall through
 * to another source rather than assuming Nigeria.
 */
export function marketPrefixCountry(pathname: string): Country | null {
  const first = pathname.split("/").filter(Boolean)[0];
  if (!first) return null;

  for (const [country, prefix] of Object.entries(MARKET_PREFIX)) {
    if (prefix && prefix === `/${first}`) return country as Country;
  }

  const upper = first.toUpperCase();
  return isCountry(upper) && upper !== DEFAULT_COUNTRY ? upper : null;
}

/** Which market a path belongs to, treating an unprefixed path as Nigerian. */
export function marketFromPath(pathname: string): Country {
  return marketPrefixCountry(pathname) ?? DEFAULT_COUNTRY;
}

/**
 * The public pages that exist per market. Anything else — the booking forms,
 * the store flow, the dashboards — is one shared route whose market comes from
 * the pickup address or the signed-in account, so prefixing it would create a
 * URL with no page behind it.
 */
export const MARKET_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/become-a-rider",
  "/become-a-personal-shopper",
  "/privacy-policy",
  "/terms-and-conditions",
  "/terms-and-conditions-customer",
] as const;

/** Exact match: /terms-and-conditions-customer is not /terms-and-conditions. */
export function hasMarketVersion(pathname: string): boolean {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  return (MARKET_ROUTES as readonly string[]).includes(normalized);
}

/**
 * A link that stays in the current market where a market-specific page exists,
 * and points at the shared route where it does not.
 */
export function marketLink(path: string, country: Country): string {
  return hasMarketVersion(path) ? marketPath(path, country) : path;
}

/** Prefix an in-market link. `/about` in Canada becomes `/ca/about`. */
export function marketPath(path: string, country: Country): string {
  const prefix = MARKET_PREFIX[country] ?? "";
  if (!prefix) return path;
  return path === "/" ? prefix : `${prefix}${path}`;
}

/**
 * The same page in another market, or this page where only one version exists.
 *
 * Guarded like marketLink: prefixing unconditionally sent a visitor switching
 * market on /waitlist to /ca/waitlist, which has no page behind it.
 */
export function swapMarketPath(pathname: string, to: Country): string {
  const from = marketFromPath(pathname);
  const fromPrefix = MARKET_PREFIX[from];
  const bare =
    fromPrefix && pathname.startsWith(fromPrefix)
      ? pathname.slice(fromPrefix.length) || "/"
      : pathname;

  return hasMarketVersion(bare) ? marketPath(bare, to) : bare;
}
