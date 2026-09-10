import { Country } from "./types";

/**
 * A guess at the visitor's market from their browser, for hosts that send no
 * geo header at all.
 *
 * The timezone is the useful signal: it needs no network call, no API key, no
 * third party and no permission prompt, it is read locally and mapped only to
 * the two markets we serve, and for Nigeria versus Canada it is decisive in a
 * way `navigator.language` is not — "en-US" and "en-GB" tell you nothing here.
 *
 * It is a *soft* default. A VPN or a traveller will be wrong, which is why the
 * footer switcher overrides it and the onboarding country step still asks.
 * Anything unrecognised returns null rather than guessing.
 */

const CANADA = new Set([
  "America/Toronto",
  "America/Montreal",
  "America/Vancouver",
  "America/Edmonton",
  "America/Winnipeg",
  "America/Halifax",
  "America/Regina",
  "America/St_Johns",
  "America/Moncton",
  "America/Iqaluit",
  "America/Whitehorse",
  "America/Yellowknife",
  "America/Dawson_Creek",
  "America/Dawson",
  "America/Inuvik",
  "America/Rankin_Inlet",
  "America/Resolute",
  "America/Cambridge_Bay",
  "America/Creston",
  "America/Fort_Nelson",
  "America/Glace_Bay",
  "America/Goose_Bay",
  "America/Nipigon",
  "America/Rainy_River",
  "America/Swift_Current",
  "America/Thunder_Bay",
  "America/Atikokan",
  "America/Blanc-Sablon",
  "America/Coral_Harbour",
  "Canada/Atlantic",
  "Canada/Central",
  "Canada/Eastern",
  "Canada/Mountain",
  "Canada/Newfoundland",
  "Canada/Pacific",
  "Canada/Saskatchewan",
]);

const NIGERIA = new Set(["Africa/Lagos"]);

export function countryFromTimezone(timezone?: string | null): Country | null {
  if (!timezone) return null;
  if (CANADA.has(timezone)) return "CA";
  if (NIGERIA.has(timezone)) return "NG";
  return null;
}

/** Second opinion: the region subtag of a locale, e.g. "en-CA" → CA. */
export function countryFromLocale(locale?: string | null): Country | null {
  const region = locale?.split("-")[1]?.toUpperCase();
  if (region === "CA") return "CA";
  if (region === "NG") return "NG";
  return null;
}

/** What this browser suggests, or null for no opinion. */
export function detectCountry(
  timezone?: string | null,
  locale?: string | null,
): Country | null {
  return countryFromTimezone(timezone) ?? countryFromLocale(locale);
}
