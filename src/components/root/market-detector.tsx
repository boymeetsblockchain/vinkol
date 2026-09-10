"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  MARKET_COOKIE,
  MARKET_PREFIX,
  hasMarketVersion,
  marketPath,
  marketPrefixCountry,
} from "@/lib/markets";
import { detectCountry } from "@/lib/markets/timezone";

/**
 * The market fallback for hosts that send no geo header.
 *
 * The middleware runs on the server and cannot see a browser timezone, so on a
 * plain Node host — or in local development, where no host sets a geo header —
 * every Canadian visitor silently got the Nigerian site, and the onboarding
 * country step had no cookie to prefill from.
 *
 * Deliberately the same rules as the middleware rather than new ones: it does
 * nothing once a cookie exists, nothing on a path that already names a market,
 * and it only redirects where that path has a version in the other market.
 * Everything else just remembers the guess, so the server picks it up next
 * time without a second detection.
 */
export const MarketDetector = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // A remembered choice — the middleware's, or the footer switcher's — wins.
    if (document.cookie.includes(`${MARKET_COOKIE}=`)) return;

    // The path is already explicit about its market.
    if (marketPrefixCountry(pathname)) return;

    let timezone: string | undefined;
    try {
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      // Nothing to go on.
    }

    const country = detectCountry(timezone, navigator.language);
    if (!country) return;

    document.cookie = `${MARKET_COOKIE}=${country}; path=/; max-age=${
      60 * 60 * 24 * 365
    }; samesite=lax`;

    if (MARKET_PREFIX[country] && hasMarketVersion(pathname)) {
      router.replace(marketPath(pathname, country));
      return;
    }

    // Server components read the cookie, so they need to run again.
    router.refresh();
  }, [pathname, router]);

  return null;
};
