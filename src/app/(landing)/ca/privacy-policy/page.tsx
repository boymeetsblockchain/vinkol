import type { Metadata } from "next";

import { PrivacyPolicyPage } from "@/components/pages/privacy-policy";
import { pageMetadata } from "@/lib/markets/metadata";

export const metadata: Metadata = pageMetadata({
  country: "CA",
  title: "Privacy Policy",
  description:
    "How Vinkol collects, uses and protects personal information, and the rights you have over your data.",
  path: "/privacy-policy",
});

export default function Page() {
  return <PrivacyPolicyPage country="CA" />;
}
