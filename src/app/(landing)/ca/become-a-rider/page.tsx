import type { Metadata } from "next";

import { BecomeARiderPage } from "@/components/pages/become-a-rider";
import { pageMetadata } from "@/lib/markets/metadata";

export const metadata: Metadata = pageMetadata({
  country: "CA",
  title: "Become a Rider",
  description:
    "Ride with Vinkol on your own hours. Verified riders, jobs near you, earnings credited per delivery and withdrawal whenever you want it.",
  path: "/become-a-rider",
});

export default function Page() {
  return <BecomeARiderPage country="CA" />;
}
