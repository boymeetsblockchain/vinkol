"use client";
import React, { useState, useEffect } from "react"; // Import useEffect
import { FaGooglePlay } from "react-icons/fa6";
import { IoLogoApple } from "react-icons/io";

import { Button } from "../button";
import { AppStoreCard } from "../shared/appstore";
import Link from "next/link";
import { useGetOrders, useTrackOrders } from "@/services/orders/query";

import { TrackingModal } from "../modals/trackingmodal";
import { toast } from "sonner";

export const Hero = () => {
  const [trackDelivery, setTrackDelivery] = useState<boolean>(false);
  const [trackingId, setTrackingId] = useState<string>("");
  const [enabled, setEnabled] = useState<boolean>(false); // Corrected typo
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // New state for modal

  const { data, isPending, isSuccess } = useTrackOrders(trackingId, {
    enabled,
  });

  // Effect to open modal when data is successfully fetched
  useEffect(() => {
    if (isSuccess && data) {
      setIsModalOpen(true);
      setEnabled(false); // Reset enabled to false after successful fetch to prevent re-fetching on subsequent renders
    }
  }, [isSuccess, data]);

  const fetchTrackingdata = () => {
    if (!trackingId) {
      toast.error("Please Input trackingId");
      return;
    }

    setEnabled(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTrackingId(""); // Clear tracking ID when modal is closed
  };

  // console.log(data);
  return (
    <div
      className="relative text-white bg-cover h-[600px] md:h-screen
             bg-[url('/assets/mobile.png')] 
             md:bg-[url('/assets/hero.jpg')]"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute bottom-10 left-4 md:left-20 px-4">
        <div className="space-y-4 max-w-2xl sm:max-w-3xl">
          <h1 className="font-bold text-3xl sm:text-5xl leading-tight">
            Instant Delivery.
          </h1>
          <h1 className="font-bold text-3xl sm:text-5xl leading-tight">
            Right When You Need It.
          </h1>
          <p className="text-base sm:text-xl font-medium">
            Connect instantly with verified riders to deliver your goods or pick
            up purchases from any store.
          </p>
        </div>
        {trackDelivery ? (
          <div className="relative my-4 flex flex-col sm:flex-row items-center justify-center w-full gap-3">
            <div className="flex flex-grow w-full relative">
              <input
                type="text"
                placeholder="Enter package number..."
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-grow py-3 px-6 pr-16 border border-gray-300 rounded-full text-gray-800 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out shadow-sm"
              />
              <div className="absolute right-0 mr-1.5 top-1/2 -translate-y-1/2">
                <Button
                  size="lg"
                  onClick={fetchTrackingdata}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-full shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Track
                </Button>
              </div>
            </div>
            <Button
              size="lg"
              variant="secondary"
              className="mt-2 sm:mt-0"
              onClick={() => {
                setTrackDelivery(false);
                setTrackingId("");
              }}
            >
              Back
            </Button>
          </div>
        ) : (
          <div className="mt-6 flex items-start sm:items-center gap-4">
            <Button size="lg">
              <Link href="/book-a-delivery">Book a Delivery</Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setTrackDelivery(true)}
            >
              Track a Delivery
            </Button>
          </div>
        )}
        <div className="mt-6 flex  items-start sm:items-center gap-4">
          <AppStoreCard
            platform="Google Play"
            icon={<FaGooglePlay color="black" size={24} />}
            link="https://play.google.com/store/apps/details?id=app.vinkol.user"
          />
          <AppStoreCard
            platform="App Store"
            icon={<IoLogoApple color="black" size={24} />}
            link="https://apps.apple.com/ng/app/vinkol/id6751447117"
          />
        </div>
      </div>
      {/* Pass the data and control the modal's open state */}
      <TrackingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={data?.data}
      />
    </div>
  );
};
