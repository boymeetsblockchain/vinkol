import { X, Package, History, Wallet, FileText, Settings } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const dashboardLinks = [
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

export const RiderDashBoardSidebBar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-50  w-64 min-h-screen bg-[#FAFAFA] transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:w-1/5 md:block px-4`}
    >
      {/* Close button (mobile only) */}
      <div className="flex justify-between items-center p-4 md:hidden">
        <img src="/logo.png" alt="Vinkol Logo" className="w-28 h-12" />
        <button onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      {/* Desktop logo */}
      <div className="hidden md:flex justify-center p-4">
        <img src="/logo.png" alt="Vinkol Logo" className="w-28 h-12" />
      </div>

      {/* Dashboard Links */}
      <div className="mt-6 px-4 space-y-4">
        {dashboardLinks.map(({ label, icon, route }, index) => (
          <Link
            href={`${route}`}
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
