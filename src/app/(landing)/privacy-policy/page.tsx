import React from "react";
import {
  CheckCircle,
  Edit,
  UserCheck,
  Gavel,
  Truck,
  Handshake,
  Wallet,
  DollarSign,
  Headphones,
  MessageSquare,
  Shield,
  Mail,
  Phone,
  Globe,
} from "lucide-react";

// Main App component that renders the Legal & Policy page
const PrivacyPolicy = () => {
  const effectiveDate = "01 01 2025"; // Placeholder for effective date

  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 md:px-20 py-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-3">Legal</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-3">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Effective date: January 1, 2025</p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-6 md:px-20 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12">
          {/* Section 1: TERMS & POLICY */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Gavel className="w-7 h-7 mr-3 text-blue-primary" />
              1. TERMS & POLICY
            </h3>
            <div className="space-y-4">
              <PolicyPoint
                icon={<CheckCircle className="w-5 h-5 text-green-500" />}
                title="1.1 Acceptance of Terms"
                content="By accessing or using the Vinkol website, app, or services, you agree to be bound by these Terms & Policy. If you do not agree, you must discontinue use of the platform immediately."
              />
              <PolicyPoint
                icon={<Edit className="w-5 h-5 text-purple-500" />}
                title="1.2 Modification of Terms"
                content="Vinkol reserves the right to update or modify these terms at any time without prior notice. Continued use of the platform after changes constitutes your acceptance of the new terms."
              />
              <PolicyPoint
                icon={<UserCheck className="w-5 h-5 text-indigo-500" />}
                title="1.3 Eligibility"
                content="You must be at least 18 years old and legally authorized to enter binding contracts in Nigeria or your country of residence."
              />
              <PolicyPoint
                icon={<Globe className="w-5 h-5 text-cyan-500" />}
                title="1.4 Governing Law"
                content="These terms are governed by the laws of the Federal Republic of Nigeria. Disputes shall be settled through arbitration in Lagos, Nigeria."
              />
            </div>
          </section>

          {/* Section 2: TERMS OF SERVICE */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Handshake className="w-7 h-7 mr-3 text-blue-primary" />
              2. TERMS OF SERVICE
            </h3>
            <div className="space-y-4">
              <PolicyPoint
                icon={<Truck className="w-5 h-5 text-orange-500" />}
                title="2.1 Nature of Services"
                content={
                  <>
                    Vinkol operates as a B2B courier logistics platform enabling
                    businesses and logistics partners to send, track, and insure
                    small packages. Services include:
                    <ul className="list-disc list-inside mt-2 ml-4 text-gray-700 space-y-1">
                      <li>Real-time delivery tracking</li>
                      <li>Integrated logistics marketplace</li>
                      <li>Self-retention insurance coverage</li>
                      <li>Commission-based service matching</li>
                      <li>Basic product support</li>
                    </ul>
                  </>
                }
              />
              <PolicyPoint
                icon={<Users className="w-5 h-5 text-teal-500" />}
                title="2.2 Roles and Responsibilities"
                content={
                  <>
                    <h4 className="font-semibold text-gray-800 mt-2 mb-1">
                      2.2.1 Vinkol
                    </h4>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                      <li>
                        Acts as a platform provider and not as a courier
                        service.
                      </li>
                      <li>
                        Provides access to tools for logistics tracking,
                        communication, and insurance.
                      </li>
                      <li>
                        Facilitates payments and escrow (if applicable) for
                        deliveries.
                      </li>
                    </ul>
                    <h4 className="font-semibold text-gray-800 mt-2 mb-1">
                      2.2.2 Courier Partners
                    </h4>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                      <li>
                        Must comply with all Nigerian transport regulations.
                      </li>
                      <li>
                        Are solely responsible for the safety and timeliness of
                        deliveries.
                      </li>
                      <li>
                        Must maintain required insurance or agree to platform
                        coverage terms.
                      </li>
                    </ul>
                    <h4 className="font-semibold text-gray-800 mt-2 mb-1">
                      2.2.3 Business Users
                    </h4>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                      <li>Must provide accurate shipment details.</li>
                      <li>
                        Are responsible for payment for completed deliveries.
                      </li>
                      <li>Must not ship prohibited or dangerous items.</li>
                    </ul>
                  </>
                }
              />
              <PolicyPoint
                icon={<Wallet className="w-5 h-5 text-green-600" />}
                title="2.3 Payment and Fees"
                content={
                  <>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>
                        A commission is charged on each successful delivery
                        facilitated via the platform.
                      </li>
                      <li>
                        Payments must be made via approved methods (wallet,
                        debit card, or transfer).
                      </li>
                      <li>
                        Vinkol reserves the right to withhold funds for up to 7
                        business days for security and fraud checks.
                      </li>
                    </ul>
                  </>
                }
              />
              <PolicyPoint
                icon={<DollarSign className="w-5 h-5 text-red-500" />}
                title="2.4 Cancellation and Refunds"
                content={
                  <>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>
                        Deliveries canceled before pickup may be refunded
                        subject to a 5% processing fee.
                      </li>
                      <li>
                        No refunds after dispatch unless courier partner is at
                        fault.
                      </li>
                      <li>
                        Insurance claims must follow outlined procedures in the
                        Product Support section.
                      </li>
                    </ul>
                  </>
                }
              />
            </div>
          </section>

          {/* Section 3: PRODUCT SUPPORT */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Headphones className="w-7 h-7 mr-3 text-blue-primary" />
              3. PRODUCT SUPPORT
            </h3>
            <div className="space-y-4">
              <PolicyPoint
                icon={<Clock className="w-5 h-5 text-gray-500" />}
                title="3.1 Service Hours"
                content="Support is available Monday to Saturday, 8:00 AM to 6:00 PM (WAT), via chat, email, and phone."
              />
              <PolicyPoint
                icon={<MessageSquare className="w-5 h-5 text-yellow-500" />}
                title="3.2 Delivery Disputes"
                content={
                  <>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Report issues within 24 hours of delivery.</li>
                      <li>
                        Submit supporting documentation (photos, signed waybill,
                        etc.).
                      </li>
                      <li>
                        Vinkol will mediate, but final decisions rest with the
                        partner policy.
                      </li>
                    </ul>
                  </>
                }
              />
              <PolicyPoint
                icon={<Shield className="w-5 h-5 text-blue-primary" />}
                title="3.3 Vinkol Self-Retention Coverage"
                content={
                  <>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>
                        Coverage limited to NGN 50,000 per package unless
                        otherwise stated.
                      </li>
                      <li>
                        Claims must be submitted within 3 days of incident.
                      </li>
                      <li>
                        Required: proof of dispatch, recipient complaint, item
                        value documentation.
                      </li>
                      <li>Claim decisions issued within 7 business days.</li>
                    </ul>
                  </>
                }
              />
              <PolicyPoint
                icon={<BriefcaseBusiness className="w-5 h-5 text-blue-400" />}
                title="3.4 Partner Onboarding Support"
                content={
                  <>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>
                        Courier and merchant partners receive onboarding guides
                        and training modules.
                      </li>
                      <li>
                        Performance monitoring may lead to delisting for
                        repeated violations.
                      </li>
                    </ul>
                  </>
                }
              />
            </div>
          </section>

          {/* Section 4: SECURITY & PRIVACY */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Lock className="w-7 h-7 mr-3 text-blue-primary" />
              4. SECURITY & PRIVACY
            </h3>
            <div className="space-y-4">
              <PolicyPoint
                icon={<Database className="w-5 h-5 text-gray-600" />}
                title="4.1 Data Collection"
                content={
                  <>
                    We collect the following user data:
                    <ul className="list-disc list-inside mt-2 ml-4 text-gray-700 space-y-1">
                      <li>
                        Personal identification (name, phone number, email)
                      </li>
                      <li>Location data (for live tracking)</li>
                      <li>
                        Payment information (secured via PCI-compliant
                        processors)
                      </li>
                      <li>Package and order details</li>
                    </ul>
                  </>
                }
              />
              <PolicyPoint
                icon={<BarChart className="w-5 h-5 text-green-500" />}
                title="4.2 Data Use"
                content={
                  <>
                    Your data is used to:
                    <ul className="list-disc list-inside mt-2 ml-4 text-gray-700 space-y-1">
                      <li>Facilitate service delivery</li>
                      <li>Improve platform performance</li>
                      <li>Comply with regulatory requirements</li>
                      <li>
                        Communicate updates and promotions (opt-out available)
                      </li>
                    </ul>
                  </>
                }
              />
              <PolicyPoint
                icon={<ShieldCheck className="w-5 h-5 text-blue-primary" />}
                title="4.3 Data Protection"
                content={
                  <>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>All user data is stored on encrypted servers.</li>
                      <li>TLS encryption is used for all transactions.</li>
                      <li>
                        Only authorized personnel have access to sensitive data.
                      </li>
                    </ul>
                  </>
                }
              />
              <PolicyPoint
                icon={<Share2 className="w-5 h-5 text-purple-500" />}
                title="4.4 Third-Party Sharing"
                content={
                  <>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>
                        We may share data with verified logistics and payment
                        providers for service fulfillment.
                      </li>
                      <li>We do not sell user data to third parties.</li>
                    </ul>
                  </>
                }
              />
              <PolicyPoint
                icon={<BellRing className="w-5 h-5 text-red-500" />}
                title="4.5 Breach Notification"
                content="In case of a data breach, users will be notified within 72 hours via email and platform notifications."
              />
            </div>
          </section>

          {/* Section 5: LIMITATION OF LIABILITY */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Scale className="w-7 h-7 mr-3 text-blue-primary" />
              5. LIMITATION OF LIABILITY
            </h3>
            <div className="space-y-2 text-gray-700">
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Vinkol shall not be liable for any indirect or consequential
                  damages.
                </li>
                <li>
                  Vinkol shall not be liable for delivery delays or failures
                  caused by courier partners.
                </li>
                <li>
                  Vinkol shall not be liable for loss or damage exceeding the
                  insurance claim cap (unless explicitly covered).
                </li>
                <li>
                  Vinkol shall not be liable for user negligence or inaccurate
                  data entry.
                </li>
                <li>
                  Vinkol shall not be liable for loss or damage exceeding the
                  approved claim cap (unless explicitly covered)
                </li>
              </ul>
            </div>
          </section>

          {/* Section 6: TERMINATION */}
          <section className="mb-8 border-b pb-6 border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Power className="w-7 h-7 mr-3 text-blue-primary" />
              6. TERMINATION
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>Vinkol may suspend or terminate accounts that:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Engage in fraudulent or suspicious activity</li>
                <li>Violate these terms or applicable laws</li>
                <li>Are inactive for more than 6 months (with notification)</li>
              </ul>
            </div>
          </section>

          {/* Section 7: CONTACT */}
          <section className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-5 flex items-center">
              <Send className="w-7 h-7 mr-3 text-blue-primary" />
              7. CONTACT
            </h3>
            <div className="space-y-4 text-gray-700">
              <p>Questions, claims, or complaints can be directed to:</p>
              <p className="font-semibold text-lg text-blue-800">
                Vinkol Support Team
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-blue-primary" />
                  <span className="font-medium">Email:</span>
                  <a
                    href="mailto:support@vinkol.ng"
                    className="ml-2 text-blue-600 hover:underline"
                  >
                    support@vinkol.ng
                  </a>
                  ,
                  <a
                    href="mailto:info@vinkol.ng"
                    className="ml-2 text-blue-600 hover:underline"
                  >
                    info@vinkol.ng
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-blue-primary" />
                  <span className="font-medium">Phone:</span>
                  <a
                    href="tel:+2349039106561"
                    className="ml-2 text-blue-600 hover:underline"
                  >
                    +2348033670745
                  </a>
                </li>
                <li className="flex items-center">
                  <Globe className="w-5 h-5 mr-3 text-blue-primary" />
                  <span className="font-medium">Website:</span>
                  <a
                    href="https://www.vinkol.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-600 hover:underline"
                  >
                    www.vinkol.ng
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      <footer className="max-w-4xl mx-auto px-6 md:px-20 mt-6 mb-12 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Vinkol Platform. All rights reserved.</p>
      </footer>
    </main>
  );
};

// Reusable component for a single policy point
type PolicyPointProps = {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
};

const PolicyPoint: React.FC<PolicyPointProps> = ({ icon, title, content }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mt-1 mr-3">{icon}</div>
    <div>
      <h4 className="text-lg font-semibold text-gray-800 mb-1">{title}</h4>
      <div className="text-gray-700 text-base">{content}</div>
    </div>
  </div>
);

// Lucide React Icons (imported for clarity, normally imported individually)
// These are not all used, but keeping them here for easy reference in case of future expansion.
const Users = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-users"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const Clock = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-clock"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const BriefcaseBusiness = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-briefcase-business"
  >
    <path d="M12 12h.01" />
    <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <path d="M22 13a18.15 18.15 0 0 1-20 0" />
    <rect width="20" height="14" x="2" y="6" rx="2" />
  </svg>
);
const Lock = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-lock"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const Database = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-database"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </svg>
);
const BarChart = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-bar-chart"
  >
    <line x1="12" x2="12" y1="20" y2="10" />
    <line x1="18" x2="18" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="16" />
  </svg>
);
const ShieldCheck = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-shield-check"
  >
    <path d="M20 13c-.7-.6-1.5-1-2.3-1H6.3C5.5 12 4.7 12.4 4 13L2 9.5V5l10-4 10 4v4.5l-2 3.5Z" />
    <path d="m9 18 2 2 4-4" />
  </svg>
);
const Share2 = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-share-2"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
  </svg>
);
const BellRing = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-bell-ring"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.36 10.36a10.93 10.93 0 0 1 .63-4.36" />
    <path d="M12 22c-1.1 0-2-.9-2-2h4c0 .9-.9 2-2 2" />
  </svg>
);
const Scale = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-scale"
  >
    <path d="m16 16 3-3a1 1 0 0 0 0-1.42l-2-2a1 1 0 0 0-1.42 0L12 12" />
    <path d="m8 8-3 3a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0L12 12" />
    <path d="M12 3v18" />
    <path d="M19 19H5" />
  </svg>
);
const Power = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-power"
  >
    <path d="M12 2v10" />
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
  </svg>
);
const Send = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-send"
  >
    <path d="m22 2-7 20-4-9-9-4 20-7Z" />
    <path d="M15 15 22 2" />
  </svg>
);
const CalendarDays = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-calendar-days"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);

export default PrivacyPolicy;
