export const HowitWorks = () => {
  return (
    <section className="max-w-screen-2xl w-full p-10 md:p-20 mx-auto">
      <div>
        <h1 className="text-5xl text-black font-bold mb-10">
          How Vinkol Works
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="flex md:items-start items-center *: gap-y-4 flex-col">
          <img
            src="/assets/request.svg"
            alt="Request Icon"
            className="w-[68px] h-[68px]"
          />
          <h1 className="font-bold text-2xl text-center md:text-left">
            Request
          </h1>
          <p className="text-sm text-center md:text-left font-medium">
            Tell us what you need—pickup, delivery, or a personal shopper. Add
            the details, location, and time.
          </p>
        </div>

        <div className="hidden md:block w-[2px] h-full bg-gradient-to-b from-white via-blue-600 to-white mx-auto" />

        <div className="flex md:items-start items-center *: gap-y-4 flex-col">
          <img
            src="/assets/match.svg"
            alt="Match Icon"
            className="w-[68px] h-[68px]"
          />
          <h1 className="font-bold text-2xl text-center md:text-left">Match</h1>
          <p className="text-sm text-center md:text-left font-medium">
            We instantly match you with a nearby verified rider or shopper ready
            to help.
          </p>
        </div>

        <div className="hidden md:block w-[2px] h-full bg-gradient-to-b from-white via-blue-600 to-white mx-auto" />

        <div className="flex md:items-start items-center *: gap-y-4 flex-col">
          <img
            src="/assets/delivered.svg"
            alt="Delivered Icon"
            className="w-[68px] h-[68px]"
          />
          <h1 className="font-bold text-2xl text-center md:text-left">
            Delivered
          </h1>
          <p className="text-sm text-center md:text-left font-medium">
            Your item is picked up and delivered right to your door. Fast, safe,
            and tracked in real-time.
          </p>
        </div>
      </div>
    </section>
  );
};
