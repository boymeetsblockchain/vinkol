export const AboutVinkol = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-20 py-20 md:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-20 items-center">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-primary mb-5">
            Who we are
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
            Vinkol
          </h2>
          <p className="text-gray-500 text-base leading-relaxed mb-6">
            Vinkol Material and Commercial Ventures Limited is a Nigerian-founded
            company, officially incorporated on June 17, 2012. Operating at the
            intersection of service and commerce, Vinkol is driven by a mission
            to create jobs and deliver value through strategic ventures.
          </p>
          <p className="text-gray-500 text-base leading-relaxed">
            In response to global logistics challenges &mdash; especially
            highlighted during the COVID-19 pandemic &mdash; Vinkol launched its
            specialized arm, Vinkol Logistics, in 2020. With a focus on
            efficiency, cost-effectiveness, and client satisfaction, we provide
            on-demand delivery solutions rooted in technology, accountability,
            and genuine care for every customer.
          </p>
        </div>
        <div className="order-1 lg:order-2">
          <img
            src="/assets/about.jpg"
            alt="About Vinkol"
            className="w-full h-[320px] md:h-[460px] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};
