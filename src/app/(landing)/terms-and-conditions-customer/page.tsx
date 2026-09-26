import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { CustomerTermsPage } from "@/components/pages/customer-terms";
import { pageMetadata } from "@/lib/markets/metadata";
import { marketFromRequest } from "@/lib/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    country: await marketFromRequest(),
    title: "Customer Terms & Conditions",
    description:
      "The terms that apply when you book a delivery with Vinkol.",
    path: "/terms-and-conditions-customer",
  });
}

export default async function Page() {
  const country = await marketFromRequest();

  // Canada's single agreement covers customers too, so there is no separate
  // customer document to serve.
  if (country === "CA") redirect("/ca/terms-and-conditions");

  return <CustomerTermsPage country={country} />;
}
