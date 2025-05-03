import { GoArrowUpRight } from "react-icons/go";

export const Deliver = () => {
  return (
    <section className="w-full relative">
      {/* Black section */}
      <div className="bg-black w-full py-16 md:py-0">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-4 h-auto md:h-[80vh]">
          {/* Text section */}
          <div className="max-w-2xl text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[90px] text-white font-bold leading-tight">
              Deliver your every product with Vinkol
            </h1>

            <div className="w-full md:w-3/4 space-y-4 my-6 mx-auto md:mx-0">
              <p className="font-bold text-white text-base sm:text-lg">
                Get in Touch with Us
              </p>
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border-2 border-white w-full rounded-full py-3 px-5 pr-12 bg-transparent text-white placeholder:text-white placeholder:font-bold"
                />
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-primary absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                  <GoArrowUpRight color="white" />
                </div>
              </div>
            </div>
          </div>

          {/* Image section */}
          <div className="mt-10 md:mt-0 flex justify-center items-end h-full">
            <img
              src="/assets/3d.png"
              alt="3D Delivery Illustration"
              className="h-64 sm:h-80 md:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* White section */}
      <div className="bg-white w-full py-8">
        <div className="flex justify-center items-center h-full">
          {/* Optional centered delivery text or CTA */}
        </div>
      </div>
    </section>
  );
};
