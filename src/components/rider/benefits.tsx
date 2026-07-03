const benefits = [
  {
    label: "Flexible hours",
    detail: "Work when you want. No fixed shifts, no penalties for time off.",
  },
  {
    label: "Fast payouts",
    detail: "Daily or weekly earnings transferred directly to your bank account.",
  },
  {
    label: "No vehicle? No problem.",
    detail: "Personal shoppers can earn without owning a motorcycle.",
  },
  {
    label: "Tasks near you",
    detail: "Accept jobs in your area. No long-distance or forced assignments.",
  },
  {
    label: "Rider insurance coverage",
    detail: "We take care of our riders. Coverage included for verified members.",
  },
  {
    label: "Dedicated rider support",
    detail: "A real support team available 7 days a week.",
  },
];

interface BenefitsProps {
  title?: string;
}

export const Benefits = ({ title = "What you get as a Vinkol rider." }: BenefitsProps) => {
  return (
    <section className="bg-[#0a0a0a]">
      <div className="max-w-7xl w-full px-6 py-20 md:px-20 md:py-24 mx-auto">
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-primary mb-4">
            Why join us
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {benefits.map((item, index) => (
            <div key={index} className="bg-white/5 border border-white/8 rounded-2xl p-7 space-y-3">
              <span className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-primary flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                </svg>
              </span>
              <p className="font-semibold text-white text-base">{item.label}</p>
              <p className="text-white/50 text-sm leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
