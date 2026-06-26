"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import { Button } from "../button";
import { useTrackOrders } from "@/services/orders/query";
import { TrackingModal } from "../modals/trackingmodal";
import { toast } from "sonner";

export const Hero = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const { data, isSuccess } = useTrackOrders(trackingId, { enabled });

  useEffect(() => {
    if (isSuccess && data) {
      setIsModalOpen(true);
      setEnabled(false);
    }
  }, [isSuccess, data]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (from.trim()) params.set("from", from.trim());
    if (to.trim()) params.set("to", to.trim());
    router.push(`/book-a-delivery${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      toast.error("Please enter a tracking ID");
      return;
    }
    setEnabled(true);
  };

  return (
    <div
      className="relative text-white bg-cover h-[620px] md:h-screen
                 bg-[url('/assets/mobile.png')]
                 md:bg-[url('/assets/hero.jpg')]"
    >
      {/* Gradient: strong left, fades right on desktop; top-to-bottom on mobile */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 md:bg-none" />
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      <div className="absolute inset-0 flex items-end md:items-center">
        <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-20 pb-10 md:pb-0">
          <div className="max-w-xl">

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8 space-y-3"
            >
              <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl leading-tight">
                Fast. Verified.
                <br />
                Delivered.
              </h1>
              <p className="text-base sm:text-lg font-medium text-white/85 max-w-sm">
                On-demand logistics for every Nigerian — individuals, businesses, and stores.
              </p>
            </motion.div>

            {/* Booking Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <form
                onSubmit={handleBooking}
                className="bg-white rounded-2xl p-4 shadow-2xl space-y-3 max-w-md"
                aria-label="Book a delivery"
              >
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-primary pointer-events-none"
                    size={17}
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    placeholder="Pickup location"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    aria-label="Pickup location"
                    className="w-full pl-9 pr-4 py-3 text-sm text-gray-800 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-primary placeholder-gray-400 transition"
                  />
                </div>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={17}
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    placeholder="Dropoff location"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    aria-label="Dropoff location"
                    className="w-full pl-9 pr-4 py-3 text-sm text-gray-800 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-primary placeholder-gray-400 transition"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  aria-label="Get a delivery quote"
                >
                  Get a Quote →
                </Button>
              </form>

              {/* Tracking row */}
              <form
                onSubmit={handleTrack}
                className="mt-4 flex items-center gap-2 max-w-md"
                aria-label="Track a delivery"
              >
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none"
                    size={15}
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    placeholder="Enter tracking ID"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    aria-label="Tracking ID"
                    className="w-full pl-9 pr-4 py-2.5 text-sm text-white bg-white/10 border border-white/30 rounded-full placeholder-white/60 focus:outline-none focus:border-white/60 backdrop-blur-sm transition"
                  />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  variant="secondary"
                  className="rounded-full shrink-0"
                  aria-label="Track delivery"
                >
                  Track
                </Button>
              </form>
            </motion.div>

            {/* Utility links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease: "easeOut" }}
              className="mt-5 flex items-center gap-4 text-sm text-white/65"
            >
              <Link
                href="/bulk-delivery"
                className="hover:text-white transition-colors underline underline-offset-2"
              >
                Need bulk delivery?
              </Link>
              <span aria-hidden="true">·</span>
              <Link
                href="/explore-shop"
                className="hover:text-white transition-colors underline underline-offset-2"
              >
                Shop from stores →
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <TrackingModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTrackingId("");
        }}
        data={data?.data}
      />
    </div>
  );
};
