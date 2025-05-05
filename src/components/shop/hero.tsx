"use client";
import { MapPin } from "lucide-react";
import { Button } from "../button";
import { useRouter } from "next/navigation";
export const ShopHero = () => {
  const router = useRouter();
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

          <div className="flex items-center space-x-3">
            <div className="relative w-full max-w-md">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 placeholder:text-gray-400 text-base"
                placeholder="Enter delivery address"
              />
            </div>
            <Button
              className="rounded-full px-6 py-3"
              onClick={() => router.push("/shops")}
            >
              Search
            </Button>
          </div>
          <p className="text-sm  cursor-pointer">
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
