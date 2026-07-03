"use client";

import { useGetStats } from "@/services/rider/query";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { LuPackageCheck } from "react-icons/lu";
import { RiMotorbikeFill } from "react-icons/ri";
import { Skeleton } from "../ui/skeleton";
import CountUp from "./countup";

const Stats = () => {
  return (
    <section className="w-full bg-[#0a0a0a] py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          <div className="flex flex-col items-center sm:items-start gap-1 py-8 sm:py-0 sm:px-10 first:pl-0 last:pr-0">
            <div className="flex items-center gap-3 mb-2">
              <RiMotorbikeFill size={28} className="text-blue-primary" />
            </div>
            <p className="font-black text-5xl md:text-6xl text-white tracking-tight">
              <CountUp endValue={200} suffix="+" />
            </p>
            <p className="text-sm font-medium text-white/50 mt-1">Verified riders on the road</p>
          </div>
          <div className="flex flex-col items-center sm:items-start gap-1 py-8 sm:py-0 sm:px-10">
            <div className="flex items-center gap-3 mb-2">
              <LuPackageCheck size={28} className="text-blue-primary" />
            </div>
            <p className="font-black text-5xl md:text-6xl text-white tracking-tight">
              <CountUp endValue={500} suffix="+" />
            </p>
            <p className="text-sm font-medium text-white/50 mt-1">Deliveries completed</p>
          </div>
          <div className="flex flex-col items-center sm:items-start gap-1 py-8 sm:py-0 sm:px-10">
            <div className="flex items-center gap-3 mb-2">
              <FaUsers size={28} className="text-blue-primary" />
            </div>
            <p className="font-black text-5xl md:text-6xl text-white tracking-tight">
              <CountUp endValue={50} suffix=",000+" />
            </p>
            <p className="text-sm font-medium text-white/50 mt-1">Naira in protected item value</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
