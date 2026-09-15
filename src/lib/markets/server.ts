import { cookies, headers } from "next/headers";

import { countryFromHeaders } from "./geoHeader";
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
 * falls back to whichever geo header the host sends on a first request that has
 * not been redirected (a crawler, or a market with no prefix of its own). Where
 * the host sends none, a client-side timezone check writes the cookie instead.
 */
export async function marketFromRequest(): Promise<Country> {
  const remembered = (await cookies()).get(MARKET_COOKIE)?.value;
  if (isCountry(remembered)) return remembered;

  return countryFromHeaders(await headers()) ?? DEFAULT_COUNTRY;
}
