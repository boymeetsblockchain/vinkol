import type { Metadata } from "next";

import { CanadaTermsPage } from "@/components/pages/ca-terms";
import { pageMetadata } from "@/lib/markets/metadata";

export const metadata: Metadata = pageMetadata({
  country: "CA",
  title: "Terms & Conditions",
  description:
    "Vinkol Group Inc.'s Courier & Last-Mile Delivery Services Agreement for customers and merchants in Canada.",
  path: "/terms-and-conditions",
});

export default function Page() {
  return <CanadaTermsPage />;
}
