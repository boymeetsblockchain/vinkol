"use client";

import { useGetAllCollaborativeStores } from "@/services/shops/query";

export const ShopList = () => {
  const { data, isLoading, isError } = useGetAllCollaborativeStores();

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
    <section className="bg-[#0a0a0a]">
      <div className="max-w-7xl w-full px-6 py-20 md:px-20 md:py-24 mx-auto">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-primary mb-4">
            Our partners
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Stores on Vinkol
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {data.data.slice(0, 8).map((shop: any, idx: any) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <img
                src={shop.avatar?.imageUrl || "/assets/placeholder.png"}
                alt={shop.name || `Store ${idx + 1}`}
                className="h-20 w-20 md:h-24 md:w-24 rounded-2xl object-cover border border-white/10 shadow-sm hover:scale-105 transition-transform"
              />
              {shop.name && (
                <p className="text-xs text-white/50 text-center max-w-[80px] truncate">{shop.name}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
