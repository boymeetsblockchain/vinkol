"use client";

import { useGetAllStores } from "@/services/shops/query";

export const ShopList = () => {
  const { data, isLoading, isError } = useGetAllStores();

  if (isLoading) {
    return <div className="text-center py-10">Loading stores...</div>;
  }

  if (isError || !data?.data || !Array.isArray(data.data)) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load stores.
      </div>
    );
  }
  return (
    <section className="max-w-screen-2xl w-full px-4 py-10 md:px-20 md:py-20 mx-auto">
      <div className="flex flex-col items-center text-center space-y-6">
        <h2>COLLABORATIVE STORES</h2>
        <h1 className="text-3xl md:text-4xl font-bold">
          STORES ON <span className="text-blue-primary">VINKOL</span>
        </h1>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 mt-8">
          {data.data.slice(0, 5).map((shop: any, idx: any) => (
            <img
              key={idx}
              src={shop.avatar?.imageUrl || "/assets/placeholder.png"}
              alt={`Shop ${idx + 1}`}
              className="h-20 w-20 md:h-32 md:w-32 rounded-full object-cover border shadow-sm hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
