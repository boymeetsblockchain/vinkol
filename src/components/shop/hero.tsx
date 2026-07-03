"use client";
import { MapPin, Search, ShoppingBag, Star, Store, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Autocomplete from "react-google-autocomplete";

const nigerianStates = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa",
  "Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger",
  "Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe",
  "Zamfara","Federal Capital Territory (Abuja)",
];

export const ShopHero = () => {
  const [selectedState, setSelectedState] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/shops/search?state=${selectedState}&q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section
      className="relative text-white bg-cover bg-center min-h-[580px] flex items-end"
      style={{ backgroundImage: "url('/assets/shop.png')" }}
    >
      {/* Strong dark overlay so text is always readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/75" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20 pb-16 pt-32">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-[var(--color-blue-primary)]" />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)]">
            Explore Stores
          </p>
        </div>

        {/* Headline */}
        <h1 className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-3xl mb-5">
          Shop from stores{" "}
          <span className="text-[var(--color-blue-primary)]">
            near you.
          </span>
        </h1>

        <p className="text-white/70 text-base md:text-lg max-w-xl mb-12 leading-relaxed">
          Browse hundreds of verified stores and get your order delivered same day anywhere in Nigeria.
        </p>

        {/* Search card */}
        <div className="bg-white rounded-2xl p-3 flex flex-col sm:flex-row gap-2 max-w-2xl shadow-xl shadow-black/40">
          {/* Address input */}
          <div className="relative flex-1">
            <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
            <Autocomplete
              apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY}
              onPlaceSelected={(place) =>
                setSearchQuery(place.formatted_address || place.name || "")
              }
              options={{
                types: ["geocode", "establishment"],
                componentRestrictions: { country: "ng" },
                fields: ["formatted_address", "name", "geometry.location"],
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
              placeholder="Enter delivery address"
              className="w-full pl-9 pr-3 py-3 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)]/30"
            />
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px bg-gray-200 my-1" />

          {/* State select */}
          <div className="relative">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full sm:w-40 pl-3 pr-8 py-3 rounded-xl bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)]/30 appearance-none"
            >
              <option value="">All states</option>
              {nigerianStates.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            disabled={!selectedState && !searchQuery}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-blue-primary)] text-white font-semibold text-sm hover:opacity-90 disabled:opacity-40 transition whitespace-nowrap"
          >
            <Search size={14} /> Find Stores
          </button>
        </div>

        {/* Social proof */}
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-10 text-sm text-white/50">
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
              <Store size={13} className="text-[var(--color-blue-primary)]" />
            </span>
            100+ Verified Stores
          </span>
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
              <ShoppingBag size={13} className="text-[var(--color-blue-primary)]" />
            </span>
            Same-day Delivery
          </span>
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
              <Star size={13} className="text-yellow-400" />
            </span>
            4.8 Average Rating
          </span>
        </div>
      </div>
    </section>
  );
};
