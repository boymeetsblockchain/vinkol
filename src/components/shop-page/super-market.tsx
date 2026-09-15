"use client";

import Link from "next/link";
import { AlertCircle, Store } from "lucide-react";

import { IStore } from "@/lib/interfaces/store";
import { Country } from "@/lib/markets/types";
import { useGetAllCollaborativeStores } from "@/services/shops/query";

export const SuperMarket = ({ country }: { country: Country }) => {
  const {
    data: stores,
    isLoading,
    isError,
    refetch,
  } = useGetAllCollaborativeStores(country);

  const data: IStore[] = stores?.data ?? [];

  return (
    <section className="max-w-screen-2xl w-full px-4 py-4 md:px-20 md:py-8 mx-auto">
      <div className="mb-8 text-left">
        <h1 className="text-3xl md:text-4xl font-bold">Available Stores</h1>
      </div>

      {isError ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <AlertCircle size={32} className="text-red-500" />
          <div>
            <p className="font-semibold text-gray-900">
              We could not load the stores
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Check your connection and try again.
            </p>
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            className="text-sm font-semibold text-blue-primary hover:underline underline-offset-4"
          >
            Try again
          </button>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2 animate-pulse">
              <div className="h-24 md:h-32 w-full rounded-[5px] bg-gray-100" />
              <div className="h-3.5 w-2/3 mx-auto rounded bg-gray-100" />
            </div>
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Store size={32} className="text-gray-300" />
          <p className="text-sm text-gray-500">
            No stores are available in your area yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data.map((store) => (
            // A link, not a click handler that emptied the cart: browsing to a
            // store is not a reason to throw away what someone already chose.
            <Link
              key={store._id}
              href={`/shops/${store._id}`}
              className="flex flex-col gap-2 group"
            >
              <img
                src={store?.avatar?.imageUrl ?? "/default-avatar.png"}
                className="h-24 md:h-32 w-full rounded-[5px] object-cover group-hover:opacity-90 transition"
                alt={store.name}
              />
              <p className="text-sm md:text-base font-medium text-center">
                {store.name}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};
