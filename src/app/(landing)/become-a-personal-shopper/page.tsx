import type { Metadata } from "next";

import { BecomeAPersonalShopperPage } from "@/components/pages/become-a-personal-shopper";
import { pageMetadata } from "@/lib/markets/metadata";

export const metadata: Metadata = pageMetadata({
  country: "NG",
  title: "Become a Personal Shopper",
  description:
    "Earn with Vinkol without owning a vehicle. Shop for customers, set your own hours, and withdraw your earnings whenever you choose.",
  path: "/become-a-personal-shopper",
});

export default function Page() {
  return <BecomeAPersonalShopperPage country="NG" />;
}
