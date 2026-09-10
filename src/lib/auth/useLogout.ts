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
export function useLogout() {
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
    router.push("/");
  };
}
