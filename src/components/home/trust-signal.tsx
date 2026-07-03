const trustSignals = [
  {
    label: "Verified & background-checked riders",
    detail: "Every rider is screened before they go live on the platform.",
  },
  {
    label: "Real-time GPS tracking",
    detail: "Watch your package move from pickup to your door.",
  },
  {
    label: "Instant rider matching",
    detail: "Connected to a nearby rider in under 5 minutes.",
  },
  {
    label: "Cash and digital payments",
    detail: "Pay however works best for you.",
  },
  {
    label: "7-day customer support",
    detail: "Real humans available every day of the week.",
  },
  {
    label: "Up to ₦50,000 item protection",
    detail: "Claims resolved within 72 hours, no arguments.",
  },
];

export const Trust = () => {
  return (
    <section className="max-w-7xl w-full px-6 py-12 md:px-20 md:py-16 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="order-2 md:order-1">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-primary mb-4">
            Built on trust
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
            Delivery you can<br />actually trust
          </h2>
          <p className="text-gray-500 text-base md:text-lg mb-10 leading-relaxed">
            We do not cut corners on who we put in your community. Every rider
            is verified, rated, and accountable.
          </p>
          <ul className="space-y-5">
            {trustSignals.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-blue-primary flex items-center justify-center">
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm md:text-base">{item.label}</p>
                  <p className="text-gray-500 text-xs md:text-sm mt-0.5">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 md:order-2">
          <img
            src="/assets/trust.jpg"
            alt="Vinkol rider handing over a package"
            className="w-full h-[280px] md:h-[480px] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};
