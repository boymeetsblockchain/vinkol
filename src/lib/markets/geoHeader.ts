import { Country, isCountry } from "./types";

/**
 * The visitor's country from whichever geo header the host happens to send.
 *
 * `x-vercel-ip-country` was read directly in two places, so the whole
 * market-detection chain silently degraded to the Nigerian default anywhere
 * else — including local development, where no host sets it and the geo path
 * has therefore never been exercisable.
 *
 * All of these are free and need no configuration; the last is an escape hatch
 * for a reverse proxy that resolves the country itself (nginx with GeoIP, say).
 */
const HEADERS = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "cloudfront-viewer-country",
  "x-geo-country",
] as const;

/** Cloudflare's "no opinion" values. Treated as absent rather than as a country. */
const UNKNOWN = new Set(["XX", "T1"]);

/** Anything with a `get`, so NextRequest.headers and next/headers both fit. */
interface HeaderBag {
  get(name: string): string | null | undefined;
}

const clean = (value: string | null | undefined): Country | null => {
  const code = value?.trim().toUpperCase();
  if (!code || UNKNOWN.has(code)) return null;
  return isCountry(code) ? code : null;
};

/**
 * Netlify sends base64 JSON rather than a bare code, e.g.
 * `{"country":{"code":"CA"}}`.
 */
const fromNetlify = (value: string | null | undefined): Country | null => {
  if (!value) return null;
  try {
    const decoded = JSON.parse(
      typeof atob === "function"
        ? atob(value)
        : Buffer.from(value, "base64").toString("utf8"),
    );
    return clean(decoded?.country?.code);
  } catch {
    return null;
  }
};

export function countryFromHeaders(headers: HeaderBag): Country | null {
  for (const name of HEADERS) {
    const country = clean(headers.get(name));
    if (country) return country;
  }
  return fromNetlify(headers.get("x-nf-geo"));
}
