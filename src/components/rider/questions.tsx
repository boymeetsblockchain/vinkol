"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Do I need a bike to become a rider?",
    answer:
      "No, you don’t necessarily need to own a bike. Vinkol offers partnership opportunities for both bike owners, cars and truck riders who want to earn passive income on our trusted vendor B2B/B2C network. However, owning a well-maintained bike(s) may qualify you for faster onboarding.",
  },
  {
    question: "How do I get paid?",
    answer:
      "Riders are paid weekly via direct bank transfer or daily with a processing fee of less than 1% of total daily income. Your earnings are calculated based on the number of completed deliveries, distance covered, and any applicable bonuses or incentives earned during the week. These earnings are made available in your wallets, upon each completion of deliveries.",
  },
  {
    question: "Can I choose which tasks to accept?",
    answer:
      "Yes, riders have the flexibility to accept or decline delivery tasks through the Vinkol app. However, riders who maintain a high task acceptance rate may receive priority access to high-paying and time-sensitive deliveries over others.",
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
