import type { Metadata } from "next";

import { HomePage } from "@/components/pages/home";
import { homeMetadata } from "@/lib/markets/metadata";

export const metadata: Metadata = homeMetadata("NG");

export default function Page() {
  return <HomePage country="NG" />;
}
