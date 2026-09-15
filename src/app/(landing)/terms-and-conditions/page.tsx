import type { Metadata } from "next";

import { pageMetadata } from "@/lib/markets/metadata";
import { marketFromRequest } from "@/lib/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    country: await marketFromRequest(),
    title: "Vendor Terms & Conditions",
    description:
      "The terms governing stores and vendors operating on the Vinkol platform.",
    path: "/terms-and-conditions",
  });
}

import { TermsPage } from "@/components/pages/terms";

export default async function Page() {
  return <TermsPage country={await marketFromRequest()} />;
}
