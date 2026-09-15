import type { Metadata } from "next";

import { pageMetadata } from "@/lib/markets/metadata";
import { marketFromRequest } from "@/lib/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    country: await marketFromRequest(),
    title: "Customer Terms & Conditions",
    description:
      "The terms governing your use of Vinkol as a customer, including bookings, payments and cancellations.",
    path: "/terms-and-conditions-customer",
  });
}

import { CustomerTermsPage } from "@/components/pages/customer-terms";

export default async function Page() {
  return <CustomerTermsPage country={await marketFromRequest()} />;
}
