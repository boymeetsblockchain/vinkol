"use client";
import { useRouter } from "next/navigation";
export const SuperMarket = () => {
  const router = useRouter();
  return (
    <section className="max-w-screen-2xl w-full px-4 py-10 md:px-20 md:py-20 mx-auto">
      <div className="mb-8 text-left">
        <h1 className="text-3xl md:text-4xl font-bold">
          Supermarkets Around You
        </h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-2"
            onClick={() => router.push("/shops/1")}
          >
            <img
              src="/assets/shop2.png"
              className="h-24 md:h-32 w-full rounded-[5px] cursor-pointer object-cover hover:opacity-90 transition"
              alt={`Supermarket ${idx + 1}`}
            />
            <p className="text-sm md:text-base font-medium text-center">
              Bokku Supermarket
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
