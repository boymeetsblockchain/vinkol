import { FaGooglePlay } from "react-icons/fa6";
import { AppStoreCard } from "../shared/appstore";
import { IoLogoApple } from "react-icons/io";
import { GiLightningElectron } from "react-icons/gi";

export const CTA = () => {
  return (
    <section className="h-auto w-full bg-blue-primary pt-10 px-10 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full gap-10 px-4 md:px-0">
        <div className="md:col-span-2">
          {/* call to action */}
          <div className="flex flex-col m1-10 justify-center items-center md:items-start px-4 text-white space-y-4">
            <button className="bg-[rgba(255,255,255,0.5)] opacity-50 text-sm py-2 px-3 rounded-full text-black flex items-center gap-x-3">
              <GiLightningElectron />
              Call to Action
            </button>
            <p className="text-2xl md:text-4xl  max-w-2xl font-semibold text-center md:text-left">
              Elevate Your Delivery Experience with Our Easy-to-Use Vinkol App
              Today!
            </p>
            <p className="text-base md:text-lg font-medium text-center md:text-left">
              Connect instantly with verified riders to deliver your goods or
              pick up purchases from any store.
            </p>
            <div className="mt-6 flex flex-row  items-start sm:items-center gap-4">
              <AppStoreCard
                platform="Google Play"
                icon={<FaGooglePlay color="black" size={24} />}
                link="https://play.google.com/store"
              />
              <AppStoreCard
                platform="App Store"
                icon={<IoLogoApple color="black" size={24} />}
                link="https://www.apple.com/app-store/"
              />
            </div>
          </div>
        </div>
        <div className="md:col-span-1 flex justify-center items-center">
          <img
            src="/assets/cta.png"
            className="w-full h-auto max-h-[300px] md:max-h-[400px] object-contain"
            alt="Call to Action"
          />
        </div>
      </div>
    </section>
  );
};
