"use client";
import { useUserProfile } from "@/services/rider/query";
import { X, Package, History, Wallet, FileText, Settings } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const unVerifiedDashboardLinks = [
  { label: "Orders", icon: <Package size={18} />, route: "/rider/dashboard" },
  {
    label: "Order History",
    icon: <History size={18} />,
    route: "/rider/dashboard/history",
  },
  {
    label: "Documents",
    icon: <FileText size={18} />,
    route: "/rider/dashboard/documents",
  },
  {
    label: "Settings",
    icon: <Settings size={18} />,
    route: "/rider/dashboard/settings",
  },
];

const verifiedDashboardLinks = [
  { label: "Orders", icon: <Package size={18} />, route: "/rider/dashboard" },
  {
    label: "Order History",
    icon: <History size={18} />,
    route: "/rider/dashboard/history",
  },
  {
    label: "Wallet",
    icon: <Wallet size={18} />,
    route: "/rider/dashboard/wallet",
  },

  {
    label: "Settings",
    icon: <Settings size={18} />,
    route: "/rider/dashboard/settings",
  },
];

export const ShopperDashBoardSidebBar = ({ isOpen, onClose }: SidebarProps) => {
  const { data, isLoading } = useUserProfile();

  // Determine which links to show based on verification status
  const dashboardLinks = data?.data?.isKYCVerified
    ? verifiedDashboardLinks
    : unVerifiedDashboardLinks;

  if (isLoading) {
    return (
      <aside className="fixed top-0 left-0 z-50 w-64 min-h-screen bg-[#FAFAFA] px-4">
        <div className="p-4 flex justify-center">
          <div className="animate-pulse bg-gray-200 w-28 h-12"></div>
        </div>
        <div className="mt-6 px-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="animate-pulse bg-gray-200 w-6 h-6 rounded"></div>
              <div className="animate-pulse bg-gray-200 w-24 h-4 rounded"></div>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={`fixed top-0 left-0 z-50 w-64 min-h-screen bg-[#FAFAFA] transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:w-1/5 md:block px-4`}
    >
      {/* Close button (mobile only) */}
      <div className="flex justify-between items-center p-4 md:hidden">
        <Link href={"/"}>
          <img src="/logo.png" alt="Vinkol Logo" className="w-28 h-12" />
        </Link>
        <button onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      {/* Desktop logo */}
      <div className="hidden md:flex justify-center p-4">
        <Link href={"/"}>
          <img src="/logo.png" alt="Vinkol Logo" className="w-28 h-12" />
        </Link>
      </div>

      {/* Dashboard Links */}
      <div className="mt-6 px-4 space-y-4">
        {dashboardLinks.map(({ label, icon, route }, index) => (
          <Link
            href={route}
            key={index}
            className="w-full flex items-center gap-3 font-semibold text-sm md:text-base text-gray-700 hover:text-blue-primary transition"
          >
            {icon}
            {label}
          </Link>
        ))}
      </div>
    </aside>
  );
};
