"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { useMarkets } from "@/services/markets/query";
import { MarketContent } from "./content";
import {
  contentFor,
  currencyFor,
  hasMarketVersion,
  marketPrefixCountry,
} from "./index";
import { useRequestMarket } from "./context";
import {
  Country,
  Currency,
  DEFAULT_COUNTRY,
  MarketConfig,
  isCountry,
} from "./types";

/**
 * Config to fall back on while `/others/markets` is in flight, or if it fails.
 *
 * A screen must still render money and a payment option with no network, so
 * these are the Nigerian values — the market every existing account belongs to.
 * Deliberately contains nothing that could produce a price.
 */
const FALLBACK: Record<Country, MarketConfig> = {
  NG: {
    country: "NG",
    currency: "NGN",
    currencyDecimals: 0,
    locale: "en-NG",
    timezone: "Africa/Lagos",
    tax: { label: "" },
    paymentSources: ["Paystack", "Wallet"],
    customerWalletsEnabled: true,
    tippingEnabled: true,
    minimumTip: 500,
    bankAccount: {
      supportsAccountResolution: true,
      accountNumberLength: { min: 10, max: 10 },
      requiresInstitutionAndTransit: false,
    },
  },
  CA: {
    country: "CA",
    currency: "CAD",
    currencyDecimals: 2,
    locale: "en-CA",
    timezone: "America/Toronto",
    tax: { label: "HST" },
    paymentSources: ["Stripe"],
    customerWalletsEnabled: false,
    tippingEnabled: true,
    minimumTip: 5,
    bankAccount: {
      supportsAccountResolution: false,
      accountNumberLength: { min: 7, max: 12 },
      requiresInstitutionAndTransit: true,
    },
  },
};

export interface Market {
  country: Country;
  currency: Currency;
  config: MarketConfig;
  content: MarketContent;
  /** True while the server's config is still loading and FALLBACK is in use. */
  isLoading: boolean;
}

/**
 * The active market for a screen, in order of authority:
 *
 * 1. `override` — pass it inside a dashboard, with the country from the
 *    signed-in user's or store's profile. A merchant's market is a property of
 *    their account, not of the URL they happen to be on.
 * 2. A market prefix in the path — a /ca link is Canadian wherever it is
 *    opened, so it can be shared, indexed and used in a campaign.
 * 3. Nigeria, when the path is an unprefixed market route. /about and
 *    /ca/about are two distinct indexable URLs, so /about stays canonically
 *    Nigerian rather than changing content with the reader's cookie.
 * 4. The request market from the provider — the cookie, then geolocation.
 *    This is what the shared routes use: the booking forms, the store flow and
 *    onboarding all live on one unprefixed URL with no prefix to read.
 */
export function useMarket(override?: Country | null | undefined): Market {
  const pathname = usePathname() ?? "/";
  const requestCountry = useRequestMarket();
  const { data, isLoading } = useMarkets();

  return useMemo(() => {
    const fromPath = marketPrefixCountry(pathname);

    const country = isCountry(override)
      ? override
      : (fromPath ??
        (hasMarketVersion(pathname)
          ? DEFAULT_COUNTRY
          : (requestCountry ?? DEFAULT_COUNTRY)));

    const config = data?.[country] ?? FALLBACK[country] ?? FALLBACK[DEFAULT_COUNTRY];

    return {
      country,
      currency: config.currency ?? currencyFor(country),
      config,
      content: contentFor(country),
      isLoading: isLoading && !data,
    };
  }, [override, pathname, requestCountry, data, isLoading]);
}
