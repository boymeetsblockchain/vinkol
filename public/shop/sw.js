/**
 * The store dashboard's service worker.
 *
 * Served from /shop/sw.js so its own default scope is already /shop/ — no
 * Service-Worker-Allowed header needed on a host we do not control.
 *
 * It caches almost nothing, on purpose. This is a merchant dashboard: an HTTP
 * cache in front of it is a data-leak risk rather than a performance win.
 *
 *  - Cache Storage is origin-scoped, not per-account, and signing out cannot
 *    reliably clear it. A cached /stores/orders or /stores/wallet-balance body
 *    would outlive logout and be readable by the next person to use the
 *    device, with no token involved.
 *  - NEXT_PUBLIC_* values are inlined at build time, so a stale shell pins the
 *    old API base URL and Maps key, and nothing sends an app version the
 *    server could reject.
 *
 * So: precache the offline page only, never touch an API response, and answer
 * a failed navigation with the offline page. Bump CACHE_VERSION on any change
 * here — activate() deletes every other cache, so a bad shell cannot outlive
 * one reload.
 */

const CACHE_VERSION = "vinkol-store-v2";

/**
 * A single self-contained HTML file. It was a Next.js route first, which
 * failed: the cached document's hashed JS chunks were not precached, so with
 * the origin unreachable React could not hydrate and the screen read
 * "Application error" instead of the offline notice. Static HTML with inline
 * styles and an inline SVG has nothing left to fetch.
 */
const OFFLINE_URL = "/shop/offline.html";
const PRECACHE = [OFFLINE_URL];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      // Individually, so one missing asset cannot fail the whole install.
      .then((cache) =>
        Promise.all(
          PRECACHE.map((url) =>
            cache.add(new Request(url, { cache: "reload" })).catch(() => {}),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

/**
 * Lets the page empty Cache Storage on sign-out. The page cannot be trusted to
 * remember to, so logout asks for this explicitly.
 */
self.addEventListener("message", (event) => {
  if (event.data?.type !== "CLEAR_CACHES") return;
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key)))),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Navigations go to the network, and fall back to the offline page only when
  // the network is genuinely unreachable. Never serve a cached HTML document:
  // it would carry one merchant's rendered data to the next.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches
          .match(OFFLINE_URL)
          .then(
            (cached) =>
              cached ??
              new Response("You are offline.", {
                status: 503,
                headers: { "Content-Type": "text/plain" },
              }),
          ),
      ),
    );
    return;
  }

  // Everything else — every API call included — is left entirely to the
  // network. Not calling respondWith is what makes that true: the request
  // never passes through a cache, so no merchant's orders, balance or bank
  // details can be written to disk. The handler still has to exist, because
  // a service worker without one is not installable.
});
