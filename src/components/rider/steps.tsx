const steps = [
  {
    number: "01",
    img: "/assets/1.svg",
    title: "Sign up & get verified",
    desc: "Create your account and complete our quick verification. Takes 24–48 hours.",
  },
  {
    number: "02",
    img: "/assets/2.svg",
    title: "Accept tasks near you",
    desc: "Browse available delivery requests in your area and accept what works for you.",
  },
  {
    number: "03",
    img: "/assets/3.svg",
    title: "Pick up, deliver, get paid",
    desc: "Complete the job, get rated, and earnings hit your wallet the same day.",
  },
];

export const Steps = () => {
  return (
    <section className="max-w-7xl w-full px-6 py-20 md:px-20 md:py-24 mx-auto">
      <div className="mb-14">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-primary mb-4">
          How it works
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Start earning in 3 steps.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((data, index) => (
          <div
            key={index}
            className="bg-[#F7F8FA] rounded-2xl p-8 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="h-12 w-12 rounded-xl bg-blue-primary/10 flex items-center justify-center">
                <img src={data.img} className="h-6 w-6" alt="" />
              </div>
              <span className="text-4xl font-black text-gray-100">{data.number}</span>
            </div>
            <h3 className="font-bold text-xl text-gray-900">{data.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{data.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
