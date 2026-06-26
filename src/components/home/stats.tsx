"use client";

import React from "react";
import { FaUsers } from "react-icons/fa";
import { LuPackageCheck } from "react-icons/lu";
import { RiMotorbikeFill } from "react-icons/ri";
import { motion } from "framer-motion";
import CountUp from "./countup";
import { AnimateIn, staggerContainer, fadeUp } from "../shared/animate-in";

const statItems = [
  {
    icon: <RiMotorbikeFill size={48} className="text-blue-600" />,
    value: 200,
    suffix: "+",
    label: "Verified Riders",
  },
  {
    icon: <LuPackageCheck size={48} className="text-blue-600" />,
    value: 500,
    suffix: "+",
    label: "Orders Completed",
  },
  {
    icon: <FaUsers size={48} className="text-blue-600" />,
    value: 100,
    suffix: "+",
    label: "Personal Shoppers",
  },
];

const Stats = () => {
  return (
    <section className="w-full bg-gradient-to-b from-blue-50/60 to-white py-16 md:py-20">
      <div className="max-w-screen-2xl w-full px-10 md:px-20 mx-auto">
        <AnimateIn>
          <h1 className="text-2xl md:text-5xl text-center md:text-left text-black font-bold mb-10">
            Vinkol in Numbers
          </h1>
        </AnimateIn>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="flex items-center gap-y-4 flex-col bg-white p-8 rounded-xl shadow-sm border border-blue-100"
            >
              {item.icon}
              <h1 className="font-bold text-primary text-4xl md:text-6xl text-center">
                <CountUp endValue={item.value} suffix={item.suffix} />
              </h1>
              <p className="text-xl text-center font-medium">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
