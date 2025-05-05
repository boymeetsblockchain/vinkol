import { X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  "Fresh Produce",
  "Meat, Fish & Protein",
  "Dairy Products",
  "Bakery & Snacks",
  "Dry Foods & Staples",
  "Breakfast & Beverages",
  "Baby & Kids",
  "Personal Care",
  "Household & Cleaning",
  "Home Essentials",
];

export const ShopSideBar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#FAFAFA] transform transition-transform duration-300 ease-in-out ${
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

      <div className="flex items-center justify-center w-full flex-col">
        <img
          src="/assets/shop2.png"
          className="h-24 w-3/4 rounded-[5px] cursor-pointer object-contain hover:opacity-90 transition"
          alt={`Supermarket `}
        />
        <p className="text-sm md:text-base font-medium text-center">
          Bokku Supermarket
        </p>
        <p className="text-xs text-center ">
          Prestigous supermarket around Nigeria making shopping easy
        </p>
      </div>
      <div className="mt-6 px-4 space-y-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className="w-full text-left  font-bold  text-sm md:text-base text-gray-700 "
          >
            {category}
          </button>
        ))}
      </div>
    </aside>
  );
};
