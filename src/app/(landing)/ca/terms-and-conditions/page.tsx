import type { Metadata } from "next";

import { LegalPendingPage } from "@/components/pages/legal-pending";
import { pageMetadata } from "@/lib/markets/metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    country: "CA",
    title: "Terms & Conditions",
    description:
      "Our Canadian terms of service are being prepared. Contact us for a copy or with any question about them.",
    path: "/terms-and-conditions",
  }),
  // Nothing to index until counsel delivers the content.
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPendingPage country="CA" title="Terms & Conditions" />;
}
