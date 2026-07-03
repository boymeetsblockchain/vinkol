import React, { ReactNode } from "react";
import {
  FileText,
  Truck, // For Service Scope/Delivery Partners
  Scale, // For Liability
  ShieldCheck, // For Insurance Coverage
  Edit, // For Service Booking / Accuracy
  Briefcase, // For Separation of Obligations (representing distinct entities)
  TrendingUp, // For Real-Time Tracking and Data
  MessageSquare, // For Dispute Resolution
  Gavel, // For General Terms (compliance/updates)
  DollarSign, // Used for insurance amount
  CheckCircle,
  UserCheck,
  Handshake,
  Clock,
  AlertTriangle,
  CalendarDaysIcon, // General affirmation / successful tracking
} from "lucide-react";

// Define the props interface for the PolicyPoint component
interface PolicyPointProps {
  icon: ReactNode; // icon can be any ReactNode (e.g., a Lucide icon component)
  title: string;
  content: ReactNode; // content can be a string or complex JSX (e.g., lists)
}

// Reusable component for a single policy point
const PolicyPoint: React.FC<PolicyPointProps> = ({ icon, title, content }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mt-1 mr-3">{icon}</div>
    <div>
      <h4 className="text-lg font-semibold text-gray-800 mb-1">{title}</h4>
      <div className="text-gray-700 text-base">{content}</div>
    </div>
  </div>
);

// Main CustomerTermsAndConditions component
const CustomerTermsAndConditions: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 md:px-20 py-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-3">Legal</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-3">Customer Terms &amp; Conditions</h1>
          <p className="text-gray-500 text-sm">Effective date: January 1, 2025</p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-6 md:px-20 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12">
          {/* Section 1: Introduction */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <FileText className="w-7 h-7 mr-3 text-blue-500" />
              1. Introduction
            </h3>
            <p className="text-gray-700 text-base">
              Welcome to Vinkol Logistics! By using our platform to book your
              logistics services, you agree to the following terms and
              conditions. These terms outline your rights and obligations when
              engaging with Vinkol Logistics and its network of delivery
              partners.
            </p>
          </section>

          {/* Section 2: Service Scope */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Truck className="w-7 h-7 mr-3 text-blue-500" />
              2. Service Scope
            </h3>
            <div className="space-y-4">
              <PolicyPoint
                icon={<CheckCircle className="w-5 h-5 text-green-500" />}
                title=""
                content="Vinkol Logistics is a logistics solutions provider that connects customers with independent delivery partners on a single platform."
              />
              <PolicyPoint
                icon={<Handshake className="w-5 h-5 text-indigo-500" />}
                title=""
                content="While Vinkol facilitates the booking process and ensures seamless communication between parties, the delivery partners are directly responsible for the execution of deliveries."
              />
            </div>
          </section>

          {/* Section 3: Liability */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Scale className="w-7 h-7 mr-3 text-blue-500" />
              3. Liability
            </h3>
            <div className="space-y-2 text-gray-700">
              <p className="font-semibold text-gray-800">
                Vinkol Logistics is not liable for any:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>
                  Damage, theft, or loss of goods caused by external
                  circumstances outside the company’s control.
                </li>
                <li>
                  Misconduct or negligence by delivery partners or third-party
                  handlers.
                </li>
              </ul>
              <p className="mt-4">
                Any claims for damages or losses must be directed to the
                responsible delivery partner as Vinkol operates solely as a
                booking platform.
              </p>
            </div>
          </section>

          {/* Section 4: Insurance Coverage */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <ShieldCheck className="w-7 h-7 mr-3 text-blue-500" />
              4. Insurance Coverage
            </h3>
            <div className="space-y-4">
              <PolicyPoint
                icon={<DollarSign className="w-5 h-5 text-green-600" />}
                title=""
                content={
                  <>
                    Vinkol provides standard insurance coverage of up to
                    &#x20A6;50,000.00 for theft or damage of goods during
                    delivery, provided the loss is verified and occurred without
                    negligence by the rider or logistics company.
                  </>
                }
              />
              <PolicyPoint
                icon={<Briefcase className="w-5 h-5 text-orange-500" />}
                title=""
                content="Customers are responsible for ensuring their items are properly packaged to avoid damage during transit."
              />
            </div>
          </section>

          {/* Section 5: Service Booking */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Edit className="w-7 h-7 mr-3 text-blue-500" />
              5. Service Booking
            </h3>
            <div className="space-y-4">
              <PolicyPoint
                icon={<CheckCircle className="w-5 h-5 text-green-500" />}
                title=""
                content="All bookings must be completed through the official Vinkol platform."
              />
              <PolicyPoint
                icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
                title=""
                content="Customers must provide accurate delivery addresses and item details. Vinkol reserves the right to reject bookings with incomplete or misleading information."
              />
            </div>
          </section>

          {/* Section 6: Separation of Obligations */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Briefcase className="w-7 h-7 mr-3 text-blue-500" />
              6. Separation of Obligations
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                Vinkol Logistics maintains a clear distinction between its
                platform operations and the actions of delivery partners.
              </p>
              <p>
                Vinkol is not responsible for any event or action that could
                negatively impact its goodwill due to delivery partner
                behaviour.
              </p>
            </div>
          </section>

          {/* Section 7: Real-Time Tracking and Data */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <TrendingUp className="w-7 h-7 mr-3 text-blue-500" />
              7. Real-Time Tracking and Data
            </h3>
            <div className="space-y-4">
              <PolicyPoint
                icon={<Clock className="w-5 h-5 text-purple-500" />}
                title=""
                content="Customers can track deliveries in real-time using the Vinkol platform."
              />
              <PolicyPoint
                icon={<FileText className="w-5 h-5 text-gray-500" />}
                title=""
                content="Data provided is for informational purposes only and should not be relied upon for legal or financial claims."
              />
            </div>
          </section>

          {/* Section 8: Dispute Resolution */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <MessageSquare className="w-7 h-7 mr-3 text-blue-500" />
              8. Dispute Resolution
            </h3>
            <div className="space-y-4">
              <PolicyPoint
                icon={<CalendarDaysIcon className="w-5 h-5 text-blue-500" />}
                title=""
                content="Any disputes arising from service issues must be reported within 48 hours of the delivery attempt."
              />
              <PolicyPoint
                icon={<Handshake className="w-5 h-5 text-teal-500" />}
                title=""
                content="Vinkol will mediate disputes between customers and delivery partners where necessary but does not guarantee resolution."
              />
            </div>
          </section>

          {/* Section 9: General Terms */}
          <section className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Gavel className="w-7 h-7 mr-3 text-blue-500" />
              9. General Terms
            </h3>
            <div className="space-y-4">
              <PolicyPoint
                icon={<Edit className="w-5 h-5 text-indigo-500" />}
                title=""
                content="Vinkol reserves the right to update these terms at any time. Continued use of the platform constitutes acceptance of any changes."
              />
              <PolicyPoint
                icon={<UserCheck className="w-5 h-5 text-green-500" />}
                title=""
                content="By using the Vinkol platform, customers agree to comply with all applicable laws and regulations."
              />
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 md:px-20 mt-6 mb-12 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Vinkol Logistics. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default CustomerTermsAndConditions;
