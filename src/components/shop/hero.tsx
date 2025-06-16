"use client";
import { MapPin } from "lucide-react";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { useGetAllStores } from "@/services/shops/query";
import { useState } from "react"; // Import useState

export const ShopHero = () => {
  const [selectedState, setSelectedState] = useState<string>(""); // State to hold the selected state value

  // Pass the selectedState to useGetAllStores.
  // The hook will re-fetch stores whenever selectedState changes.
  const { data, isLoading } = useGetAllStores({ state: selectedState });
  const router = useRouter();

  console.log("Filtered stores data:", data);

  const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "Federal Capital Territory (Abuja)",
  ];

  const handleSearch = () => {
    // router.push(`/shops?state=${selectedState}`);
  };

  return (
    <section className="max-w-screen-2xl bg-[#FAFAFA] w-full px-4 py-10 md:px-20 md:py-20 mx-auto h-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Section */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Shop from the comfort of your home
          </h1>
          <p className="text-lg text-gray-700">
            Receive delivery and earn on every trip with Vinkol, linking you
            with users that need your service.
          </p>

          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3">
            <div className="relative w-full max-w-md">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 placeholder:text-gray-400 text-base"
                placeholder="Enter delivery address"
              />
            </div>

            <select
              className="w-full md:w-auto py-3 px-4 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              disabled={isLoading}
              required
            >
              <option value="">Select your state</option>
              {nigerianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <Button
              className="rounded-full px-6 py-3 w-full md:w-auto"
              onClick={handleSearch}
              disabled={isLoading}
            >
              Search
            </Button>
          </div>
          <p className="text-sm cursor-pointer">
            Don’t see your address? Add manually
          </p>
        </div>

        {/* Right Section (Image) */}
        <div>
          <img
            src="/assets/shop.png"
            alt="Shop Illustration"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};
