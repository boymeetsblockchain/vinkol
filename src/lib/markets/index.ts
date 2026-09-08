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
 * Which market a marketing path belongs to.
 *
 * The path is the authority on public pages: a /ca URL shows Canadian content
 * no matter where the visitor is, so the page can be shared and indexed.
 * Geolocation only decides where an unprefixed first visit is *sent*.
 */
export function marketFromPath(pathname: string): Country {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0]?.toUpperCase();

  for (const [country, prefix] of Object.entries(MARKET_PREFIX)) {
    if (prefix && prefix === `/${segments[0]}`) return country as Country;
  }

  return isCountry(first) && first !== DEFAULT_COUNTRY
    ? (first as Country)
    : DEFAULT_COUNTRY;
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
] as const;

/**
 * A link that stays in the current market where a market-specific page exists,
 * and points at the shared route where it does not.
 */
export function marketLink(path: string, country: Country): string {
  return (MARKET_ROUTES as readonly string[]).includes(path)
    ? marketPath(path, country)
    : path;
}

/** Prefix an in-market link. `/about` in Canada becomes `/ca/about`. */
export function marketPath(path: string, country: Country): string {
  const prefix = MARKET_PREFIX[country] ?? "";
  if (!prefix) return path;
  return path === "/" ? prefix : `${prefix}${path}`;
}

/** The same page in another market, for the country switcher. */
export function swapMarketPath(pathname: string, to: Country): string {
  const from = marketFromPath(pathname);
  const fromPrefix = MARKET_PREFIX[from];
  const bare = fromPrefix && pathname.startsWith(fromPrefix)
    ? pathname.slice(fromPrefix.length) || "/"
    : pathname;

  return marketPath(bare, to);
}
