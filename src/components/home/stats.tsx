"use client";

import { useGetStats } from "@/services/rider/query";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { LuPackageCheck } from "react-icons/lu";
import { RiMotorbikeFill } from "react-icons/ri";
import { Skeleton } from "../ui/skeleton";

const Stats = () => {
  const { data, isLoading } = useGetStats();

  return (
    <section className="max-w-screen-2xl w-full p-10 md:p-20 mx-auto min-h-[400px]">
      <h1 className="text-2xl md:text-5xl text-center md:text-left text-black  font-bold mb-10">
        Performance Highlights
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <>
            <Skeleton className="w-full h-[300px]" />
            <Skeleton className="w-full h-[300px]" />
            <Skeleton className="w-full h-[300px]" />
          </>
        ) : (
          <>
            <div className="flex items-center *: gap-y-4 flex-col bg-blue-50/30 p-8 rounded-xl">
              <RiMotorbikeFill size={48} className="text-blue-600" />
              <h1 className="font-bold text-primary text-4xl md:text-6xl text-center">
                {data?.data?.verifiedRiders}
              </h1>
              <p className="text-xl text-center font-medium">Verified Riders</p>
            </div>
            <div className="flex items-center *: gap-y-4 flex-col bg-blue-50/30 p-8 rounded-xl">
              <FaUsers size={48} className="text-blue-600" />
              <h1 className="font-bold text-primary text-4xl md:text-6xl text-center">
                {data?.data?.realUsers}
              </h1>
              <p className="text-xl text-center font-medium">
                Registered Users
              </p>
            </div>
            <div className="flex items-center *: gap-y-4 flex-col bg-blue-50/30 p-8 rounded-xl">
              <LuPackageCheck size={48} className="text-blue-600" />
              <h1 className="font-bold text-primary text-4xl md:text-6xl text-center">
                {data?.data?.deliveredOrders}
              </h1>
              <p className="text-xl text-center font-medium">
                Delivered Orders
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Stats;
