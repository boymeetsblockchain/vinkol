import React from "react";
import {
  Headset,
  ShieldCheck,
  Truck,
  ShoppingCart,
  Users,
  LifeBuoy,
  MapPin,
  Eye,
  Lock,
  Zap,
} from "lucide-react";
import { FaHandsAslInterpreting } from "react-icons/fa6";

const SupportAndPrivacyPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-screen-lg mx-auto   rounded-xl p-8 sm:p-10 lg:p-12 ">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-4 tracking-tight leading-tight">
            Vinkol Product Support & Privacy
          </h1>
          <p className="text-xl text-gray-600">
            Committed to reliable logistics, secure transactions, and your peace
            of mind.
          </p>
        </div>

        {/* Product Support Section */}
        <section className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <LifeBuoy className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
            <h2 className="text-4xl font-bold text-gray-900">
              Vinkol Product Support
            </h2>
          </div>
          <p className="text-lg leading-relaxed mb-6">
            At Vinkol, we are committed to delivering reliable and efficient
            logistics solutions tailored for businesses and individuals across
            Nigeria. Our product support ensures that your experience with our
            platform and services is smooth, secure, and satisfactory.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaHandsAslInterpreting className="w-6 h-6 mr-3 text-blue-500" />{" "}
            What We Offer
          </h3>
          <ul className="list-none space-y-4 mb-8">
            <li className="flex items-start text-lg">
              <Headset className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-900">
                  24/7 Customer Support:
                </span>{" "}
                Our dedicated support team is available around the clock to
                assist with order placement, tracking updates, claims, and
                inquiries.
              </div>
            </li>
            <li className="flex items-start text-lg">
              <Users className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-900">
                  Multi-Channel Support Access:
                </span>{" "}
                Reach us via phone, email, live chat, or through the Vinkol app.
                We also provide a self-service portal with FAQs and guides.
              </div>
            </li>
            <li className="flex items-start text-lg">
              <Truck className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-900">
                  Delivery Issue Resolution:
                </span>{" "}
                In the rare event of a delay, damage, or loss due to rider
                negligence, Vinkol offers up to ₦50,000 maximum refund—processed
                within 72 hours after proper investigation.
              </div>
            </li>
            <li className="flex items-start text-lg">
              <ShoppingCart className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-900">
                  Personal Shopper Assistance:
                </span>{" "}
                Our personal shopper feature helps you source and deliver
                products directly to your doorstep with ease.
              </div>
            </li>
            <li className="flex items-start text-lg">
              <Users className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-900">
                  Business Account Management:
                </span>{" "}
                Corporate and SME clients enjoy priority support, dedicated
                account managers, and customized reporting tools.
              </div>
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Zap className="w-6 h-6 mr-3 text-blue-500" /> Self-Help Resources
          </h3>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>
              Track your packages in real-time using our web and mobile
              platforms.
            </li>
            <li>
              Access detailed delivery logs, proof of delivery, and insurance
              status anytime.
            </li>
            <li>
              Download guides and tutorials for seamless onboarding and order
              management.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SupportAndPrivacyPage;
