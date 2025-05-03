import type { Metadata } from "next";

import "./globals.css";
import { Navbar } from "@/components/root/__navbar";

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
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
