import { Eye, Lock, MapPin, ShieldCheck, Truck } from "lucide-react";

function SecurityandPrivacy() {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-screen-lg mx-auto   rounded-xl p-8 sm:p-10 lg:p-12 ">
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
}
export default SecurityandPrivacy;
