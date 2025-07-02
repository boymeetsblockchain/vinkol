"use client";
import { ReactNode, useState } from "react";
import { Menu } from "lucide-react";
import { RiderDashBoardSidebBar } from "@/components/rider/sidebar";
import { Profile } from "@/components/rider/profile";
import { useUserProfile } from "@/services/rider/query";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data } = useUserProfile();

  if (!data?.data?.isKYCVerified) {
    return (
      <section className="max-w-screen-2xl min-h-screen w-full px-4 md:px-20 py-10 mx-auto">
        {/* Logo */}

        {/* Content */}
        <div className="flex flex-col items-center justify-center w-full h-full text-center gap-2">
          {/* Image */}
          <div className="w-40 h-40 md:w-1/3 md:h-1/3">
            <img
              src="/assets/document.png"
              alt="Check Icon"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Headings */}
          <h1 className="text-2xl md:text-3xl font-bold ">
            {data?.data?.kyc?.status == "rejected"
              ? "Documents Rejected"
              : "Documents Under Review"}
          </h1>

          <p className="text-sm md:text-base text-gray-700 max-w-md">
            {data?.data?.kyc?.status == "rejected"
              ? `Your documents have been rejected for the reason ${
                  data?.data?.kyc?.remark || ""
                }. Please re-upload your documents.`
              : "Your documents are being reviewed. You'll be ready to take orders in less than 20 minutes if everything checks out."}
          </p>

          <Button asChild>
            <Link href={"/rider/complete"}>Reupload Documents</Link>
          </Button>
        </div>
      </section>
    );
  }
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
