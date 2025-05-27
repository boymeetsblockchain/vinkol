import type { Metadata } from "next";

import "./globals.css";
import ReactQueryProvider from "@/providers/react-query";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Vinkol",
  description: "Vinkol Logistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
      <Toaster position="top-right" />
    </html>
  );
}
