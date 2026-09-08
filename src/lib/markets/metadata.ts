import type { Metadata } from "next";

import { contentFor, marketPath } from "./index";
import { Country, COUNTRIES, DEFAULT_COUNTRY } from "./types";

/**
 * Per-page metadata for both markets.
 *
 * The app previously had exactly one metadata block for the whole site
 * (title: "Vinkol"), so every page competed for the same search result. This
 * gives each page a distinct title and description, and — importantly for two
 * markets on one domain — `alternates` so /about and /ca/about do not compete
 * with each other.
 *
 * Deliberately sets no og:image. `opengraph-image.png` in the app directory is
 * a Next file convention: Next generates the image tags and their dimensions
 * itself, and a manual og:image here would conflict with it.
 */

/** Unset until the production domain is confirmed, so canonicals stay relative. */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const metadataBase = SITE_URL ? new URL(SITE_URL) : undefined;

interface PageMetaOptions {
  country: Country;
  /** Page title without the brand. "Book a Delivery", not "Book a Delivery | Vinkol". */
  title: string;
  description: string;
  /** Unprefixed path, e.g. "/about". Used to build canonical and alternates. */
  path: string;
}

export function pageMetadata({
  country,
  title,
  description,
  path,
}: PageMetaOptions): Metadata {
  const { meta } = contentFor(country);

  return {
    title: `${title} — ${meta.titleSuffix}`,
    description,
    alternates: {
      canonical: marketPath(path, country),
      languages: Object.fromEntries(
        COUNTRIES.map((c) => [
          c === DEFAULT_COUNTRY ? "en-NG" : "en-CA",
          marketPath(path, c),
        ]),
      ),
    },
    openGraph: {
      title: `${title} — ${meta.titleSuffix}`,
      description,
      url: marketPath(path, country),
      siteName: meta.titleSuffix,
      locale: country === "CA" ? "en_CA" : "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${meta.titleSuffix}`,
      description,
    },
  };
}

/** The home page, which takes the brand as its title rather than a suffix. */
export function homeMetadata(country: Country): Metadata {
  const { meta, serviceArea } = contentFor(country);

  return {
    ...pageMetadata({
      country,
      title: `Same-day delivery in ${serviceArea}`,
      description: meta.defaultDescription,
      path: "/",
    }),
    title: `${meta.titleSuffix} — Same-day delivery in ${serviceArea}`,
  };
}
