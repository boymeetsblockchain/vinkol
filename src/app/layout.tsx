import type { Metadata } from "next";

import "./globals.css";
import ReactQueryProvider from "@/providers/react-query";
import { metadataBase } from "@/lib/markets/metadata";
import { marketFromRequest } from "@/lib/markets/server";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  // Per-page titles come from lib/markets/metadata. This is only the fallback
  // for any route that has not declared its own yet.
  title: "Vinkol",
  description: "Think Vinkol, feel delivery valour.",
  metadataBase,
  verification: {
    google: "gE62S8YMos99yfz3krkRnWgaiaEZfofw3IDnIr5VMrs",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const country = await marketFromRequest();

  return (
    <html
      lang={country === "CA" ? "en-CA" : "en-NG"}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
