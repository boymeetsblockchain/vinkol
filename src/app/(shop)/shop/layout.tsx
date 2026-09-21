import type { Metadata, Viewport } from "next";

import { InstallApp } from "@/components/shop/install-app";
import { ServiceWorker } from "@/components/shop/sw-register";

/**
 * The store owner's segment, and the only place the PWA can be declared.
 *
 * Every page under /shop is a client component — including
 * shop/dashboard/layout.tsx — and a client component cannot export `metadata`.
 * There was no server layout anywhere under (shop), so this file exists to
 * carry the manifest link, and it covers login, onboarding and the dashboard
 * in one place.
 *
 * Scoped here rather than in the root layout deliberately: the manifest's own
 * `scope` is /shop/, so advertising it site-wide would invite a customer to
 * install a merchant app.
 *
 * Note /shop itself — store signup — sits outside that scope, because scope is
 * a string prefix and "/shop" would also match the customer tree at /shops.
 * Installing happens from the dashboard, so the trade costs nothing.
 */

export const metadata: Metadata = {
  manifest: "/shop/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Vinkol Store",
    statusBarStyle: "default",
  },
  icons: {
    apple: "/shop/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  // Colours the standalone window's status bar. The app had no viewport export
  // and no themeColor anywhere before this.
  themeColor: "#0e74d8",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceWorker />
      {children}
      <InstallApp />
    </>
  );
}
