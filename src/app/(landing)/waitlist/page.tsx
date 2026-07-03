import { RiderWaitlistForm } from "@/components/waitlist/rider-waitlist-form";
import { LuBike, LuBadgeCheck, LuTrendingUp, LuShield } from "react-icons/lu";

const perks = [
  {
    icon: LuBike,
    title: "Branded equipment",
    detail: "Receive a company-branded Vinkol bike and rider kit — no upfront cost.",
  },
  {
    icon: LuTrendingUp,
    title: "Priority assignments",
    detail: "Internal riders get first access to high-value, time-sensitive delivery jobs.",
  },
  {
    icon: LuShield,
    title: "Rider insurance",
    detail: "Covered for on-the-job incidents. Ride with confidence, every day.",
  },
  {
    icon: LuBadgeCheck,
    title: "Dedicated support",
    detail: "A dedicated operations team available to assist you throughout your shifts.",
  },
];

function WaitlistPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      {/* Hero */}
      <section
        className="relative min-h-[420px] bg-cover bg-center flex items-end"
        style={{ backgroundImage: "url('/assets/trust.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/25" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20 pb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-blue-400" />
            Internal Rider Program
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
            Ride with Vinkol — on the inside.
          </h1>
          <p className="mt-4 text-white/80 text-base max-w-xl">
            Join our premium internal rider fleet. Get branded equipment, priority orders, and daily earnings from day one.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-14">
            {perks.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-gray-100">
                <span className="h-10 w-10 rounded-xl bg-[var(--color-blue-primary)]/10 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-[var(--color-blue-primary)]" />
                </span>
                <p className="text-sm font-bold text-gray-900 mb-2">{title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          {/* Form section */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12">
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-3">
                Apply now
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Join the internal rider waitlist.
              </h2>
              <p className="text-gray-500 text-sm max-w-lg">
                Fill in accurate details for fastest processing. Our rider operations team will review your application and reach out within 48 hours.
              </p>
            </div>
            <RiderWaitlistForm />
          </div>
        </div>
      </section>
    </main>
  );
}

export default WaitlistPage;
