import type { Metadata } from "next";

import "./globals.css";
import ReactQueryProvider from "@/providers/react-query";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Vinkol",
  description: "Vinkol Logistics",
  verification: {
    google: "gE62S8YMos99yfz3krkRnWgaiaEZfofw3IDnIr5VMrs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
