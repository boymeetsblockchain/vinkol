import type { Metadata } from "next";

import { ContactPage } from "@/components/pages/contact";
import { pageMetadata } from "@/lib/markets/metadata";

export const metadata: Metadata = pageMetadata({
  country: "CA",
  title: "Contact Us",
  description:
    "Questions about a delivery, a store account or riding with us? Reach the Vinkol team by email, phone or the contact form.",
  path: "/contact",
});

export default function Page() {
  return <ContactPage country="CA" />;
}
