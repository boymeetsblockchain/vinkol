"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { staggerContainer, fadeUp } from "../shared/animate-in";
import { AnimateIn } from "../shared/animate-in";

const steps = [
  {
    number: "01",
    icon: "/assets/request.svg",
    alt: "Request icon",
    title: "Request",
    description:
      "Tell us what you need — pickup, delivery, or a personal shopper. Add the details, location, and time.",
  },
  {
    number: "02",
    icon: "/assets/match.svg",
    alt: "Match icon",
    title: "Match",
    description:
      "We instantly match you with a nearby verified rider or shopper ready to help.",
  },
  {
    number: "03",
    icon: "/assets/delivered.svg",
    alt: "Delivered icon",
    title: "Delivered",
    description:
      "Your item is picked up and delivered right to your door. Fast, safe, and tracked in real-time.",
  },
];

export const HowitWorks = () => {
  return (
    <section className="max-w-screen-2xl w-full px-4 py-10 md:px-20 md:py-20 mx-auto">
      <AnimateIn>
        <h2 className="text-2xl md:text-5xl text-center md:text-left text-black font-bold mb-10">
          How Vinkol Works
        </h2>
      </AnimateIn>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-5 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {steps.map((step, index) => (
          <>
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="flex md:items-start items-center gap-y-3 flex-col"
            >
              <span className="inline-flex items-center justify-center text-xs font-bold text-blue-primary bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mb-1">
                {step.number}
              </span>
              <img
                src={step.icon}
                alt={step.alt}
                className="md:w-[68px] w-[40px] md:h-[68px] h-[40px]"
              />
              <h3 className="font-bold text-2xl text-center md:text-left">
                {step.title}
              </h3>
              <p className="text-sm text-center md:text-left font-medium text-gray-600">
                {step.description}
              </p>
            </motion.div>

            {index < steps.length - 1 && (
              <div
                key={`divider-${index}`}
                className="hidden md:block w-[2px] h-full bg-gradient-to-b from-white via-blue-600 to-white mx-auto"
                aria-hidden="true"
              />
            )}
          </>
        ))}
      </motion.div>

      {/* CTA after steps */}
      <AnimateIn delay={0.2}>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
          <Link
            href="/book-a-delivery"
            className="inline-flex items-center gap-2 bg-blue-primary text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
            aria-label="Book your first delivery"
          >
            Book a Delivery <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/explore-shop"
            className="inline-flex items-center gap-2 text-blue-primary border border-blue-primary font-semibold text-sm px-6 py-3 rounded-full hover:bg-blue-50 transition-colors"
            aria-label="Explore stores on Vinkol"
          >
            Explore Stores
          </Link>
        </div>
      </AnimateIn>
    </section>
  );
};
