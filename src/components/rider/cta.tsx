import { FaGooglePlay } from "react-icons/fa6";
import { AppStoreCard } from "../shared/appstore";
import { IoLogoApple } from "react-icons/io";

export const CTA = () => {
  return (
    <section className="h-auto w-full bg-blue-primary pt-10 px-4  md:px-10  mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full gap-10 px-4 md:px-0">
        <div className="md:col-span-2">
          {/* call to action */}
          <div className="flex flex-col m1-10 justify-center items-center md:items-start px-4 text-white space-y-4">
            <p className="text-2xl md:text-4xl  md:max-w-2xl sm:w-full font-semibold text-center md:text-left">
              Drive Your Income Forward. Ride with Vinkol Today!
            </p>
            <p className="text-base md:text-lg font-medium text-center md:text-left">
              Stop waiting for calls. Connect instantly to a wide network of
              users needing reliable transport for their goods and purchases.
              Download the Vinkol Go App and start accepting jobs immediately.
            </p>
            <div className="mt-6 flex flex-col md:flex-row  items-start sm:items-center gap-4">
              <AppStoreCard
                platform="Google Play"
                icon={<FaGooglePlay color="black" size={24} />}
                link="https://play.google.com/store/apps/details?id=app.vinkol.rider"
              />
              <AppStoreCard
                platform="App Store"
                icon={<IoLogoApple color="black" size={24} />}
                link="https://apps.apple.com/ng/app/vinkol-go/id6751474425"
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
