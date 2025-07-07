"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Do I need a bike to become a personal shopper?",
    answer:
      "No, you don’t need a bike. Any suitable means of transportation is permitted i.e. scooters, bicycles, public buses, train, etc. You only need a reliable means of transportation to get the customer’s groceries delivered within the specified time frame of shopping. Vinkol assigns delivery partners to handle logistics while you focus on shopping and order fulfillment.",
  },
  {
    question: "How do I get paid?",
    answer:
      "You get paid daily or weekly via bank transfer based on completed and verified tasks. Your earnings include service fees, bonuses, and tips where applicable.",
  },
  {
    question: "Can I choose which tasks to accept?",
    answer:
      "Yes, you have the flexibility to accept or decline tasks. However, consistent performance improves your rating and access to more high-paying tasks.",
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
            <span>support@vinkol.ng</span>
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
