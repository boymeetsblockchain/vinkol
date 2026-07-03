import Link from "next/link";

const whyChooseUs = [
  {
    tag: "Speed",
    title: "Fast delivery, every time",
    metric: "Under 15 min average pickup",
    img: "/assets/bike.svg",
    description:
      "Our riders are nearby, verified, and ready. From the moment you book, your pickup is matched in minutes — not hours.",
    link: "/book-a-delivery",
    linkText: "Book a delivery",
  },
  {
    tag: "Protection",
    title: "Up to ₦50,000 item protection",
    metric: "Claims resolved in 72 hours",
    img: "/assets/transfer.svg",
    description:
      "If your item is damaged, stolen, or lost due to rider negligence, we investigate and resolve your claim within 72 hours. Full stop.",
    link: "/product-support",
    linkText: "Learn about claims",
  },
  {
    tag: "Convenience",
    title: "Personal shoppers, on demand",
    metric: "Any store. Any item.",
    img: "/assets/bike.svg",
    description:
      "No time to shop? Our trained shoppers buy exactly what you need — groceries, gifts, essentials — and deliver it to your door.",
    link: "/become-a-personal-shopper",
    linkText: "Learn more",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="max-w-7xl w-full px-6 py-12 md:px-20 md:py-16 mx-auto">
      <div className="mb-14">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-primary mb-4">
          Why Vinkol
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          Built different.
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {whyChooseUs.map((data, index) => (
          <div
            key={index}
            className="bg-[#F7F8FA] rounded-2xl p-8 flex flex-col justify-between gap-6 hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-primary bg-blue-primary/10 rounded-full px-3 py-1">
                {data.tag}
              </span>
              <img src={data.img} alt="" className="h-10 w-10" />
              <div>
                <p className="text-xs font-medium text-gray-400 mb-1">{data.metric}</p>
                <h3 className="font-bold text-xl text-gray-900 leading-snug">{data.title}</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{data.description}</p>
            </div>
            <Link
              href={data.link}
              className="text-blue-primary text-sm font-semibold hover:underline underline-offset-4"
            >
              {data.linkText} →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
