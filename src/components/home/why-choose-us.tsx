import { Button } from "../button";

const whyChooseUs = [
  {
    title: "Fast Delivery",
    img: "/assets/bike.svg",
    description:
      "No delays, no excuses. Just tap, track, and receive. Whether it's a forgotten charger or a full grocery haul, we get it there fast—so your plans never slow down.",
    linkText: "Learn more",
  },
  {
    title: "Refund up to ₦50,000",
    img: "/assets/transfer.svg",
    description:
      "If something goes wrong with your delivery, you’re covered—up to ₦50,000 in refunds for lost or damaged items. No endless forms, no runarounds. Just fair protection for every ride.",
    linkText: "Learn more",
  },
  {
    title: "Personal Shopper",
    img: "/assets/transfer.svg",
    description:
      "Whether you're a student, freelancer, or just passing by the store—Vinkol lets any verified user pick up and deliver items for others. No bike required. Just reliability.",
    linkText: "Learn more",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="max-w-screen-2xl w-full p-10 md:p-20 mx-auto">
      <div className="max-w-md">
        <h1 className="text-2xl md:text-5xl text-center md:text-left  font-bold mb-4">
          Why Choose Our Delivery Service?
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {whyChooseUs.map((data, index) => (
          <div
            key={index}
            className="w-full h-[380px] bg-[#FAFAFA] p-6 flex items-start justify-between flex-col shadow"
          >
            <div>
              <img src={data.img} alt="" className="h-12 w-12 my-4" />
              <h2 className="font-bold text-2xl">{data.title}</h2>
            </div>
            <div>
              <p className="font-medium teext-sm">{data.description}</p>
            </div>
            <div>
              {index == 1 ? (
                <Button size="lg" className="text-white">
                  <span className="h-4 w-4 rounded-full bg-white mr-4"></span>{" "}
                  {data.linkText}
                </Button>
              ) : (
                <Button size="lg" variant="outline">
                  <span className="h-4 w-4 rounded-full bg-black mr-4"></span>{" "}
                  {data.linkText}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
