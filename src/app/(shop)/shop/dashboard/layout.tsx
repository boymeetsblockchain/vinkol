"use client";
import { ShopHeader } from "@/components/shop-page/header";
import { ShopSideBar } from "@/components/shop-page/sidebar";
import { ReactNode, useState } from "react";
import { Menu } from "lucide-react";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Mobile hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar - hidden on mobile unless opened */}
      <ShopSideBar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header would go here if you have one */}
        {/* <ShopHeader /> */}

        {/* Scrollable content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
