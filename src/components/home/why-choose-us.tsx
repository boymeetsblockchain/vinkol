"use client";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { AnimateIn, staggerContainer, fadeUp } from "../shared/animate-in";

const whyChooseUs = [
  {
    title: "Fast Delivery",
    icon: <img src="/assets/bike.svg" alt="" className="h-12 w-12" />,
    description:
      "Vinkol ensures swift, efficient deliveries, minimizing waiting time and helping customers meet urgent needs. Our reliable riders are committed to timely service, ensuring your packages and goods arrive quickly and securely at their destination.",
  },
  {
    title: "Refund up to ₦50,000",
    icon: <img src="/assets/transfer.svg" alt="" className="h-12 w-12" />,
    description:
      "Vinkol protects your goods with a refund of up to ₦50,000 for damage, theft, or loss due to rider negligence. Claims are thoroughly investigated within 72 hours, ensuring fair resolution and accountability for our customers' peace of mind.",
  },
  {
    title: "Personal Shopper",
    icon: <ShoppingBag size={48} className="text-blue-primary" />,
    description:
      "Vinkol's personal shopper service helps customers purchase and deliver goods with ease. Our trained shoppers handle orders as instructed, saving time and offering convenience, whether it's groceries, gifts, or daily essentials delivered right to your door.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="max-w-screen-2xl w-full p-10 md:p-20 mx-auto">
      <AnimateIn className="max-w-md mb-10">
        <h1 className="text-2xl md:text-5xl text-center md:text-left font-bold">
          Built for Speed, Trust, and Reliability
        </h1>
      </AnimateIn>
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {whyChooseUs.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            className="w-full min-h-[300px] bg-[#FAFAFA] p-6 py-8 flex items-start justify-between flex-col shadow-sm rounded-xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <div className="my-4">{item.icon}</div>
              <h2 className="font-bold text-2xl">{item.title}</h2>
            </div>
            <p className="font-medium text-sm mt-4 text-gray-600">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
