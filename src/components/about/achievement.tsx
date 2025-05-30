import { Users, Store, Bike, ShoppingCart } from "lucide-react";

const statsData = [
  {
    number: "50,000+",
    label: "Users",
    icon: Users,
  },
  {
    number: "100+",
    label: "Stores",
    icon: Store,
  },
  {
    number: "2,000+",
    label: "Riders",
    icon: Bike,
  },
  {
    number: "4,000+",
    label: "Personal Shopper",
    icon: ShoppingCart,
  },
];

export const Achievement = () => {
  return (
    <section className="py-12 px-4">
      <h1 className="text-center my-8 text-3xl font-extrabold text-gray-900">
        Our Achievement
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {statsData.map((data, index) => (
          <div key={index} className="text-center">
            <div className="bg-blue-primary rounded-full flex h-12 w-12 items-center justify-center mx-auto mb-4">
              <data.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">
              {data.number}
            </p>
            <p className="text-base font-medium text-gray-500">{data.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
