"use client";
import { ShopHeader } from "@/components/shop-page/header";
import { ShopSideBar } from "@/components/shop-page/sidebar";
import { ReactNode, useState } from "react";
import { Menu } from "lucide-react";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="h-screen">
      {/* Mobile hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar */}
      <ShopSideBar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main layout */}
      <div className="md:ml-[25%]">
        <div className="max-w-screen-2xl  mx-auto w-full px-4 md:px-10 gap-6 mt-6">
          <main className="w-full h-full">{children}</main>
        </div>
      </div>
    </main>
  );
};

export default Layout;
