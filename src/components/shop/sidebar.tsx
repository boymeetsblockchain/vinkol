import {
  X,
  Package,
  History,
  ShoppingBasket,
  User,
  Wallet,
  Settings,
  LogOut,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const dashboardLinks = [
  {
    label: "Orders",
    icon: <Package size={18} />,
    route: "/shop/dashboard/",
  },
  // {
  //   label: "Order History",
  //   icon: <History size={18} />,
  //   route: "/shop/dashboard/history",
  // },
  {
    label: "Products",
    icon: <ShoppingBasket size={18} />,
    route: "/shop/dashboard/products",
  },

  {
    label: "Profile",
    icon: <User size={18} />,
    route: "/shop/dashboard/store-profile",
  },
  {
    label: "Wallet",
    icon: <Wallet size={18} />,
    route: "/shop/dashboard/wallet",
  },
];

export const ShopperDashBoardSidebBar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <aside
      className={`fixed top-0 right-0 z-50 w-64 min-h-screen bg-[#FAFAFA] border-l border-gray-200 md:border-l-0 md:border-r transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } md:translate-x-0 md:static md:w-1/5`}
    >
      {/* Close button (mobile only) */}
      <div className="flex justify-between items-center p-4 md:hidden border-b border-gray-200">
        <Link href={"/"}>
          {" "}
          <img src="/logo.png" alt="Vinkol Logo" className="w-28 h-12" />
        </Link>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-gray-100 transition"
        >
          <X size={24} />
        </button>
      </div>

      {/* Desktop logo */}
      <div className="hidden md:flex justify-center p-4 border-b border-gray-200">
        <Link href={"/"}>
          {" "}
          <img src="/logo.png" alt="Vinkol Logo" className="w-28 h-12" />
        </Link>
      </div>

      {/* Dashboard Links */}
      <div className="mt-6 px-4 space-y-2">
        {dashboardLinks.map(({ label, icon, route }) => (
          <Link
            href={route}
            key={route}
            onClick={onClose}
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
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full flex items-center gap-3 font-semibold text-sm md:text-base text-gray-700 hover:text-red-600 hover:bg-red-50 p-3 rounded-md transition mt-2">
              <LogOut size={18} />
              Logout
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md p-6 border-none rounded-2xl shadow-2xl">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <DialogTitle className="text-xl font-bold text-gray-900 mb-2">Sign out of Vinkol?</DialogTitle>
              <DialogDescription className="text-gray-500 text-sm mb-6 max-w-[260px] mx-auto">
                Are you sure you want to sign out? You will need to log back in to manage your store.
              </DialogDescription>
            </div>
            <DialogFooter className="flex gap-3 sm:justify-center">
              <DialogClose asChild>
                <button className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition">
                  Cancel
                </button>
              </DialogClose>
              <button 
                onClick={() => { onClose(); handleLogout(); }}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition"
              >
                Yes, log out
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </aside>
  );
};
