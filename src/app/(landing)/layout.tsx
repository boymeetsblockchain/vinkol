import React, { ReactNode } from "react";
import { Navbar } from "@/components/root/__navbar";
import { Footer } from "@/components/root/__footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* Skip to content — visible on keyboard focus only */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-primary focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>
      <div>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
