export const Mission = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center gap-20 px-6 py-16 lg:py-20 lg:px-20 bg-white">
      {/* Text content */}

      {/* Image content */}
      <div
        style={{
          backgroundImage: `url('/assets/contact-about.jpg')`,
        }}
        className="h-[400px] bg-cover relative w-full object-contain  rounded-3xl bg-center flex items-center justify-center"
      >
        <img
          src="/assets/contact-about.jpg"
          alt="About Vinkol"
          className="w-64 h-48 object-contain z-10 border-4 absolute right-[-40px] border-white
           bg-black/60 abs rounded-3xl shadow-md"
        />
      </div>
      <div className="lg:w-1/2 text-gray-800 shrink-0">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Vinkol</h1>
        <p className="text-xs md:text-sm leading-relaxed">
          Vinkol Material and Commercial Ventures Limited is a Nigerian-founded
          company, officially incorporated on June 17, 2012. Operating at the
          intersection of service and commerce, Vinkol is driven by a mission to
          create jobs and deliver value through strategic ventures. In response
          to global logistics challenges—especially highlighted during the
          COVID-19 pandemic—Vinkol launched its specialized arm, Vinkol
          Logistics, in 2020. With a focus on efficiency, cost-effectiveness,
          and client satisfaction, Vinkol Logistics provides both domestic and
          international shipping solutions rooted in advanced technology,
          regulatory expertise, and a broad global network. From warehousing to
          customs compliance, Vinkol ensures every shipment arrives safely, on
          time, and with full transparency.
        </p>
      </div>
    </section>
  );
};
