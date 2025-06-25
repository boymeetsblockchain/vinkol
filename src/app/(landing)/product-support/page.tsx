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

        {/* Security & Privacy Section */}
        <section>
          <div className="flex items-center justify-center gap-4 mb-8">
            <ShieldCheck
              className="w-12 h-12 text-blue-600"
              strokeWidth={1.5}
            />
            <h2 className="text-4xl font-bold text-gray-900">
              Vinkol Security & Privacy
            </h2>
          </div>
          <p className="text-lg leading-relaxed mb-6">
            Your security and privacy are our top priorities at Vinkol. We go
            above and beyond to protect your data, transactions, and packages.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Lock className="w-6 h-6 mr-3 text-blue-500" /> Data Security
          </h3>
          <ul className="list-disc list-inside space-y-2 text-lg mb-8">
            <li>
              Vinkol uses SSL encryption and secure servers to protect all data
              transmissions.
            </li>
            <li>
              Our platform is built with industry-standard firewalls and
              security protocols to safeguard personal and financial
              information.
            </li>
            <li>
              Regular security audits and vulnerability assessments help ensure
              our systems remain secure.
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Eye className="w-6 h-6 mr-3 text-blue-500" /> Privacy Protection
          </h3>
          <ul className="list-disc list-inside space-y-2 text-lg mb-8">
            <li>
              We collect only the information necessary to provide our services
              — such as contact details, delivery addresses, and order
              specifics.
            </li>
            <li>
              Your data is never sold or shared with third parties for marketing
              purposes.
            </li>
            <li>
              You control your data — easily update or request deletion of your
              information through your account dashboard or by contacting
              support.
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Truck className="w-6 h-6 mr-3 text-blue-500" /> Package Safety
          </h3>
          <ul className="list-disc list-inside space-y-2 text-lg mb-8">
            <li>
              All deliveries are handled by vetted and trained Vinkol riders.
            </li>
            <li>
              Our self-retention insurance coverage ensures compensation for
              verified cases of loss, damage, or theft attributable to Vinkol’s
              operations.
            </li>
            <li>
              Real-time tracking allows you to monitor your package from
              dispatch to delivery.
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-6 h-6 mr-3 text-red-500" /> Your Role in
            Security
          </h3>
          <ul className="list-disc list-inside space-y-2 text-lg mb-8">
            <li>Keep login credentials confidential.</li>
            <li>
              Report any suspicious activity or unauthorized access immediately.
            </li>
            <li>
              Ensure accurate delivery information to prevent misdeliveries.
            </li>
          </ul>

          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Commitment
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              We are dedicated to continuous improvement. Vinkol updates its
              security measures regularly to counter emerging threats and
              enhance your privacy. Your trust fuels our innovation.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SupportAndPrivacyPage;
