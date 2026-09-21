"use client";

import { useEffect } from "react";

/**
 * Registers the store dashboard's service worker.
 *
 * The script lives at /shop/sw.js so its default scope is /shop/ — registering
 * a root-served worker with an explicit narrower scope needs a
 * Service-Worker-Allowed response header, which we cannot set on static files.
 *
 * Skipped in development: a worker installed by `next dev` outlives the dev
 * server and then serves a stale shell against a later build, which is a
 * confusing way to lose an afternoon.
 */
export const ServiceWorker = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker
        .register("/shop/sw.js", { scope: "/shop/" })
        .catch(() => {
          // Nothing to do: the dashboard works without it, it just stops being
          // installable.
        });
    };

    // After load, so registration never competes with the first paint.
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });

    return () => window.removeEventListener("load", register);
  }, []);

  return null;
};
