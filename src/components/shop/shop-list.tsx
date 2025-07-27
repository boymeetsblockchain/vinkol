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
    <section className="max-w-screen-2xl w-full px-4 py-10 md:px-20 md:py-20 mx-auto">
      <div className="flex flex-col items-center text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          Shop your favorite stores in Nigeria
        </h1>

        <div className="w-full flex justify-center">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-8">
            {data.data.slice(0, 4).map((shop: any, idx: any) => (
              <div key={idx} className="flex justify-center">
                <img
                  src={shop.avatar?.imageUrl || "/assets/placeholder.png"}
                  alt={`Shop ${idx + 1}`}
                  className="h-20 w-20 md:h-32 md:w-32 rounded-full object-cover border shadow-sm hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
