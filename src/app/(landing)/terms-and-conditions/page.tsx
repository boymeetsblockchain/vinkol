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
          TERMS AND CONDITIONS FOR SUPERMARKET/SHOP PARTNERSHIP
        </h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto  overflow-hidden">
        <div className="p-6 sm:p-8 lg:p-10">
          <section className="border-b pb-6 mb-6 border-gray-200 text-gray-700">
            <h3>
              <span className="text-blue-500 font-semibold">
                DEFINITIONS AND INTERPRETATIONS:{" "}
              </span>
              In this Agreement, the following capitalized terms shall have the
              meanings ascribed to them below unless the context otherwise
              requires:{" "}
            </h3>
            <br />
            <p>
              <strong>“Affiliate”</strong> means any person who directly or
              indirectly controls, is controlled by or is under common control
              with such Party. A person controls another person if it holds or
              is beneficially entitled to hold, directly or indirectly, other
              than by way of security interest only, more than 50% of its voting
              rights, income or capital.
            </p>
            <br />
            <p>
              <strong>“Business Day”</strong> means Mondays to Fridays,
              excluding public holidays declared by the Federal Government in
              Nigeria.
            </p>
            <br />
            <p>
              <strong>“Confidential Information”</strong> means all
              confidential, proprietary or sensitive information of either
              Party, whether tangible or intangible, oral or written, including
              any information which may have been disclosed by either Party
              prior to or after the execution of this Agreement. It also
              includes any information relating to and or including released or
              unreleased software or hardware products, the marketing or
              promotion of products, business plans, practices or policies, and
              information received from either Party, including trade secrets,
              source codes, object codes, patents, inventions, firmware,
              designs, formulas, specifications, financial information and
              projections, numbers, lists of suppliers and potential suppliers,
              lists of customers and potential customers, equipment lists,
              employee lists, management methods, know-how, working methods,
              manufacturing techniques, operating techniques, and all manuals,
              documents, reports, spreadsheets, files, market information,
              computer disks and tapes (whether machine or user readable) and
              other written or electronic information pertaining thereto.
            </p>
            <br />
            <p>
              <strong>“Effective Date”</strong> means the date the Vendor signs
              up on the Platform by ticking the “I agree” feature.
            </p>
            <br />
            <p>
              <strong>“Force Majeure”</strong> means any event or circumstance
              beyond the reasonable control of the Parties that is not
              foreseeable, is unavoidable and its origin is not due to
              negligence or lack of care on the part of the Parties. Such events
              include but not limited to acts of God, fire, flood, invasion,
              war, revolution, uprising, insurrection, social/public unrest,
              public disturbance, strike, riots, fire disaster, storm, acts of
              terrorism and any other circumstance which may hinder or delay the
              performance of the obligations of the Parties under this
              Agreement.{" "}
            </p>
            <br />
            <p>
              <strong>“Grocery”</strong> means all edible and non-edible items
              sold in a grocery or supermarket or shop to be sold by the Vendor
              on the Platform.
            </p>
            <br />
            <p>
              <strong>“Grocery Content”</strong> means the description of
              available Grocery items provided by the Vendor to Vinkol Logistics
              as part of the Vendor Content.
            </p>
            <br />
            <p>
              <strong> “Harassment”</strong> means any kind of behaviour that
              humiliates, victimizes, or threatens a person, like directing
              racial slurs and making sexual advances. It also includes but is
              not limited to seemingly harmless actions, like calling a person
              constantly outside work for non- emergencies and without prior
              agreement. Innuendos, veiled threats and inappropriate or
              offensive jokes. Harassment can happen in-person, over the phone,
              via email or through a messaging app.
            </p>
            <br />
            <p>
              <strong>“Intellectual Property”</strong> means all present and
              future worldwide patents, trademarks, service marks, trade names,
              good will, registered designs, design rights, database rights,
              copyrights, inventions, rights in computer software and other
              forms of intellectual or industrial property and all
              registrations, applications, renewals, extensions, combinations,
              divisions, or reissues of the foregoing.
            </p>
            <br />
            <p>
              <strong>“Platform”</strong> means the Vinkol Logistics App or
              website used to provide the Services to Customers.
            </p>
            <br />
            <p>
              <strong>“Pricing Tier”</strong> means the commission payable by
              the Vendor per Transaction, based on the tier selected during the
              onboarding process.
            </p>
            <br />
            <p>
              <strong>“Vendor Content”</strong> means the Vendor Marks, Vendor
              products and any materials, documentation, menu descriptions,
              data, information, goods, services, images or photographs of the
              Vendor on the Platform.
            </p>
            <br />
            <p>
              <strong>“Vendor Marks”</strong> means the trademarks, trade names,
              brand names, logos, service marks, graphics and designs owned by
              the Vendor.
            </p>
            <br />
            <p>
              <strong>“Transaction”</strong> means the total order placed by the
              customer on the Platform.
            </p>
            <br />
            <p>
              <strong>“VAT”</strong> means Value Added Tax.
            </p>
          </section>
          {/* Services */}
          <section className="mb-8 border-b pb-6 border-gray-200 text-gray-700">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <FileText className="w-7 h-7 mr-3 text-blue-500" />
              SERVICES
            </h3>
            <p>
              Vinkol Logistics shall provide the following Services to the
              Vendor:
            </p>
            <br />
            <ul className="list-decimal ml-4">
              <li>
                on-demand logistics services on behalf of the Vendor to its
                customers.{" "}
              </li>
              <li>
                promote and manage orders for the Vendor made through the
                Platform.{" "}
              </li>
              <li>
                maintain and obtain all requisite registration and permits
                required by law for the provision of the Services; and
              </li>
              <li>
                comply with all regulatory and compliance obligations in line
                with applicable laws.{" "}
              </li>
              <li>
                Perform Visual Display, Marketing and Promotion of Vendors Brand
                at will.{" "}
              </li>
            </ul>
          </section>
          {/* Obligations of the Vendor */}
          <section className="mb-8 border-b pb-6 border-gray-200 text-gray-700">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <FileText className="w-7 h-7 mr-3 text-blue-500" />
              OBLIGATIONS OF THE VENDOR
            </h3>
            <p>The Vendor shall perform the following obligations:</p>
            <br />
            <ul className="list-disc ml-4">
              <li>
                make available to Vinkol Logistics all requisite information
                including but not limited to the Grocery Content, Skincare
                Products, Food, Vendor Content and Vendor Marks upon sign-up on
                the Platform.{" "}
              </li>
              <li>
                provide the account details of the Vendor for remittance of
                monies paid by customers;{" "}
              </li>
              <li>
                provide Vinkol Logistics with up-to-date prices and Grocery
                Content within five (5) days of signing up on the Platform and
                immediately when there are changes or variations;
              </li>
              <li>
                ensure all Grocery Contents comply with SON, NAFDAC and all
                applicable regulatory bodies;{" "}
              </li>
              <li>
                ensure it does not offer expired, contaminated, counterfeited or
                prohibited Grocery Contents;{" "}
              </li>
              <li>maintain sanitary conditions for Grocery Contents;</li>
              <li>
                prepare and package orders for pickup by Vinkol Logistics and
                dispatch to customers;{" "}
              </li>
              <li>maintain all required licenses and permits; </li>
              <li>
                allow Vinkol Logistics to use Vendor Marks and Content at no
                cost;{" "}
              </li>
              <li>comply with all applicable laws. </li>
            </ul>
          </section>
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Clock className="w-7 h-7 mr-3 text-blue-500" />
              COMMENCEMENT AND DURATION
            </h3>
            <p className="text-gray-700">
              This Agreement shall commence from the Effective Date and remain
              in force until terminated in accordance with its provisions.{" "}
            </p>
          </section>
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <ShieldCheck className="w-7 h-7 mr-3 text-blue-500" />
              AUTHORIZATION
            </h3>
            <p className="text-gray-700">
              The Vendor authorizes Vinkol Logistics to advertise, market and
              provide the Services and grants a license to use Vendor
              Intellectual Property for this purpose.
            </p>
          </section>
          \
          <section>
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              FEES, SETTLEMENT, INDEMNITY, LIABILITY, CONFIDENTIALITY, DATA
              PROTECTION, TERMINATION, GOVERNING LAW, ESG, AND ALL OTHER CLAUSES
            </h3>
          </section>
          {/* Section 2: Standard Insurance Coverage (GIC) */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Briefcase className="w-7 h-7 mr-3 text-blue-500" />
              Fees
            </h3>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc ml-4 gap-2">
                <li>
                  In consideration of the Services provided by Vinkol Logistics
                  under this Agreement, the Vendor shall pay Vinkol Logistics
                  the agreed commission based on the selected Pricing Tier
                  (“Fee”). The Fee due to Vinkol Logistics shall be exclusive of
                  VAT. Pricing Tier is grouped into monthly subscription package
                  of Teer 1-Basic (#20,000), Teer 2 -Standard (#30,000) and Teer
                  3-Premium (#50,000){" "}
                </li>
                <li>
                  Vinkol Logistics will charge VAT at 7.5% on all Fees indicated
                  in Clause 6.1 above and any Transaction processed through the
                  Platform (customers pay VAT).{" "}
                </li>
                <li>
                  It is further agreed that all payments by the customer shall
                  be made to Vinkol Logistics, and Vinkol Logistics shall be
                  entitled to deduct the Fee at source and shall transfer the
                  balance to the Vendor.{" "}
                </li>
                <li>
                  The Fee shall be effective for the Term of this Agreement and
                  may be subject to review based on the mutual agreement of the
                  Parties in writing.{" "}
                </li>
                <li>
                  Notwithstanding Clause 6.4 above, Vinkol Logistics reserves
                  the right to revise the Fees as may be necessary and shall
                  notify the Vendor prior to implementation of the revised fee.{" "}
                </li>
              </ul>
            </div>
          </section>
          {/* Section 7: Settlement Process */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Wallet className="w-7 h-7 mr-3 text-blue-500" />
              Settlement Process
            </h3>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc ml-4 gap-2">
                <li>
                  Vinkol Logistics shall maintain a record of all transactions
                  processed on behalf of the Vendor on the Platform. The Vendor
                  shall be able to monitor all transactions relating to its
                  account in real-time.
                </li>
                <li>
                  The Parties further agree that on each Business Day, Vinkol
                  shall pay into the Vendor’s designated bank account the amount
                  received on the transaction date +1 Business Day after
                  deduction of the Fees due to Vinkol Logistics from the Vendor.
                </li>
              </ul>
            </div>
          </section>
          {/* Section 8: Mutual Obligation */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Handshake className="w-7 h-7 mr-3 text-blue-500" />
              Mutual Obligations of the Parties
            </h3>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc ml-4 gap-2">
                <li>
                  Parties agree not to act, or omit to act, in any way likely to
                  cause damage to any person or property or cause the quality of
                  Services rendered to be impaired in any manner whatsoever.
                </li>
                <li>
                  If at any time during the Term of this Agreement, either Party
                  is informed or information comes to its attention that it is
                  in violation of any law, guideline, policy, regulation or
                  code, such Party shall immediately take all appropriate steps
                  to remedy such violation.
                </li>
                <li>
                  Each Party shall use reasonable endeavours to ensure the
                  accuracy of any information or documents provided under this
                  Agreement.{" "}
                </li>
                <li>
                  Parties shall not circumvent the operation of this Agreement
                  to deprive the other Party of any benefit intended herein.
                </li>
                <li>
                  Each Party shall ensure that information obtained from the
                  other Party is used only as contemplated under this Agreement.
                </li>
              </ul>
            </div>
          </section>
          {/* Section 9: Representations and Warranties */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Briefcase className="w-7 h-7 mr-3 text-blue-500" />
              Representations and Warranties
            </h3>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc ml-4 gap-2">
                <li>
                  Each Party validly exists under Nigerian law and has authority
                  to enter into this Agreement.
                </li>
                <li>
                  The execution and performance of this Agreement shall not
                  breach any other obligation.
                </li>
                <li>
                  The Vendor warrants that all information supplied to Vinkol is
                  accurate and not misleading.
                </li>
              </ul>
            </div>
          </section>
          {/* Section 10: Indemnity */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Briefcase className="w-7 h-7 mr-3 text-blue-500" />
              Indemnity
            </h3>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc ml-4 gap-2">
                <li>
                  The Parties agree to indemnify and hold harmless each other
                  against all liabilities, damages, losses, and expenses arising
                  from negligence, default, or omission in performance of
                  obligations.
                </li>
                <li>
                  Either Party shall indemnify the other for losses arising from
                  breach of representations and warranties.
                </li>
                <li>
                  The Vendor agrees to indemnify Vinkol for losses arising from
                  breach of regulatory or safety standards under Nigerian law.
                </li>
                <li>
                  Either Party shall indemnify the other against third-party
                  intellectual property infringement claims.
                </li>
              </ul>
            </div>
          </section>
          {/* Section 10: Limitation of Liability */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Briefcase className="w-7 h-7 mr-3 text-blue-500" />
              Limitation of Liability
            </h3>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc ml-4 gap-2">
                <li>
                  Neither Party shall be liable for indirect, consequential,
                  incidental, special, or punitive damages including loss of
                  profit or goodwill.
                </li>
                <li>
                  These limitations shall not apply to confidentiality breaches,
                  intellectual property infringement, fraud, gross negligence,
                  or violations of applicable law.
                </li>
                <li>
                  The maximum liability of Vinkol shall be limited to the
                  delivery of orders and the fees paid to Vinkol Logistics by
                  the Vendor’s customer when utilizing the Platform.
                </li>
              </ul>
            </div>
          </section>
          {/* Section 11: Intellectual Property Rights */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Briefcase className="w-7 h-7 mr-3 text-blue-500" />
              Intellectual Property Rights
            </h3>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc ml-4 gap-2">
                <li>
                  All Intellectual Property owned prior to or acquired after the
                  Effective Date shall remain the property of the owning Party.
                </li>
                <li>
                  No rights are transferred under this Agreement without prior
                  written consent.
                </li>
              </ul>
            </div>
          </section>
          {/* Section 12: Confidentiality */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <ShieldCheck className="w-7 h-7 mr-3 text-blue-500" />
              Confidentiality
            </h3>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc ml-4 gap-2">
                <li>
                  Parties shall maintain confidentiality of all Confidential
                  Information during the Term of this Agreement.
                </li>
                <li>
                  Disclosure shall only occur where required by law, with prior
                  written notice where practicable.
                </li>
                <li>
                  Authorized Representatives must comply with confidentiality
                  obligations.
                </li>
                <li>
                  Upon termination, Confidential Information shall be returned,
                  provided that Vinkol may retain copies pursuant to retention
                  policies or applicable law.
                </li>
              </ul>
            </div>
          </section>
          {/* Section 13: Data Protection */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <ShieldCheck className="w-7 h-7 mr-3 text-blue-500" />
              Data Protection
            </h3>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc ml-4 gap-2">
                <li>
                  Each Party shall comply with Nigeria Data Protection
                  Regulations 2019 and Nigeria Data Protection Act 2023.
                </li>
                <li>
                  Vinkol privacy policy governs data processing under this
                  Agreement.
                </li>
              </ul>
            </div>
          </section>
          {/* Section 14: Suspension of Service */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <AlertTriangle className="w-7 h-7 mr-3 text-blue-500" />
              Suspension of Service
            </h3>
            <p className="text-gray-700">
              Vinkol Logistics may immediately suspend Services where misuse
              occurs contrary to its Terms of Use.
            </p>
          </section>
          {/* Section 15: Waiver */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <FileText className="w-7 h-7 mr-3 text-blue-500" />
              Waiver
            </h3>
            <p className="text-gray-700">
              No failure or delay in exercising rights shall operate as a
              waiver.
            </p>
          </section>
          {/* Section 16: Severability */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <ShieldCheck className="w-7 h-7 mr-3 text-blue-500" />
              Severability
            </h3>
            <p className="text-gray-700">
              Invalid provisions shall not affect the enforceability of
              remaining provisions.
            </p>
          </section>
          {/* Section 17: Relationship of the Parties */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <MessageSquare className="w-7 h-7 mr-3 text-blue-500" />
              Relationship of the Parties
            </h3>
            <p className="text-gray-700">
              This Agreement does not create a partnership, joint venture,
              employment, or agency relationship.
            </p>
          </section>
          {/* Section 18: Notices */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <FileText className="w-7 h-7 mr-3 text-blue-500" />
              Notices
            </h3>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc ml-4 gap-2">
                <li>
                  Notices shall be delivered to Vinkol Logistics’ registered
                  address and the Vendor’s onboarding address.
                </li>
                <li>Notices are deemed received upon delivery confirmation.</li>
              </ul>
            </div>
          </section>
          {/* Section 19: Force Majeure */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <ShieldCheck className="w-7 h-7 mr-3 text-blue-500" />
              Force Majeure
            </h3>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc ml-4 gap-2">
                <li>
                  Force Majeure events excuse performance to the extent
                  affected.
                </li>
                <li>Affected Party must notify the other Party promptly.</li>
                <li>
                  Either Party may terminate if Force Majeure persists beyond
                  thirty (30) days.
                </li>
              </ul>
            </div>
          </section>
          {/* Section 20: Governing Law and Dispute Resolution */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Scale className="w-7 h-7 mr-3 text-blue-500" />
              Governing Law and Dispute Resolution
            </h3>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc ml-4 gap-2">
                <li>
                  This Agreement is governed by the laws of the Federal Republic
                  of Nigeria.
                </li>
                <li>
                  Disputes shall be amicably resolved or referred to mediation
                  at the Lagos Multi Door Courthouse (LMDC).
                </li>
                <li>Nothing prevents court action.</li>
              </ul>
            </div>
          </section>
          {/* Section 21: Termination */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <AlertTriangle className="w-7 h-7 mr-3 text-blue-500" />
              Termination
            </h3>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc ml-4 gap-2">
                <li>
                  Either Party may terminate within ten (10) business days’
                  written notice.
                </li>
                <li>Termination may occur by mutual agreement.</li>
                <li>
                  Material breach not remedied within seven (7) days entitles
                  termination.{" "}
                </li>
                <li>Insolvency events trigger termination.</li>
                <li>Accrued rights survive termination. </li>
              </ul>
            </div>
          </section>
          {/* Section 22: Survival */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <ShieldCheck className="w-7 h-7 mr-3 text-blue-500" />
              Survival
            </h3>
            <p className="text-gray-700">
              Indemnity, Limitation of Liability, Confidentiality, IP,
              Anti-Bribery, and Governing Law clauses survive termination.
            </p>
          </section>
          {/* Section 23: Anti-Bribery Compliance */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <FileText className="w-7 h-7 mr-3 text-blue-500" />
              Anti-Bribery Compliance
            </h3>
            <p className="text-gray-700">
              The Vendor agrees not to promote or carry out its obligations
              under this Agreement in violation of any extant anti-corruption
              law within the jurisdiction in which it carries on its business
              operations, including, without limitation, the Corrupt Practices
              and Other Related Offences Act, 2003, and similar anti-corruption
              statutes and codes of practice within all applicable
              jurisdictions.
            </p>
          </section>
          {/* Section 24: Non-Discrimination and Harassment */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <ShieldCheck className="w-7 h-7 mr-3 text-blue-500" />
              Non-Discrimination and Harassment
            </h3>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc ml-4 gap-2">
                <li>
                  The Parties recognize the right of their respective employees
                  to work in an environment free from Harassment and
                  discrimination. The Vendor further agrees to perform its
                  obligations under this Agreement in a manner that is free from
                  Harassment, discrimination, and retaliation.
                </li>
                <li>
                  The Vendor, its employees, agents, subcontractors, or any
                  person acting on behalf of the Vendor shall not engage in any
                  form of discrimination or Harassment based on race, color,
                  religion, sex, marital status, national origin, age,
                  disability, sexual orientation, gender identity, or any other
                  protected characteristic.{" "}
                </li>
                <li>
                  The Vendor shall promptly address any reports of
                  discrimination or Harassment from Vinkol Logistics and shall
                  take corrective action immediately, including but not limited
                  to changing its personnel where necessary.
                </li>
                <li>
                  The Vendor shall take appropriate measures to ensure that its
                  employees, subcontractors, and agents comply with this clause
                  and promote a respectful, inclusive, and non-hostile work
                  environment.
                </li>
                <li>
                  Any violation of this Clause may result in the immediate
                  suspension or termination of this Agreement.{" "}
                </li>
              </ul>
            </div>
          </section>
          {/* Section 25: ESG Compliance */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Gavel className="w-7 h-7 mr-3 text-blue-500" />
              ESG Compliance
            </h3>
            <p className="text-gray-700">
              The Vendor shall use commercially reasonable efforts to comply
              with all applicable Environmental, Social, and Governance (ESG)
              laws and regulations and shall foresee any known or expected
              future changes in requirements and take all reasonable actions to
              ensure ongoing compliance.
            </p>
          </section>
          {/* Section 26: Entire Agreement */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <FileText className="w-7 h-7 mr-3 text-blue-500" />
              Entire Agreement
            </h3>
            <p className="text-gray-700">
              This Agreement constitutes the entire agreement and understanding
              between the Parties with respect to the subject matter hereof and
              supersedes all prior understandings, representations, or
              agreements, whether written or oral, relating to such subject
              matter.
            </p>
          </section>
          {/* Section 27: Assignment */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <FileText className="w-7 h-7 mr-3 text-blue-500" />
              Assignment
            </h3>
            <p className="text-gray-700">
              The Vendor agrees not to assign this Agreement or any interest
              herein, either in whole or in part, without the prior written
              consent of Vinkol Logistics, which consent shall not be
              unreasonably withheld.
              <br />
              <br />
              Any purported assignment made in violation of this clause shall be
              null and void.
            </p>
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
