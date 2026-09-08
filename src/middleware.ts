import { NextRequest, NextResponse } from "next/server";

import { MARKET_COOKIE, MARKET_PREFIX } from "@/lib/markets";
import { Country, isCountry } from "@/lib/markets/types";

/**
 * Sends a first-time Canadian visitor to the Canadian site, once.
 *
 * The path stays the authority on which market a page shows — a /ca link is
 * Canadian wherever it is opened, so it can be shared, indexed and used in a
 * campaign. Geolocation only decides where an unprefixed *first* visit lands,
 * and the choice is then remembered so this never fights a visitor who
 * deliberately switched markets.
 *
 * Note this does not guard the dashboards. The access token lives in
 * localStorage, which middleware cannot read; moving it to a cookie is a
 * separate decision.
 */

/** App areas that are market-scoped by the signed-in account, not the URL. */
const EXEMPT_PREFIXES = [
  "/shop",
  "/shops",
  "/rider",
  "/shopper",
  "/explore-shop",
  "/api",
  "/order",
  "/quote",
];

/**
 * Crawlers are never redirected, so both markets stay independently
 * indexable and a bot cannot be bounced into a loop by a cookie it ignores.
 */
const CRAWLER = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|showyoubot|outbrain|pinterest|vkshare|w3c_validator|whatsapp|telegram|discord|lighthouse/i;

const isExempt = (pathname: string) =>
  EXEMPT_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

const hasMarketPrefix = (pathname: string) =>
  Object.values(MARKET_PREFIX).some(
    (prefix) =>
      prefix && (pathname === prefix || pathname.startsWith(`${prefix}/`)),
  );

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (isExempt(pathname) || hasMarketPrefix(pathname)) {
    return NextResponse.next();
  }

  if (CRAWLER.test(request.headers.get("user-agent") ?? "")) {
    return NextResponse.next();
  }

  // A remembered choice wins over geolocation, including a deliberate switch
  // back to the Nigerian site from within Canada.
  const remembered = request.cookies.get(MARKET_COOKIE)?.value;
  if (isCountry(remembered)) {
    return NextResponse.next();
  }

  const geo = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  const country: Country | null = isCountry(geo) ? geo : null;
  const prefix = country ? MARKET_PREFIX[country] : "";

  // Remember the market either way, so the geo lookup and this redirect happen
  // at most once per visitor.
  if (!prefix) {
    const response = NextResponse.next();
    if (country) response.cookies.set(MARKET_COOKIE, country, COOKIE_OPTIONS);
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? prefix : `${prefix}${pathname}`;
  url.search = search;

  const response = NextResponse.redirect(url);
  response.cookies.set(MARKET_COOKIE, country!, COOKIE_OPTIONS);
  return response;
}

const COOKIE_OPTIONS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax" as const,
};

export const config = {
  matcher: [
    // Everything except Next internals and files with an extension.
    "/((?!_next/|favicon|.*\\.).*)",
  ],
};
