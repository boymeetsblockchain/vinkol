import React from "react";
import {
  Headset,
  ShoppingCart,
  Users,
  LifeBuoy,
  Zap,
} from "lucide-react";
import { FaHandsAslInterpreting } from "react-icons/fa6";

const SupportAndPrivacyPage = () => {
  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 md:px-20 py-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-3">Support</p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-3">Product Support</h1>
          <p className="text-gray-500 text-base">Committed to reliable logistics, secure transactions, and your peace of mind.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-20 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12">

          {/* Product Support Section */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <LifeBuoy className="w-8 h-8 text-[var(--color-blue-primary)]" strokeWidth={1.5} />
              <h2 className="text-2xl font-bold text-gray-900">Vinkol Product Support</h2>
            </div>
            <p className="text-base text-gray-600 leading-relaxed mb-6">
              At Vinkol, we are committed to delivering reliable and efficient logistics solutions
              tailored for businesses and individuals across Nigeria. Our product support ensures
              that your experience with our platform and services is smooth, secure, and satisfactory.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaHandsAslInterpreting className="text-[var(--color-blue-primary)]" /> What We Offer
            </h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start text-base text-gray-700">
                <Headset className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">24/7 Customer Support:</span>{" "}
                  Our dedicated support team is available around the clock to assist with order
                  placement, tracking updates, claims, and inquiries.
                </div>
              </li>
              <li className="flex items-start text-base text-gray-700">
                <Users className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">Multi-Channel Support Access:</span>{" "}
                  Reach us via phone, email, live chat, or through the Vinkol app. We also provide
                  a self-service portal with FAQs and guides.
                </div>
              </li>
              <li className="flex items-start text-base text-gray-700">
                <ShoppingCart className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">Delivery Issue Resolution:</span>{" "}
                  In the rare event of a delay, damage, or loss due to rider negligence, Vinkol
                  offers up to ₦50,000 maximum refund — processed within 72 hours after proper
                  investigation.
                </div>
              </li>
              <li className="flex items-start text-base text-gray-700">
                <Users className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">Business Account Management:</span>{" "}
                  Corporate and SME clients enjoy priority support, dedicated account managers,
                  and customized reporting tools.
                </div>
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[var(--color-blue-primary)]" /> Self-Help Resources
            </h3>
            <ul className="list-disc list-inside space-y-2 text-base text-gray-700">
              <li>Track your packages in real-time using our web and mobile platforms.</li>
              <li>Access detailed delivery logs, proof of delivery, and insurance status anytime.</li>
              <li>Download guides and tutorials for seamless onboarding and order management.</li>
            </ul>
          </section>

          <div className="pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Questions?{" "}
              <a href="mailto:vinkollogistics@gmail.com" className="text-[var(--color-blue-primary)] font-semibold hover:underline">
                vinkollogistics@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SupportAndPrivacyPage;
