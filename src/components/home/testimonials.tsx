"use client";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { AnimateIn, staggerContainer, fadeUp } from "../shared/animate-in";

const testimonials = [
  {
    quote:
      "I ordered from a supermarket on Vinkol and it was at my door in 35 minutes. The tracking was accurate the whole time. I won't be going to the store myself again.",
    name: "Adaeze O.",
    role: "Customer, Lagos",
    initials: "AO",
    color: "bg-blue-primary",
    rating: 5,
  },
  {
    quote:
      "Since we registered our store on Vinkol, we've been getting consistent orders every day. The delivery is handled for us and payment hits our wallet instantly.",
    name: "Chukwuemeka Foods",
    role: "Shop Owner, Abuja",
    initials: "CF",
    color: "bg-emerald-600",
    rating: 5,
  },
  {
    quote:
      "I was skeptical at first, but the approval was fast and the orders started coming in same day. I'm making more than I expected each week, working my own hours.",
    name: "Oluwaseun R.",
    role: "Vinkol Rider, Port Harcourt",
    initials: "OR",
    color: "bg-violet-600",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="text-amber-400 fill-amber-400" aria-hidden="true" />
      ))}
    </div>
  );
}

export const Testimonials = () => {
  return (
    <section className="max-w-screen-2xl w-full px-4 py-10 md:px-20 md:py-20 mx-auto">
      <AnimateIn>
        <div className="text-center md:text-left mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-primary">
            What People Say
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-black mt-2">
            Real people. Real deliveries.
          </h2>
        </div>
      </AnimateIn>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            variants={fadeUp}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4"
          >
            <StarRating count={t.rating} />
            <blockquote className="text-gray-700 text-sm leading-relaxed flex-1">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
              <div
                className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                aria-hidden="true"
              >
                {t.initials}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
