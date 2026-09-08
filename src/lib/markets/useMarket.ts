"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { useMarkets } from "@/services/markets/query";
import { MarketContent } from "./content";
import { contentFor, currencyFor, marketFromPath } from "./index";
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
    paymentSources: ["Paystack", "Globus", "Wallet"],
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
 * The active market for a screen.
 *
 * Pass `override` inside a dashboard, with the country from the signed-in
 * user's or store's profile — a merchant's market is a property of their
 * account, not of the URL they happen to be on. On public pages pass nothing
 * and the path decides, so a /ca link shows Canadian content wherever it is
 * opened and can be shared and indexed.
 */
export function useMarket(override?: Country | null | undefined): Market {
  const pathname = usePathname() ?? "/";
  const { data, isLoading } = useMarkets();

  return useMemo(() => {
    const country = isCountry(override)
      ? override
      : marketFromPath(pathname);

    const config = data?.[country] ?? FALLBACK[country] ?? FALLBACK[DEFAULT_COUNTRY];

    return {
      country,
      currency: config.currency ?? currencyFor(country),
      config,
      content: contentFor(country),
      isLoading: isLoading && !data,
    };
  }, [override, pathname, data, isLoading]);
}
