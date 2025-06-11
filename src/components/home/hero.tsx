"use client";
import React, { useState } from "react";
import { FaGooglePlay } from "react-icons/fa6";
import { IoLogoApple } from "react-icons/io";

import { Button } from "../button";
import { AppStoreCard } from "../shared/appstore";
import Link from "next/link";
import { useGetOrders, useTrackOrders } from "@/services/orders/query";

export const Hero = () => {
  const [trackDelivery, setTrackDelivery] = useState<boolean>(false);
  const [trackingId, setTrackingId] = useState<string>("");
  const { data, isPending } = useTrackOrders(trackingId);
  return (
    <div
      className="relative text-white bg-cover  md:h-[100vh] h-[600px]"
      style={{ backgroundImage: `url('/assets/hero.png')` }}
    >
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
          <div className="relative my-4 flex items-center justify-center w-full ">
            <input
              type="text"
              placeholder="Enter package number..."
              className="flex-grow py-3 px-6 pr-16 border border-gray-300 rounded-full text-gray-800 bg-white  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out shadow-sm"
            />
            <div className="absolute right-0 mr-1.5">
              {" "}
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-full shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Track
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex  items-start sm:items-center gap-4">
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
            link="https://play.google.com/store"
          />
          <AppStoreCard
            platform="App Store"
            icon={<IoLogoApple color="black" size={24} />}
            link="https://www.apple.com/app-store/"
          />
        </div>
      </div>
    </div>
  );
};
