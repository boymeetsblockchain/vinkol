import type { Metadata } from "next";

import { CanadaTermsPage } from "@/components/pages/ca-terms";
import { TermsPage } from "@/components/pages/terms";
import { pageMetadata } from "@/lib/markets/metadata";
import { marketFromRequest } from "@/lib/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    country: await marketFromRequest(),
    title: "Terms & Conditions",
    description:
      "The terms governing use of Vinkol's delivery platform.",
    path: "/terms-and-conditions",
  });
}

export default async function Page() {
  const country = await marketFromRequest();

  // Two genuinely different documents, not one translated. Canada has its own
  // agreement from counsel; Nigeria keeps the one it has always had.
  return country === "CA" ? <CanadaTermsPage /> : <TermsPage country={country} />;
}
