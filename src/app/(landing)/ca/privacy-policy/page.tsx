import type { Metadata } from "next";

import { LegalPendingPage } from "@/components/pages/legal-pending";
import { pageMetadata } from "@/lib/markets/metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    country: "CA",
    title: "Privacy Policy",
    description:
      "Our Canadian privacy policy is being prepared. Contact us for a copy or with any question about how we handle your data.",
    path: "/privacy-policy",
  }),
  // Nothing to index until counsel delivers the content.
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPendingPage country="CA" title="Privacy Policy" />;
}
