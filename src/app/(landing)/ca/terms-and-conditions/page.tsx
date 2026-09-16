import type { Metadata } from "next";

import { TermsPage } from "@/components/pages/terms";
import { pageMetadata } from "@/lib/markets/metadata";

export const metadata: Metadata = pageMetadata({
  country: "CA",
  title: "Terms & Conditions",
  description:
    "The terms governing use of Vinkol's delivery platform in Canada.",
  path: "/terms-and-conditions",
});

export default function Page() {
  return <TermsPage country="CA" />;
}
