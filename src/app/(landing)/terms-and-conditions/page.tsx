import React, { ReactNode } from "react";
import {
  FileText,
  Handshake,
  ShieldCheck,
  Clock,
  TrendingUp,
  Scale,
  AlertTriangle,
  MessageSquare,
  Briefcase,
  CheckCircle,
  Edit,
  UserCheck,
  Gavel,
  Truck,
  Wallet,
  DollarSign,
  Headphones,
  Mail,
  Phone,
  Globe,
  CalendarDays,
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

// Main TermsandConditions component
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br  p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-2 tracking-tight">
          VINKOL LOGISTICS
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">
          TERMS AND CONDITIONS FOR BUSINESS-TO-BUSINESS PROVIDERS
        </h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto  overflow-hidden">
        <div className="p-6 sm:p-8 lg:p-10">
          {/* Section 1: Scope of Agreement */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <FileText className="w-7 h-7 mr-3 text-blue-500" />
              1. Scope of Agreement
            </h3>
            <p className="text-gray-700 text-base">
              This agreement outlines the terms of the partnership between
              Vinkol Logistics (“Vinkol”) and its business-to-business (B2B)
              providers (“Logistics Partners”). By entering into this agreement,
              the Logistics Partner agrees to adhere to the terms below:
            </p>
          </section>

          {/* Section 2: Standard Insurance Coverage (GIC) */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <ShieldCheck className="w-7 h-7 mr-3 text-blue-500" />
              2. Standard Insurance Coverage (GIC)
            </h3>
            <div className="space-y-4">
              <PolicyPoint
                icon={<DollarSign className="w-5 h-5 text-green-500" />}
                title=""
                content={
                  <>
                    Vinkol provides standard insurance coverage (GIC) solely for
                    customers’ missing or undelivered items to the tune of
                    ₦50,000.00 per trip.
                  </>
                }
              />
              <PolicyPoint
                icon={<Briefcase className="w-5 h-5 text-indigo-500" />}
                title=""
                content={
                  <>
                    Vinkol will provide complimentary Company Poly Mailers or
                    Shipping bags to its Partners on a time off basis or on
                    quarterly (subject to company’s review).
                  </>
                }
              />
              <PolicyPoint
                icon={<TrendingUp className="w-5 h-5 text-teal-500" />}
                title=""
                content={
                  <>
                    With our centralized database and functionality, Vinkol
                    offers invoice and real-time tracking for Business Partner’s
                    financial performance to aid their decision making.
                  </>
                }
              />
              <PolicyPoint
                icon={<CheckCircle className="w-5 h-5 text-green-600" />}
                title="Applicability of Insurance Coverage"
                content={
                  <>
                    This insurance coverage only applies in cases of proven
                    theft or damage occurring during the course of the trip,
                    provided that:
                    <ul className="list-disc list-inside mt-2 ml-4 text-gray-700 space-y-1">
                      <li>
                        The loss or damage was not caused by the rider’s
                        negligence.
                      </li>
                      <li>
                        The incident is no fault of the Logistics Partner or
                        Vinkol Logistics.
                      </li>
                      <li>
                        Claims must be submitted with sufficient proof of loss
                        or damage for verification within 24 hours.
                      </li>
                    </ul>
                  </>
                }
              />
            </div>
          </section>

          {/* Section 3: Partnership Term and Renewal */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Clock className="w-7 h-7 mr-3 text-blue-500" />
              3. Partnership Term and Renewal
            </h3>
            <div className="space-y-4">
              <PolicyPoint
                icon={<Handshake className="w-5 h-5 text-orange-500" />}
                title=""
                content="The partnership is valid for five (5) years, subject to yearly renewal based on performance, compliance, and mutual agreement."
              />
              <PolicyPoint
                icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
                title=""
                content="Either party may terminate the agreement by providing a 30-day written notice after the first year."
              />
            </div>
          </section>

          {/* Section 4: Revenue Sharing */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Wallet className="w-7 h-7 mr-3 text-blue-500" />
              4. Revenue Sharing
            </h3>
            <div className="space-y-4">
              <PolicyPoint
                icon={<DollarSign className="w-5 h-5 text-green-600" />}
                title=""
                content="Logistics Partners agree to remit 20% of revenue from every delivery registered under Vinkol Logistics Group."
              />
              <PolicyPoint
                icon={<CheckCircle className="w-5 h-5 text-blue-500" />}
                title=""
                content="Payment must be made promptly and tracked using the systems provided by Vinkol."
              />
            </div>
          </section>

          {/* Section 5: Liability and Responsibilities */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Scale className="w-7 h-7 mr-3 text-blue-500" />
              5. Liability and Responsibilities
            </h3>
            <div className="space-y-2 text-gray-700">
              <p className="font-semibold text-gray-800">
                Vinkol is not liable for:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Any repair or maintenance costs for riders’ vehicles.</li>
                <li>
                  Injuries or accidents sustained by riders during operations.
                </li>
                <li>
                  Any external dealings or misconduct between Logistics Partners
                  or riders and their clients. Subsidiary companies bear full
                  responsibility for their conduct.
                </li>
              </ul>
              <p className="font-semibold text-gray-800 mt-4">
                Vinkol’s liability is limited solely to ensuring:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>
                  The delivery of parcels from the pick up point to the agreed
                  destination.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 6: Compliance */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Gavel className="w-7 h-7 mr-3 text-blue-500" />
              6. Compliance
            </h3>
            <div className="space-y-2 text-gray-700">
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Logistics Partners are required to comply with all local laws,
                  regulations, and policies related to logistics operations.
                </li>
                <li>
                  Any misconduct or breach of terms may result in the
                  termination of this agreement.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7: Dispute Resolution */}
          <section className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <MessageSquare className="w-7 h-7 mr-3 text-blue-500" />
              7. Dispute Resolution
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                All disputes arising from this agreement will be resolved
                through mediation. If mediation fails, the dispute will be
                resolved in accordance with Nigerian law.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="mt-10 text-center text-gray-600 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Vinkol Logistics. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
