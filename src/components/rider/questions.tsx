"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Do I need a bike to become a rider?",
    answer:
      "No, you don't necessarily need to own a bike. Vinkol offers partnership opportunities for bike owners, car drivers, and truck operators who want to earn on our trusted delivery network. However, owning a well-maintained bike may qualify you for faster onboarding.",
  },
  {
    question: "How do I get paid?",
    answer:
      "Riders are paid daily or weekly via direct bank transfer. Daily payouts carry a processing fee under 1% of total daily income. Earnings are calculated based on completed deliveries, distance covered, and any applicable bonuses — credited to your Vinkol wallet after each delivery.",
  },
  {
    question: "Can I choose which tasks to accept?",
    answer:
      "Yes, you can accept or decline tasks through the Vinkol Go app. Riders with a high acceptance rate get priority access to high-paying, time-sensitive deliveries.",
  },
  {
    question: "How long does verification take?",
    answer:
      "Verification typically takes 24–48 hours after you submit your application. You'll be notified once approved and can start accepting tasks immediately.",
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
              Can't find what you're looking for? Our team is here to help.
            </p>
            <a
              href="mailto:vinkollogistics@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-blue-primary)] hover:underline"
            >
              vinkollogistics@gmail.com →
            </a>
          </div>

          <div className="divide-y divide-gray-200">
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
