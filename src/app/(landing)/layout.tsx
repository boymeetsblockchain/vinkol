import React, { ReactNode } from "react";
import { Navbar } from "@/components/root/__navbar";
import { Footer } from "@/components/root/__footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
