import { CheckCircle2 } from "lucide-react";
import { AnimateIn } from "../shared/animate-in";

const trustSignals = [
  {
    claim: "Verified & Background-Checked Riders",
    detail: "Every rider passes identity verification before their first delivery.",
  },
  {
    claim: "Live Tracking & Instant Notifications",
    detail: "Know exactly where your package is from pickup to doorstep.",
  },
  {
    claim: "₦50,000 Refund Guarantee",
    detail: "Damage or loss due to rider negligence? We resolve your claim within 72 hours.",
  },
  {
    claim: "OTP-Confirmed Delivery",
    detail: "Your package is only released to the right hands — every single time.",
  },
  {
    claim: "7-Day Support, Always Available",
    detail: "Questions? Our support team is available every day of the week.",
  },
];

export const Trust = () => {
  return (
    <section className="max-w-screen-2xl w-full px-4 py-10 md:px-20 md:py-20 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <AnimateIn direction="left">
          <img
            src="/assets/trust.jpg"
            alt="A Vinkol rider preparing a delivery"
            className="w-full h-[250px] md:h-[440px] object-cover rounded-2xl"
          />
        </AnimateIn>
        <AnimateIn
          direction="right"
          delay={0.1}
          className="flex flex-col space-y-6 items-start justify-center"
        >
          <div>
            <h2 className="text-3xl md:text-5xl text-black font-bold mb-2">
              Why Thousands Trust Vinkol
            </h2>
            <p className="text-gray-500 text-base">
              Not just claims — real commitments with accountability built in.
            </p>
          </div>
          <ul className="space-y-5 w-full">
            {trustSignals.map((item) => (
              <li
                key={item.claim}
                className="flex items-start gap-3"
              >
                <CheckCircle2
                  className="text-blue-primary shrink-0 mt-0.5"
                  size={22}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm md:text-base">
                    {item.claim}
                  </p>
                  <p className="text-gray-500 text-sm mt-0.5">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </AnimateIn>
      </div>
    </section>
  );
};
