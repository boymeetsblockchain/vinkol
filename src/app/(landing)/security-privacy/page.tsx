import { Eye, Lock, MapPin, ShieldCheck, Truck } from "lucide-react";

function SecurityandPrivacy() {
  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 md:px-20 py-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-3">Security</p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-3">Security &amp; Privacy</h1>
          <p className="text-gray-500 text-base">Your security and privacy are our top priorities at Vinkol.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-20 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12">
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[var(--color-blue-primary)]" /> Data Security
            </h3>
            <ul className="list-disc list-inside space-y-2 text-base text-gray-700 mb-8">
              <li>Vinkol uses SSL encryption and secure servers to protect all data transmissions.</li>
              <li>Our platform is built with industry-standard firewalls and security protocols to safeguard personal and financial information.</li>
              <li>Regular security audits and vulnerability assessments help ensure our systems remain secure.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[var(--color-blue-primary)]" /> Privacy Protection
            </h3>
            <ul className="list-disc list-inside space-y-2 text-base text-gray-700 mb-8">
              <li>We collect only the information necessary to provide our services — such as contact details, delivery addresses, and order specifics.</li>
              <li>Your data is never sold or shared with third parties for marketing purposes.</li>
              <li>You control your data — easily update or request deletion through your account dashboard or by contacting support.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-[var(--color-blue-primary)]" /> Package Safety
            </h3>
            <ul className="list-disc list-inside space-y-2 text-base text-gray-700 mb-8">
              <li>All deliveries are handled by vetted and trained Vinkol riders.</li>
              <li>Our self-retention insurance coverage ensures compensation for verified cases of loss, damage, or theft attributable to Vinkol's operations.</li>
              <li>Real-time tracking allows you to monitor your package from dispatch to delivery.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-400" /> Your Role in Security
            </h3>
            <ul className="list-disc list-inside space-y-2 text-base text-gray-700 mb-8">
              <li>Keep login credentials confidential.</li>
              <li>Report any suspicious activity or unauthorized access immediately.</li>
              <li>Ensure accurate delivery information to prevent misdeliveries.</li>
            </ul>

            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <ShieldCheck className="w-8 h-8 text-[var(--color-blue-primary)]" strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900">Our Commitment</h3>
              </div>
              <p className="text-base text-gray-600 max-w-xl mx-auto">
                We are dedicated to continuous improvement. Vinkol updates its security measures
                regularly to counter emerging threats and enhance your privacy. Your trust fuels our innovation.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default SecurityandPrivacy;
