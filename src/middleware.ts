import { NextRequest, NextResponse } from "next/server";

import {
  MARKET_COOKIE,
  MARKET_PREFIX,
  hasMarketVersion,
} from "@/lib/markets";
import { countryFromHeaders } from "@/lib/markets/geoHeader";
import { Country, isCountry } from "@/lib/markets/types";

/**
 * Sends a first-time Canadian visitor to the Canadian version of a page, once.
 *
 * The path stays the authority on which market a page shows — a /ca link is
 * Canadian wherever it is opened, so it can be shared, indexed and used in a
 * campaign. Geolocation only decides where an unprefixed *first* visit lands,
 * and the choice is then remembered so this never fights a visitor who
 * deliberately switched markets.
 *
 * Only routes that actually have a per-market version are redirected. An
 * allowlist rather than a list of exemptions, because getting that backwards
 * sends visitors to a URL with no page behind it: the booking forms, the store
 * flow and the dashboards are each one shared route whose market comes from the
 * pickup address or the signed-in account.
 *
 * Note this does not guard the dashboards. The access token lives in
 * localStorage, which middleware cannot read; moving it to a cookie is a
 * separate decision.
 */

/**
 * Crawlers are never redirected, so both markets stay independently indexable
 * and a bot cannot be bounced in a loop by a cookie it ignores.
 */
const CRAWLER =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|showyoubot|outbrain|pinterest|vkshare|w3c_validator|whatsapp|telegram|discord|lighthouse/i;

const COOKIE_OPTIONS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax" as const,
};

const hasMarketPrefix = (pathname: string) =>
  Object.values(MARKET_PREFIX).some(
    (prefix) =>
      prefix && (pathname === prefix || pathname.startsWith(`${prefix}/`)),
  );

const remember = (response: NextResponse, country: Country) => {
  response.cookies.set(MARKET_COOKIE, country, COOKIE_OPTIONS);
  return response;
};

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (hasMarketPrefix(pathname)) return NextResponse.next();

  if (CRAWLER.test(request.headers.get("user-agent") ?? "")) {
    return NextResponse.next();
  }

  // A remembered choice wins over geolocation, including a deliberate switch
  // back to the Nigerian site from within Canada.
  if (isCountry(request.cookies.get(MARKET_COOKIE)?.value)) {
    return NextResponse.next();
  }

  const geo = countryFromHeaders(request.headers);
  if (!geo) return NextResponse.next();

  // Remember either way, so the geo check happens at most once per visitor
  // even on a page with no market version of its own.
  const prefix = MARKET_PREFIX[geo];
  if (!prefix || !hasMarketVersion(pathname)) {
    return remember(NextResponse.next(), geo);
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? prefix : `${prefix}${pathname}`;
  url.search = search;

  return remember(NextResponse.redirect(url), geo);
}

export const config = {
  matcher: [
    // Everything except Next internals and files with an extension.
    "/((?!_next/|favicon|.*\\.).*)",
  ],
};
