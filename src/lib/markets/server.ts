import { cookies, headers } from "next/headers";

import { MARKET_COOKIE } from "./index";
import { Country, DEFAULT_COUNTRY, isCountry } from "./types";

/**
 * The visitor's market, for server components on shared (unprefixed) routes.
 *
 * Market-specific pages take their country from the path instead — that is what
 * makes a /ca link Canadian wherever it is opened. This is for the routes that
 * exist once and must still show the right market's stores: the store
 * directory, search, a store page.
 *
 * Reads the cookie the middleware and the country switcher both write, and
 * falls back to the geo header on a first request that has not been redirected
 * (a crawler, or a market with no prefix of its own).
 */
export async function marketFromRequest(): Promise<Country> {
  const remembered = (await cookies()).get(MARKET_COOKIE)?.value;
  if (isCountry(remembered)) return remembered;

  const geo = (await headers()).get("x-vercel-ip-country")?.toUpperCase();
  return isCountry(geo) ? geo : DEFAULT_COUNTRY;
}
