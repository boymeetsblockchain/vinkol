"use client";

import { createContext, useContext } from "react";

import { Country } from "./types";

/**
 * The market this request belongs to — the cookie the switcher and middleware
 * write, or the geo header — seeded from the server in the root layout.
 *
 * Only seven public routes carry a /ca prefix, so on every dashboard,
 * onboarding, booking and store-flow route there is no prefix to read the
 * market from. Without this the client fell back to Nigeria on all of them:
 * Places restricted to "ng" so a Canadian address could not be typed, naira
 * prices, and the 37 Nigerian states in place of provinces.
 *
 * Stateless on purpose. The server's cookie read stays the single source of
 * truth, with no client copy that can drift from it.
 */
const RequestMarketContext = createContext<Country | null>(null);

export const MarketProvider = ({
  country,
  children,
}: {
  country: Country;
  children: React.ReactNode;
}) => (
  <RequestMarketContext.Provider value={country}>
    {children}
  </RequestMarketContext.Provider>
);

/** Null outside the provider, so useMarket still falls through to the path. */
export const useRequestMarket = () => useContext(RequestMarketContext);
