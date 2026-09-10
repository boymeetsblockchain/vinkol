"use client";

import { useEffect, useState } from "react";

/**
 * Whether this browser is holding an access token.
 *
 * Deliberately not a claim about whether the token is *valid* — only the server
 * decides that. It is enough to answer "could this person have a wallet", which
 * is the question the payment options need and which nothing on the client
 * could previously answer at all.
 *
 * Read after mount because localStorage does not exist while rendering on the
 * server, and assuming "signed in" would flash an option a guest cannot use.
 */
export function useIsSignedIn(): boolean {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    try {
      setSignedIn(!!localStorage.getItem("accessToken"));
    } catch {
      setSignedIn(false);
    }
  }, []);

  return signedIn;
}
