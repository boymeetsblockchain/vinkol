import Link from "next/link";
import { Store, Package2, ArrowRight } from "lucide-react";
import { AnimateIn } from "../shared/animate-in";

export const BusinessSection = () => {
  return (
    <section className="max-w-screen-2xl w-full px-4 py-10 md:px-20 md:py-20 mx-auto">
      <AnimateIn>
        <div className="mb-10 text-center md:text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-primary">
            For Businesses
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-black mt-2">
            Power your business with Vinkol
          </h2>
          <p className="text-gray-500 mt-3 text-base max-w-xl">
            From your corner shop to enterprise logistics — we have the tools and network to move what matters.
          </p>
        </div>
      </AnimateIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Register Store card */}
        <AnimateIn direction="left">
          <div className="group relative h-full bg-blue-primary rounded-3xl p-8 text-white overflow-hidden flex flex-col justify-between min-h-[280px]">
            {/* Background decoration */}
            <div
              className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Store size={24} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Register Your Store</h3>
              <p className="text-blue-100 text-base leading-relaxed max-w-sm">
                List your products, receive orders, and let Vinkol handle delivery. Get customers from day one — no upfront cost.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-blue-100">
                <li>✓ Free to list your store</li>
                <li>✓ Integrated delivery on every order</li>
                <li>✓ Get paid directly to your bank</li>
              </ul>
            </div>
            <Link
              href="/shop"
              className="relative z-10 mt-8 inline-flex items-center gap-2 bg-white text-blue-primary font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-blue-50 transition-colors w-fit"
              aria-label="Register your store on Vinkol"
            >
              Register Your Store <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </AnimateIn>

        {/* Bulk Delivery card */}
        <AnimateIn direction="right" delay={0.1}>
          <div className="group h-full bg-gray-900 rounded-3xl p-8 text-white overflow-hidden flex flex-col justify-between min-h-[280px] relative">
            <div
              className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Package2 size={24} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Bulk Deliveries</h3>
              <p className="text-gray-300 text-base leading-relaxed max-w-sm">
                One pickup location, multiple dropoffs. Submit a single order and we handle the rest — at scale, on time.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-gray-400">
                <li>✓ One invoice for all deliveries</li>
                <li>✓ Same-day across supported cities</li>
                <li>✓ Real-time tracking per recipient</li>
              </ul>
            </div>
            <Link
              href="/bulk-delivery"
              className="relative z-10 mt-8 inline-flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors w-fit"
              aria-label="Get a bulk delivery quote"
            >
              Get a Quote <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
};
