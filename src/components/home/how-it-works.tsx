const steps = [
  {
    number: "01",
    icon: "/assets/request.svg",
    title: "Request",
    description:
      "Tell us what you need — pickup, delivery, or a personal shopper. Add the details, location, and time.",
  },
  {
    number: "02",
    icon: "/assets/match.svg",
    title: "Match",
    description:
      "We match you with a nearby verified rider or shopper in under 5 minutes.",
  },
  {
    number: "03",
    icon: "/assets/delivered.svg",
    title: "Delivered",
    description:
      "Your item arrives at your door. Fast, safe, and tracked in real-time every step of the way.",
  },
];

export const HowitWorks = () => {
  return (
    <section className="bg-[#0a0a0a] w-full py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-20">

        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-4">
            How it works
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Three steps. No stress.
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-white/[0.04] border border-white/10 rounded-2xl p-8 overflow-hidden group hover:border-white/20 transition-colors"
            >
              {/* Watermark number */}
              <span className="absolute -top-5 -right-3 text-[100px] font-black text-white/[0.04] leading-none select-none pointer-events-none">
                {step.number}
              </span>

              {/* Step label */}
              <p className="text-[var(--color-blue-primary)] text-xs font-bold tracking-[0.2em] uppercase mb-6">
                Step {step.number}
              </p>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-blue-primary)]/15 flex items-center justify-center mb-6 group-hover:bg-[var(--color-blue-primary)]/25 transition-colors">
                <img src={step.icon} alt={step.title} className="w-7 h-7" />
              </div>

              {/* Text */}
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{step.description}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-[var(--color-blue-primary)] transition-all duration-500 rounded-b-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
