const steps = [
  {
    img: "/assets/1.svg",
    steps: "Sign up & Get verified",
  },
  {
    img: "/assets/2.svg",
    steps: "Accept tasks in your area.",
  },
  {
    img: "/assets/3.svg",
    steps: "Pick up, deliver, get paid.",
  },
];

export const Steps = () => {
  return (
    <section className="p-4 md:p-10">
      <h1 className="text-2xl md:text-5xl font-bold text-center my-4  ">
        How Vinkol Rider Works
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-10 ">
        {steps.map((data, index) => (
          <div
            key={index}
            className="h-[200px] w-full bg-[#F2F8FF] space-y-4 rounded-md shadow-md  px-4 py-2 drop-shadow-[rgba(0,0,0,0.25)]"
          >
            <div className="flex justify-end items-end">
              <img src={`${data.img}`} className="h-16 w-16" alt="" />
            </div>
            <div className="max-w-[180px]">
              <p className="font-semibold text-2xl">{data.steps}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
