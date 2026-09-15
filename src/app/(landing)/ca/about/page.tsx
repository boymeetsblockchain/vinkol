import type { Metadata } from "next";

import { AboutPage } from "@/components/pages/about";
import { pageMetadata } from "@/lib/markets/metadata";

export const metadata: Metadata = pageMetadata({
  country: "CA",
  title: "About Vinkol",
  description:
    "Nigerian-founded and incorporated in 2012, Vinkol builds on-demand delivery rooted in technology, accountability and genuine care for every customer.",
  path: "/about",
});

export default function Page() {
  return <AboutPage country="CA" />;
}
