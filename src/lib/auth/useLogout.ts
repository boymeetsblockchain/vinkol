"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

/**
 * Signing out, in one place.
 *
 * There were three implementations. Two cleared localStorage and pushed home;
 * the shopper's was a plain link to "/" that cleared nothing at all, so the
 * token survived and the user was still signed in.
 *
 * None of them emptied the React Query cache, so the previous account's
 * profile, orders and wallet stayed in memory — the next sign-in on the same
 * browser could render them before its own requests came back.
 */
export function useLogout(redirectTo = "/") {
  const router = useRouter();
  const queryClient = useQueryClient();

  return () => {
    try {
      // Kept as a full clear, which is the existing behaviour.
      localStorage.clear();
    } catch {
      // Nothing to clear.
    }
    queryClient.clear();

    // Cache Storage is origin-scoped rather than per-account, so whatever the
    // store dashboard's service worker holds would otherwise outlive this
    // session and belong to whoever signs in next. The worker owns its caches,
    // so it is asked to empty them.
    navigator.serviceWorker?.controller?.postMessage({ type: "CLEAR_CACHES" });

    // Defaults to the landing page, which is where the rider and shopper
    // sidebars have always gone. The store dashboard passes its own login
    // path: "/" is outside the installed app's scope, so logging out of it
    // would drop the owner into a browser tab.
    router.push(redirectTo);
  };
}
