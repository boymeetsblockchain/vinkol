import { FaGooglePlay } from "react-icons/fa6";
import { IoLogoApple } from "react-icons/io";
import { Star } from "lucide-react";

export const CTA = () => {
  return (
    <section className="w-full bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 py-20 md:px-20 md:py-24 relative">

        {/* Decorative glow */}
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[var(--color-blue-primary)]/15 blur-[80px] pointer-events-none" />

        {/* Left — text */}
        <div className="relative flex flex-col gap-7">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)]">
            Get the app
          </p>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white">
            Deliveries in your<br />
            <span className="text-[var(--color-blue-primary)]">pocket.</span>
          </h2>

          <p className="text-white/55 text-base leading-relaxed max-w-sm">
            Book deliveries, track packages, and shop from stores — all from your phone. Available on Android and iOS.
          </p>

          {/* Rating badge */}
          <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-fit">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white/70 text-sm font-medium">4.8 · 2,000+ ratings</span>
          </div>

          {/* Store buttons */}
          <div className="flex flex-row flex-wrap gap-3">
            <a
              href="https://play.google.com/store/apps/details?id=app.vinkol.user"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white text-black rounded-2xl px-5 py-3.5 hover:opacity-90 transition group w-fit"
            >
              <FaGooglePlay size={22} />
              <div>
                <p className="text-[10px] text-gray-500 leading-none mb-0.5">Get it on</p>
                <p className="font-bold text-sm leading-none">Google Play</p>
              </div>
            </a>
            <a
              href="https://apps.apple.com/ng/app/vinkol/id6751447117"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white text-black rounded-2xl px-5 py-3.5 hover:opacity-90 transition group w-fit"
            >
              <IoLogoApple size={24} />
              <div>
                <p className="text-[10px] text-gray-500 leading-none mb-0.5">Download on the</p>
                <p className="font-bold text-sm leading-none">App Store</p>
              </div>
            </a>
          </div>

          <p className="text-white/25 text-xs">Also available on web — no download needed.</p>
        </div>

        {/* Right — phone mockup */}
        <div className="flex justify-center md:justify-end relative">
          <div className="absolute inset-0 bg-[var(--color-blue-primary)]/10 blur-[60px] rounded-full pointer-events-none" />
          <img
            src="/assets/cta.png"
            className="relative w-full h-auto max-h-[400px] md:max-h-[500px] object-contain drop-shadow-2xl"
            alt="Vinkol app on a phone"
          />
        </div>
      </div>
    </section>
  );
};
