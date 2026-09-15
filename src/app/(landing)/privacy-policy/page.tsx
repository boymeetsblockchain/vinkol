import type { Metadata } from "next";

import { pageMetadata } from "@/lib/markets/metadata";
import { marketFromRequest } from "@/lib/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    country: await marketFromRequest(),
    title: "Privacy Policy",
    description:
      "How Vinkol collects, uses and protects personal information, and the rights you have over your data.",
    path: "/privacy-policy",
  });
}

import { PrivacyPolicyPage } from "@/components/pages/privacy-policy";

export default async function Page() {
  return <PrivacyPolicyPage country={await marketFromRequest()} />;
}
