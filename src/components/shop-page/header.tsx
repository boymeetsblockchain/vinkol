import { MapPin, Pen, Search } from "lucide-react";
import { BsCart } from "react-icons/bs";

export const ShopHeader = () => {
  return (
    <header className="md:flex hidden  items-center justify-between max-w-screen-2xl w-full mx-auto p-4 md:px-10  gap-4">
      {/* Logo */}
      <div className="flex-shrink-0 mr-10">
        <img
          src="/logo.png"
          alt="Vinkol Logo"
          className="w-28 h-12 object-contain"
        />
      </div>
      <div className="w-full border-b-2  px-4 py-2  flex gap-x-3  justify-end items-center">
        <div className="relative w-1/2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 rounded-[5px] border bg-[#F4F4F4] border-gray-300 placeholder:text-gray-400 placeholder:text-sm"
            placeholder="Search for a Store"
          />
        </div>
        {/* Address */}
        <div className="border border-[#A5A4A0] flex items-center gap-x-2 px-3 py-2 rounded  w-1/2">
          <p className="font-semibold text-[#A5A4A0] text-sm whitespace-nowrap">
            19, Fastima Lekki Phase One, Lagos State
          </p>
          <Pen size={16} color="#A5A4A0" />
        </div>

        {/* Cart */}
        <div className="flex items-center justify-center gap-x-2 px-3 py-2 bg-[#F4F4F4] rounded-full cursor-pointer hover:shadow-sm transition">
          <BsCart size={20} />
          <span className="text-sm font-medium">0</span>
        </div>
      </div>
    </header>
  );
};
