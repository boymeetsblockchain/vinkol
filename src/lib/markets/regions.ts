import { Country, DEFAULT_COUNTRY } from "./types";

/**
 * A state or province.
 *
 * `value` is what goes on the wire and into Mongo, and is title case because
 * that is what existing store and order documents already hold — store search
 * does a case-insensitive exact match, so a slug or a long_name finds nothing.
 * `label` is display only, which is how "FCT" can read as "Federal Capital
 * Territory (Abuja)" in a dropdown without changing the stored value.
 * `code` is the ISO 3166-2 subdivision code.
 *
 * Note this is not the tax region. The server derives that itself from the
 * pickup coordinates, because tax jurisdiction follows where the service is
 * performed and a client must not be able to pick its own rate.
 */
export interface Region {
  value: string;
  label: string;
  code: string;
}

const NIGERIAN_STATES: Region[] = [
  { value: "Abia", label: "Abia", code: "AB" },
  { value: "Adamawa", label: "Adamawa", code: "AD" },
  { value: "Akwa Ibom", label: "Akwa Ibom", code: "AK" },
  { value: "Anambra", label: "Anambra", code: "AN" },
  { value: "Bauchi", label: "Bauchi", code: "BA" },
  { value: "Bayelsa", label: "Bayelsa", code: "BY" },
  { value: "Benue", label: "Benue", code: "BE" },
  { value: "Borno", label: "Borno", code: "BO" },
  { value: "Cross River", label: "Cross River", code: "CR" },
  { value: "Delta", label: "Delta", code: "DE" },
  { value: "Ebonyi", label: "Ebonyi", code: "EB" },
  { value: "Edo", label: "Edo", code: "ED" },
  { value: "Ekiti", label: "Ekiti", code: "EK" },
  { value: "Enugu", label: "Enugu", code: "EN" },
  { value: "Gombe", label: "Gombe", code: "GO" },
  { value: "Imo", label: "Imo", code: "IM" },
  { value: "Jigawa", label: "Jigawa", code: "JI" },
  { value: "Kaduna", label: "Kaduna", code: "KD" },
  { value: "Kano", label: "Kano", code: "KN" },
  { value: "Katsina", label: "Katsina", code: "KT" },
  { value: "Kebbi", label: "Kebbi", code: "KE" },
  { value: "Kogi", label: "Kogi", code: "KO" },
  { value: "Kwara", label: "Kwara", code: "KW" },
  { value: "Lagos", label: "Lagos", code: "LA" },
  { value: "Nasarawa", label: "Nasarawa", code: "NA" },
  { value: "Niger", label: "Niger", code: "NI" },
  { value: "Ogun", label: "Ogun", code: "OG" },
  { value: "Ondo", label: "Ondo", code: "ON" },
  { value: "Osun", label: "Osun", code: "OS" },
  { value: "Oyo", label: "Oyo", code: "OY" },
  { value: "Plateau", label: "Plateau", code: "PL" },
  { value: "Rivers", label: "Rivers", code: "RI" },
  { value: "Sokoto", label: "Sokoto", code: "SO" },
  { value: "Taraba", label: "Taraba", code: "TA" },
  { value: "Yobe", label: "Yobe", code: "YO" },
  { value: "Zamfara", label: "Zamfara", code: "ZA" },
  { value: "FCT", label: "Federal Capital Territory (Abuja)", code: "FC" },
];

/**
 * All thirteen, even though delivery is Toronto-only at launch: the server's
 * tax table is keyed by these codes, and a store or rider may hold an address
 * outside the delivery area.
 */
const CANADIAN_PROVINCES: Region[] = [
  { value: "Alberta", label: "Alberta", code: "AB" },
  { value: "British Columbia", label: "British Columbia", code: "BC" },
  { value: "Manitoba", label: "Manitoba", code: "MB" },
  { value: "New Brunswick", label: "New Brunswick", code: "NB" },
  {
    value: "Newfoundland and Labrador",
    label: "Newfoundland and Labrador",
    code: "NL",
  },
  { value: "Northwest Territories", label: "Northwest Territories", code: "NT" },
  { value: "Nova Scotia", label: "Nova Scotia", code: "NS" },
  { value: "Nunavut", label: "Nunavut", code: "NU" },
  { value: "Ontario", label: "Ontario", code: "ON" },
  { value: "Prince Edward Island", label: "Prince Edward Island", code: "PE" },
  { value: "Quebec", label: "Quebec", code: "QC" },
  { value: "Saskatchewan", label: "Saskatchewan", code: "SK" },
  { value: "Yukon", label: "Yukon", code: "YT" },
];

export const REGIONS: Record<Country, Region[]> = {
  NG: NIGERIAN_STATES,
  CA: CANADIAN_PROVINCES,
};

export const regionsFor = (country: Country = DEFAULT_COUNTRY): Region[] =>
  REGIONS[country] ?? REGIONS[DEFAULT_COUNTRY];

/** Display label for a stored value, falling back to the value itself. */
export const regionLabel = (
  value: string,
  country: Country = DEFAULT_COUNTRY,
): string =>
  regionsFor(country).find((r) => r.value === value)?.label ?? value;

interface AddressComponent {
  types: string[];
  short_name: string;
  long_name: string;
}

const normalize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+state$/, "")
    .replace(/[^a-z]/g, "");

/**
 * The canonical region for a Google Places result.
 *
 * Google returns a subdivision code as `short_name` and a full name as
 * `long_name`, and neither reliably matches what we store — "Akwa Ibom State",
 * "Federal Capital Territory", "ON". Matching the code first and then the
 * loosened name is what lets one stored spelling survive both.
 *
 * Returns null when nothing matches, so a caller can decline rather than write
 * an unmatchable state that store search will never find.
 */
export function resolveRegionFromPlace(
  components: AddressComponent[] | undefined,
  country: Country = DEFAULT_COUNTRY,
): Region | null {
  const area = components?.find((c) =>
    c.types.includes("administrative_area_level_1"),
  );
  if (!area) return null;

  const regions = regionsFor(country);

  const byCode = regions.find(
    (r) => r.code.toLowerCase() === area.short_name?.trim().toLowerCase(),
  );
  if (byCode) return byCode;

  const target = normalize(area.long_name ?? area.short_name ?? "");
  if (!target) return null;

  return (
    regions.find((r) => normalize(r.value) === target) ??
    regions.find((r) => normalize(r.label) === target) ??
    null
  );
}
