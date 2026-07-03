import { FaGooglePlay } from "react-icons/fa6";
import { AppStoreCard } from "../shared/appstore";
import { IoLogoApple } from "react-icons/io";

export const CTA = () => {
  return (
    <section className="w-full bg-blue-primary">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 py-20 md:px-20 md:py-24">
        <div className="flex flex-col gap-6 text-white">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-200">
            Ready to start?
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Download the Vinkol Go app.
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-md">
            Accept delivery tasks, track your earnings, and get paid &mdash;
            all from the Vinkol Go rider app on Android and iOS.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-3 pt-2">
            <AppStoreCard
              platform="Google Play"
              icon={<FaGooglePlay color="black" size={20} />}
              link="https://play.google.com/store/apps/details?id=app.vinkol.rider"
            />
            <AppStoreCard
              platform="App Store"
              icon={<IoLogoApple color="black" size={20} />}
              link="https://apps.apple.com/ng/app/vinkol-go/id6751474425"
            />
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src="/assets/cta.png"
            className="w-full h-auto max-h-[320px] md:max-h-[440px] object-contain"
            alt="Vinkol Go app"
          />
        </div>
      </div>
    </section>
  );
};
