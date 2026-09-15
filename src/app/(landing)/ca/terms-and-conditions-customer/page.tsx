import type { Metadata } from "next";

import { CustomerTermsPage } from "@/components/pages/customer-terms";
import { pageMetadata } from "@/lib/markets/metadata";

export const metadata: Metadata = pageMetadata({
  country: "CA",
  title: "Customer Terms & Conditions",
  description:
    "The terms that apply when you book a delivery with Vinkol in Canada.",
  path: "/terms-and-conditions-customer",
});

export default function Page() {
  return <CustomerTermsPage country="CA" />;
}
