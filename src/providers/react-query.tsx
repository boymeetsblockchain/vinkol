"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { ApiError } from "@/lib/interfaces/error";

/**
 * `networkMode: "always"` is the load-bearing setting here.
 *
 * By default React Query decides for itself whether the browser is online and
 * *pauses* fetches and retries when it thinks it is not. Its onlineManager can
 * latch offline and never recover — observed in this app with
 * `navigator.onLine === true`, so nothing tells it otherwise. A failing query
 * then sits at `status: "pending", fetchStatus: "paused"` forever: the first
 * attempt fails, the retry is paused, and the error never surfaces.
 *
 * That is why an unauthenticated rider or shopper sat on a dashboard that
 * never redirected — `isLoading` is false while paused, so the layout fell
 * through with no profile and no error to react to. It is also why the
 * payment-verification retry appeared never to fire.
 *
 * "always" means: just make the request, and fail loudly if it cannot be made.
 */
const retry = (failureCount: number, error: unknown) => {
  const status = (error as ApiError)?.status;
  // Nothing about a 4xx improves by asking again, and retrying an expired
  // session three times only delays the redirect.
  if (status && status < 500) return false;
  return failureCount < 2;
};

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { networkMode: "always", retry },
          mutations: { networkMode: "always" },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
