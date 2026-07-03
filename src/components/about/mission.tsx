const missionArray = [
  "Speed and reliability in every delivery",
  "Advanced technology for real-time tracking",
  "Cost-effective solutions for customers and vendors",
  "Client-centric service, every single time",
];

export const Mission = () => {
  return (
    <section className="bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-20 items-center">
          <div className="relative h-[340px] md:h-[460px] rounded-2xl overflow-hidden">
            <img
              src="/assets/mission.jpg"
              alt="Vinkol mission"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-primary mb-5">
              What drives us
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
              Our Mission
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              At Vinkol Logistics, our mission is to deliver world-class logistics
              solutions that connect people, businesses, and markets with speed,
              precision, and purpose &mdash; ensuring every delivery adds value
              and builds trust.
            </p>
            <ul className="space-y-4">
              {missionArray.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-blue-primary flex items-center justify-center">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                    </svg>
                  </span>
                  <p className="text-gray-700 font-medium text-sm md:text-base">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
