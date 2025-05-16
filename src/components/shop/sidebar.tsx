import {
  X,
  Package,
  History,
  ShoppingBasket,
  User,
  Wallet,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const dashboardLinks = [
  {
    label: "Orders",
    icon: <Package size={18} />,
    route: "/rider/dashboard/orders",
  },
  {
    label: "Order History",
    icon: <History size={18} />,
    route: "/rider/dashboard/history",
  },
  {
    label: "Products",
    icon: <ShoppingBasket size={18} />, // Changed to ShoppingBasket for products
    route: "/rider/dashboard/products",
  },
  {
    label: "Wallet",
    icon: <Wallet size={18} />,
    route: "/rider/dashboard/wallet",
  },
  {
    label: "Profile",
    icon: <User size={18} />, // Changed to User for profile
    route: "/rider/dashboard/profile",
  },
  {
    label: "Settings",
    icon: <Settings size={18} />,
    route: "/rider/dashboard/settings",
  },
];

export const ShopperDashBoardSidebBar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 z-50 w-64 min-h-screen bg-[#FAFAFA] border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:w-1/5`}
    >
      {/* Close button (mobile only) */}
      <div className="flex justify-between items-center p-4 md:hidden border-b border-gray-200">
        <img src="/logo.png" alt="Vinkol Logo" className="w-28 h-12" />
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-gray-100 transition"
        >
          <X size={24} />
        </button>
      </div>

      {/* Desktop logo */}
      <div className="hidden md:flex justify-center p-4 border-b border-gray-200">
        <img src="/logo.png" alt="Vinkol Logo" className="w-28 h-12" />
      </div>

      {/* Dashboard Links */}
      <div className="mt-6 px-4 space-y-2">
        {dashboardLinks.map(({ label, icon, route }) => (
          <Link
            href={route}
            key={route}
            className={`w-full flex items-center gap-3 font-medium text-sm md:text-base p-3 rounded-md transition ${
              pathname === route
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span
              className={pathname === route ? "text-blue-600" : "text-gray-500"}
            >
              {icon}
            </span>
            {label}
          </Link>
        ))}
      </div>
    </aside>
  );
};
