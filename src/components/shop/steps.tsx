import { RiShoppingCart2Line, RiMapPinLine, RiMoneyDollarCircleLine } from "react-icons/ri";

const steps = [
  {
    icon: <RiShoppingCart2Line size={28} className="text-[var(--color-blue-primary)]" />,
    number: "01",
    title: "Create your profile",
    description:
      "Sign up and complete your shopper profile. Verification typically takes 24–48 hours before you go live.",
  },
  {
    icon: <RiMapPinLine size={28} className="text-[var(--color-blue-primary)]" />,
    number: "02",
    title: "Accept shopping tasks",
    description:
      "Browse tasks near you — grocery runs, store pickups, and specialty orders. Accept what works for your schedule.",
  },
  {
    icon: <RiMoneyDollarCircleLine size={28} className="text-[var(--color-blue-primary)]" />,
    number: "03",
    title: "Pick up, deliver, get paid",
    description:
      "Complete the order and hand it to the customer. Your earnings hit your wallet the same day, no waiting.",
  },
];

export const Steps = () => {
  return (
    <section className="w-full py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-4">
          How it works
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-14">
          Three steps to start earning.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-[#F7F8FA] rounded-2xl p-8 relative">
              <span className="absolute top-6 right-8 text-6xl font-black text-gray-100 select-none leading-none">
                {step.number}
              </span>
              <div className="h-14 w-14 rounded-2xl bg-[var(--color-blue-primary)]/10 flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
                Step {step.number}
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
