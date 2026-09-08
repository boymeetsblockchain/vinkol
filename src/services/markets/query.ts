import { useQuery } from "@tanstack/react-query";

import { getMarkets } from "./api";

/**
 * Market config changes only on deploy, so it is cached for the session rather
 * than refetched per screen.
 */
export const useMarkets = () =>
  useQuery({
    queryKey: ["markets"],
    queryFn: getMarkets,
    staleTime: Infinity,
    gcTime: Infinity,
  });
