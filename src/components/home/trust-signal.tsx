const trustSignals = [
  "Verified & Background-Checked Riders",
  "Live Tracking & Notifications",
  "Instant Matching System",
  "Cash or Digital Payment Options",
  "Support 7 Days a Week",
];

export const Trust = () => {
  return (
    <section className="max-w-screen-2xl w-full px-4 py-10 md:px-20 md:py-20 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <img
          src="/assets/trust.jpg"
          alt="Trust Visual"
          className="w-full h-[250px] md:h-[400px] object-cover rounded-lg"
        />
        <div className="flex flex-col space-y-6 items-start justify-center">
          <h1 className="text-3xl md:text-5xl text-black font-bold">
            Trust Signals
          </h1>
          <ul className="space-y-4">
            {trustSignals.map((data, index) => (
              <li
                className="font-semibold text-sm md:text-2xl flex items-start md:items-center gap-2"
                key={index}
              >
                <img
                  src="/assets/star.svg"
                  alt=""
                  className="h-5 w-5 md:h-6 md:w-6"
                />
                {data}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
