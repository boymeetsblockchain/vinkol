"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Users, BadgeDollarSign } from "lucide-react";

const stats = [
  { icon: Users, value: "200+", label: "Verified Riders" },
  { icon: ShieldCheck, value: "₦50k", label: "Refund Guarantee" },
  { icon: Clock, value: "7-Day", label: "Customer Support" },
  { icon: BadgeDollarSign, value: "500+", label: "Orders Completed" },
];

export const TrustBar = () => {
  return (
    <div className="w-full bg-gray-50 border-y border-gray-100 py-4 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Desktop: static grid */}
        <div className="hidden sm:grid sm:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-center gap-3">
              <stat.icon className="text-blue-primary shrink-0" size={20} aria-hidden="true" />
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-gray-900 text-sm">{stat.value}</span>
                <span className="text-gray-500 text-xs">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: marquee scroll */}
        <div className="sm:hidden relative">
          <motion.div
            className="flex gap-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          >
            {[...stats, ...stats].map((stat, i) => (
              <div key={i} className="flex items-center gap-2 shrink-0">
                <stat.icon className="text-blue-primary" size={16} />
                <span className="font-bold text-gray-900 text-xs">{stat.value}</span>
                <span className="text-gray-500 text-xs">{stat.label}</span>
                <span className="text-gray-200 ml-2">|</span>
              </div>
            ))}
          </motion.div>
          {/* Screen-reader accessible version */}
          <ul className="sr-only">
            {stats.map((stat) => (
              <li key={stat.label}>{stat.value} {stat.label}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
