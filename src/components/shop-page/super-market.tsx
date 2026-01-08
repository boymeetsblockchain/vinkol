"use client";
import { saveCartToStorage } from "@/config/storage";
import { IStore } from "@/lib/interfaces/store";
import {
  useGetAllCollaborativeStores,
  useGetAllStores,
} from "@/services/shops/query";
import { useRouter } from "next/navigation";
export const SuperMarket = () => {
  const router = useRouter();

  const { data: stores, isLoading, error } = useGetAllCollaborativeStores();

  const data = stores?.data ?? [];

  if (error) {
    return <div className="flex flex-col h-screen">An error occured</div>;
  }

  return (
    <section className="max-w-screen-2xl w-full px-4 py-10 md:px-20 md:py-20 mx-auto">
      <div className="mb-8 text-left">
        <h1 className="text-3xl md:text-4xl font-bold">Available Stores</h1>
      </div>

      {isLoading ? (
        <div>
          <p>Loading stores...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data.map((store: IStore) => (
            <div
              key={store._id}
              className="flex flex-col gap-2"
              onClick={() => {
                saveCartToStorage([]);
                router.push("/shops/" + store._id);
              }}
            >
              <img
                src={store?.avatar?.imageUrl ?? "/default-avatar.png"}
                className="h-24 md:h-32 w-full rounded-[5px] cursor-pointer object-cover hover:opacity-90 transition"
                alt={store.name}
              />
              <p className="text-sm md:text-base font-medium text-center">
                {store.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
