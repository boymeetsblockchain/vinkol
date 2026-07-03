import { Users, Store, Bike, ShoppingCart } from "lucide-react";

const statsData = [
  {
    number: "200+",
    label: "Verified riders",
    sub: "Background-checked and active",
    icon: Bike,
  },
  {
    number: "100+",
    label: "Partner stores",
    sub: "Shops, pharmacies, and supermarkets",
    icon: Store,
  },
  {
    number: "500+",
    label: "Deliveries completed",
    sub: "And growing every week",
    icon: ShoppingCart,
  },
  {
    number: "100+",
    label: "Personal shoppers",
    sub: "Trained and ready to help",
    icon: Users,
  },
];

export const Achievement = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-20 py-20 md:py-24">
      <div className="mb-14">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-primary mb-4">
          By the numbers
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Vinkol in numbers
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {statsData.map((data, index) => (
          <div key={index} className="bg-[#F7F8FA] rounded-2xl p-8 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-blue-primary/10 flex items-center justify-center">
              <data.icon className="w-5 h-5 text-blue-primary" strokeWidth={1.5} />
            </div>
            <p className="text-4xl font-black text-gray-900 tracking-tight">{data.number}</p>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{data.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{data.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
