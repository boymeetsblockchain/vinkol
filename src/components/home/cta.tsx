import { FaGooglePlay } from "react-icons/fa6";
import { IoLogoApple } from "react-icons/io";
import { AppStoreCard } from "../shared/appstore";
import { AnimateIn } from "../shared/animate-in";

export const CTA = () => {
  return (
    <section className="h-auto w-full bg-blue-primary pt-10 px-4 md:px-10 mx-auto overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full gap-10 max-w-screen-xl mx-auto">
        <AnimateIn direction="left" className="md:col-span-2">
          <div className="flex flex-col justify-center items-center md:items-start px-4 text-white space-y-4 py-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-200">
              Vinkol App
            </span>
            <h2 className="text-2xl md:text-4xl md:max-w-lg font-bold text-center md:text-left leading-snug">
              Book in seconds. Track in real time. Delivered today.
            </h2>
            <p className="text-base md:text-lg font-medium text-center md:text-left text-blue-100 max-w-md">
              The Vinkol app puts on-demand delivery, store browsing, and live tracking right in your pocket.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
              <AppStoreCard
                platform="Google Play"
                icon={<FaGooglePlay color="black" size={24} />}
                link="https://play.google.com/store/apps/details?id=app.vinkol.user"
              />
              <AppStoreCard
                platform="App Store"
                icon={<IoLogoApple color="black" size={24} />}
                link="https://apps.apple.com/ng/app/vinkol/id6751447117"
              />
            </div>
          </div>
        </AnimateIn>
        <AnimateIn
          direction="right"
          delay={0.15}
          className="md:col-span-1 flex justify-center items-end"
        >
          <img
            src="/assets/cta.png"
            className="w-full h-auto max-h-[320px] md:max-h-[420px] object-contain"
            alt="Vinkol mobile app interface"
          />
        </AnimateIn>
      </div>
    </section>
  );
};
