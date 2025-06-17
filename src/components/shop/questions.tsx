"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Fast Delivery",
    answer:
      "Vinkol ensures swift, efficient deliveries, minimizing waiting time and helping customers meet urgent needs. Our reliable riders are committed to timely service, ensuring your packages and goods arrive quickly and securely at their destination.",
  },
  {
    question: "Refund of up to ₦50,000",
    answer:
      "Vinkol protects your goods with a refund of up to ₦50,000 for damage, theft, or loss due to rider negligence. Claims are thoroughly investigated within 72 hours, ensuring fair resolution and accountability for our customers’ peace of mind.",
  },
  {
    question: "Personal Shopper",
    answer:
      "Vinkol’s personal shopper service helps customers purchase and deliver goods with ease. Our trained shoppers handle orders as instructed, saving time and offering convenience, whether it’s groceries, gifts, or daily essentials delivered right to your door.",
  },
];

export const Question = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="max-w-screen-2xl w-full px-4 py-10 md:px-20 md:py-20 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-relaxed">
            Have questions About Vinkol?
          </h1>
          <p className="text-lg md:text-xl font-semibold text-gray-700">
            Contact us, we are always ready to help you. <br />
            <span>support@vinkol.com</span>
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b-2 border-[#A5A4A0] pb-6 transition-all duration-300"
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                <p className="text-xl md:text-2xl font-bold max-w-md">
                  {faq.question}
                </p>
                <button className="border border-[#A5A4A0] text-[#A5A4A0] rounded px-4 py-1 text-sm">
                  {activeIndex === index ? "Hide" : "View More"}
                </button>
              </div>
              {activeIndex === index && (
                <p className="text-base md:text-lg font-medium text-gray-700 mt-4 transition-all duration-300 ease-in-out">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
