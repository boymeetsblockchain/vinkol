import type { Metadata } from "next";

import { CTA } from "@/components/home/cta";
import { Deliver } from "@/components/home/deliver";
import { Navbar } from "@/components/root/__navbar";
import { ShopHero } from "@/components/shop/hero";
import { ShopList } from "@/components/shop/shop-list";
import { contentFor } from "@/lib/markets";
import { pageMetadata } from "@/lib/markets/metadata";
import { marketFromRequest } from "@/lib/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const country = await marketFromRequest();

  return pageMetadata({
    country,
    title: "Explore Stores",
    description: `Browse verified stores across ${contentFor(country).serviceAreaPhrase}, add what you need to your basket, and have it delivered the same day.`,
    path: "/explore-shop",
  });
}

/**
 * One route for both markets, scoped by the visitor rather than the path: a
 * store directory is about what is orderable where you are, and the server
 * filters cross-market stores out of the listing entirely.
 */
export default async function ShopperPage() {
  const country = await marketFromRequest();

  return (
    <section>
      <Navbar shop={true} />
      <ShopHero country={country} />
      <ShopList country={country} />
      <CTA country={country} />
      <Deliver />
    </section>
  );
}
