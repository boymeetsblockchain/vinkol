"use client";

import { usePathname, useRouter } from "next/navigation";

import { COUNTRY_NAMES, COUNTRIES, Country } from "@/lib/markets/types";
import { MARKET_COOKIE, swapMarketPath } from "@/lib/markets";
import { useMarket } from "@/lib/markets/useMarket";

/**
 * Lets a visitor change market, and remembers the choice.
 *
 * The cookie is what stops the geo redirect in middleware from bouncing them
 * straight back — without it, a Canadian who wanted the Nigerian site would be
 * returned to /ca on their next navigation.
 */
export const CountrySwitcher = () => {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  // Via useMarket rather than the path, so the highlight agrees with the
  // footer around it on the routes that have no prefix to read.
  const { country: current } = useMarket();

  const choose = (country: Country) => {
    if (country === current) return;
    document.cookie = `${MARKET_COOKIE}=${country}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;

    const target = swapMarketPath(pathname, country);
    if (target !== pathname) router.push(target);

    // A push reuses the cached root layout, so without this the new cookie
    // never reaches the server components that read it — including the
    // provider that tells the rest of the app which market it is in.
    router.refresh();
  };

  return (
    <div
      className="inline-flex items-center rounded-full border border-white/15 p-0.5"
      role="group"
      aria-label="Choose country"
    >
      {COUNTRIES.map((country) => (
        <button
          key={country}
          type="button"
          onClick={() => choose(country)}
          aria-current={country === current}
          className={
            country === current
              ? "rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white"
              : "rounded-full px-3 py-1 text-xs font-medium text-white/40 hover:text-white/70 transition-colors"
          }
        >
          {COUNTRY_NAMES[country]}
        </button>
      ))}
    </div>
  );
};
