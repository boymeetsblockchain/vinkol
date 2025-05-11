"use client";
import { ReactNode, useState } from "react";
import { Menu } from "lucide-react";
import { RiderDashBoardSidebBar } from "@/components/rider/sidebar";
import { Profile } from "@/components/rider/profile";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen  flex flex-col md:flex-row">
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar */}
      <RiderDashBoardSidebBar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 w-full ">
        {/* Top Bar with Profile */}
        <div className="flex justify-end items-center px-4 pt-6 ">
          <Profile />
        </div>

        {/* Page Content */}
        <div className="max-w-screen-2xl bg-white mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
