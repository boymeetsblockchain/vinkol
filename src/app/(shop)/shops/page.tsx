import type { Metadata } from "next";

import { ShopHeader } from "@/components/shop-page/header";
import { SuperMarket } from "@/components/shop-page/super-market";
import { contentFor } from "@/lib/markets";
import { pageMetadata } from "@/lib/markets/metadata";
import { marketFromRequest } from "@/lib/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const country = await marketFromRequest();

  return pageMetadata({
    country,
    title: "Stores",
    description: `Shop from verified stores across ${contentFor(country).serviceAreaPhrase} and have your order delivered the same day.`,
    path: "/shops",
  });
}

export default async function ShopsPage() {
  const country = await marketFromRequest();

  return (
    <section>
      <ShopHeader isLogo={true} />
      <SuperMarket country={country} />
    </section>
  );
}
