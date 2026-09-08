"use client";

import { useEffect, useState } from "react";
import { MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsCart } from "react-icons/bs";

import { getCartFromStorage } from "@/config/storage";

export const ShopHeader = ({ isLogo = true }: { isLogo: boolean }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(
      getCartFromStorage().reduce((total, item) => total + item.quantity, 0),
    );
  }, []);

  const search = () => {
    const term = query.trim();
    if (!term) return;
    router.push(`/shops/search?search=${encodeURIComponent(term)}`);
  };

  return (
    <header className="flex items-center justify-between max-w-screen-2xl w-full mx-auto p-4 md:px-10  gap-4">
      {/* Logo */}
      {isLogo && (
        <div className="flex-shrink-0 mr-10">
          <Link href={"/"}>
            <img
              src="/logo.png"
              alt="Vinkol Logo"
              className="w-28 h-12 object-contain"
            />
          </Link>
        </div>
      )}
      <div className="w-full border-b-2 px-4 py-2 hidden md:flex gap-x-3 justify-end items-center">
        <div className="relative w-1/2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") search();
            }}
            className="w-full pl-12 pr-4 py-3 rounded-[5px] border bg-[#F4F4F4] border-gray-300 placeholder:text-gray-400 placeholder:text-sm"
            placeholder="Search for a Store"
            aria-label="Search for a store"
          />
        </div>

        {/* Delivery address is collected at checkout, where it can be geocoded
            and priced. This is a prompt for that, not an input. */}
        <div className="border border-[#A5A4A0] flex items-center gap-x-2 px-3 py-2 rounded w-1/2">
          <MapPin size={16} color="#A5A4A0" />
          <p className="font-semibold text-[#A5A4A0] text-sm whitespace-nowrap">
            Enter your delivery address...
          </p>
        </div>

        {/* Cart */}
        <div className="flex items-center justify-center gap-x-2 px-3 py-2 bg-[#F4F4F4] rounded-full">
          <BsCart size={20} />
          <span className="text-sm font-medium">{cartCount}</span>
        </div>
      </div>
    </header>
  );
};
