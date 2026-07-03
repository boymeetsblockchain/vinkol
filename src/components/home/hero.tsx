"use client";
import React, { useState, useEffect } from "react";
import { FaGooglePlay, FaStar } from "react-icons/fa6";
import { IoLogoApple } from "react-icons/io";
import { RiMotorbikeFill } from "react-icons/ri";
import { LuPackageCheck } from "react-icons/lu";
import { ArrowRight } from "lucide-react";

import { Button } from "../button";
import { AppStoreCard } from "../shared/appstore";
import Link from "next/link";
import { useTrackOrders } from "@/services/orders/query";

import { TrackingModal } from "../modals/trackingmodal";
import { toast } from "sonner";

export const Hero = () => {
  const [trackDelivery, setTrackDelivery] = useState<boolean>(false);
  const [trackingId, setTrackingId] = useState<string>("");
  const [enabled, setEnabled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isFetching, isSuccess } = useTrackOrders(trackingId, {
    enabled,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setIsModalOpen(true);
      setEnabled(false);
    }
  }, [isSuccess, data]);

  const fetchTrackingdata = () => {
    if (!trackingId) {
      toast.error("Please enter a tracking ID");
      return;
    }
    setEnabled(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTrackingId("");
  };

  return (
    <div
      className="relative text-white bg-cover min-h-[620px] md:min-h-screen
             bg-[url('/assets/mobile.png')] 
             md:bg-[url('/assets/hero.jpg')]"
    >
      {/* Gradient overlay — darker at bottom for text legibility, lighter at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/98 via-black/80 to-black/55" />

      <div className="relative z-10 flex flex-col justify-end min-h-[620px] md:min-h-screen pb-12 md:pb-20 px-6 md:px-20">
        <div className="max-w-2xl space-y-5">

          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-blue-primary" />
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)]">
              Fast · Verified · Insured
            </p>
          </div>

          {/* Headline */}
          <h1 className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.05] tracking-tight">
            Your delivery,<br />
            <span className="text-blue-primary">done right.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg font-medium text-white/80 max-w-lg leading-relaxed">
            Book a verified rider for instant pickup and delivery — or send a
            personal shopper to buy from any store near you.
          </p>

          {/* CTAs */}
          {trackDelivery ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full max-w-xl">
              <div className="flex-grow relative w-full">
                <input
                  type="text"
                  placeholder="Enter your tracking ID..."
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="w-full py-3.5 px-5 pr-28 rounded-full text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-primary text-sm"
                />
                <Button
                  size="lg"
                  onClick={fetchTrackingdata}
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full py-2 px-5 text-sm h-auto"
                >
                  {isFetching ? "..." : "Track"}
                </Button>
              </div>
              <Button
                size="lg"
                variant="secondary"
                className="shrink-0"
                onClick={() => {
                  setTrackDelivery(false);
                  setTrackingId("");
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link href="/book-a-delivery">
                <Button size="lg" className="rounded-full px-8 font-semibold">
                  Book a Delivery
                </Button>
              </Link>
              <button
                onClick={() => setTrackDelivery(true)}
                className="border border-white/40 text-white rounded-full px-8 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Track a Package
              </button>
              <Link
                href="/bulk-delivery"
                className="text-white/70 text-sm font-semibold hover:text-white transition-colors flex items-center gap-2 px-2 py-1"
              >
                Bulk delivery 
                <ArrowRight size={16} className="animate-arrow-bounce text-[var(--color-blue-primary)]" />
              </Link>
            </div>
          )}

          {/* Social proof row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-sm text-white/65 border-t border-white/15 mt-1 pt-4">
            <span className="flex items-center gap-1.5">
              <FaStar className="text-yellow-400" size={14} />
              4.8 App Rating
            </span>
            <span className="w-px h-4 bg-white/20 hidden sm:block" />
            <span className="flex items-center gap-1.5">
              <RiMotorbikeFill className="text-blue-primary" size={15} />
              200+ Verified Riders
            </span>
            <span className="w-px h-4 bg-white/20 hidden sm:block" />
            <span className="flex items-center gap-1.5">
              <LuPackageCheck className="text-blue-primary" size={15} />
              500+ Deliveries Completed
            </span>
          </div>

          {/* App store badges */}
          <div className="flex items-center gap-3 pt-1">
            <AppStoreCard
              platform="Google Play"
              icon={<FaGooglePlay color="black" size={20} />}
              link="https://play.google.com/store/apps/details?id=app.vinkol.user"
            />
            <AppStoreCard
              platform="App Store"
              icon={<IoLogoApple color="black" size={20} />}
              link="https://apps.apple.com/ng/app/vinkol/id6751447117"
            />
          </div>
        </div>
      </div>

      <TrackingModal isOpen={isModalOpen} onClose={closeModal} data={data?.data} />
    </div>
  );
};


