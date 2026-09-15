import type { Metadata } from "next";

import { pageMetadata } from "@/lib/markets/metadata";
import { marketFromRequest } from "@/lib/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    country: await marketFromRequest(),
    title: "Bulk Delivery",
    description:
      "Send ten to a thousand packages in one request. One pickup with many dropoffs, or many independent orders, priced up front.",
    path: "/bulk-delivery",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
