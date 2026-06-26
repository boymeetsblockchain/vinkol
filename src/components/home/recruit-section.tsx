import Link from "next/link";
import { Bike, ShoppingBag, ArrowRight } from "lucide-react";
import { AnimateIn } from "../shared/animate-in";

export const RecruitSection = () => {
  return (
    <section className="w-full bg-gray-950 py-16 md:py-24">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-20">
        <AnimateIn>
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              Join Our Network
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">
              Earn on your schedule.
            </h2>
            <p className="text-gray-400 mt-3 text-base max-w-lg mx-auto">
              200+ riders and shoppers already earning with Vinkol. Get started in under 20 minutes.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Become a Rider */}
          <AnimateIn direction="left">
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 flex flex-col h-full">
              <div className="w-12 h-12 bg-blue-primary/20 rounded-2xl flex items-center justify-center mb-5">
                <Bike className="text-blue-400" size={24} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Become a Rider</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                Pick up and deliver packages across your city. Set your own hours, accept orders when you want, and get paid directly.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0" aria-hidden="true" />
                  Flexible working hours
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0" aria-hidden="true" />
                  Per-delivery earnings — no salary cap
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0" aria-hidden="true" />
                  Approved in under 20 minutes
                </li>
              </ul>
              <Link
                href="/become-a-rider"
                className="inline-flex items-center gap-2 bg-blue-primary text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-blue-700 transition-colors w-fit"
                aria-label="Apply to become a Vinkol rider"
              >
                Start as a Rider <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </AnimateIn>

          {/* Become a Personal Shopper */}
          <AnimateIn direction="right" delay={0.1}>
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 flex flex-col h-full">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-5">
                <ShoppingBag className="text-emerald-400" size={24} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Become a Personal Shopper</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                Help customers buy and deliver groceries, gifts, and essentials. Accept shopping tasks on your schedule and earn per order.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0" aria-hidden="true" />
                  Shop for customers, earn per task
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0" aria-hidden="true" />
                  Work from any location you choose
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0" aria-hidden="true" />
                  Withdraw earnings anytime
                </li>
              </ul>
              <Link
                href="/become-a-personal-shopper"
                className="inline-flex items-center gap-2 bg-emerald-500 text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-emerald-600 transition-colors w-fit"
                aria-label="Apply to become a Vinkol personal shopper"
              >
                Start as a Shopper <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};
