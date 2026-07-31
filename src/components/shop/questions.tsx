"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Do I need a bike to become a personal shopper?",
    answer:
      "No, you don't need a bike. Any suitable means of transportation is permitted — scooters, bicycles, public buses, train, etc. You only need a reliable way to get orders delivered on time. Vinkol assigns delivery partners to handle logistics while you focus on shopping and order fulfillment.",
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
  {
    question: "How long does verification take?",
    answer:
      "Verification typically takes 24–48 hours after you submit your profile. You'll receive a notification once you're approved and can start accepting tasks.",
  },
];

export const Question = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-20 md:py-24 bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-4">
              FAQs
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
              Have questions?
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Can't find what you're looking for? Reach us directly.
            </p>
            <a
              href="mailto:vinkollogistics@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-blue-primary)] hover:underline"
            >
              vinkollogistics@gmail.com →
            </a>
          </div>

          <div className="space-y-0 divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-6">
                <button
                  className="flex items-center justify-between w-full text-left"
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                >
                  <p className="text-base md:text-lg font-semibold text-gray-900 pr-6">
                    {faq.question}
                  </p>
                  <span className="flex-shrink-0 h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 text-xl font-light">
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </button>
                {activeIndex === index && (
                  <p className="text-sm text-gray-500 leading-relaxed mt-4 pr-12">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
