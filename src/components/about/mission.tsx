const missionArray = [
  "Ensuring Speed and Reliability",
  "Leveraging Advanced Technology",
  "Offering Cost-Effective Solutions",
  "Championing Client-Centric Service",
];
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
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Our Mission</h1>
        <p className="text-xs mb-4 md:text-sm leading-relaxed">
          At Vinkol Logistics, our mission is to deliver world-class logistics
          solutions that connect people, businesses, and markets with speed,
          precision, and purpose. We are driven by a commitment to service
          excellence, technological innovation, and social
          responsibility—ensuring every delivery adds value and builds trus
        </p>
        <div>
          <p className="text-xs mb-2 md:text-sm leading-relaxed">
            We achieve this by:
          </p>
          <ul>
            {missionArray.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-x-2 text-xs mb-2 md:text-sm"
              >
                <img src="/assets/check.svg" className="h-5 w-5" alt="" />{" "}
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
