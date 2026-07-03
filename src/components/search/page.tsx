"use client";
import { useGetAllStores } from "@/services/shops/query";
import { useSearchParams, useRouter } from "next/navigation";

import Image from "next/image";
import { ShopHeader } from "../shop-page/header";
import { ArrowLeft } from "lucide-react";

function SearchPage() {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const router = useRouter();

  if (!state) {
    router.back();
    return null;
  }

  const { data, isLoading } = useGetAllStores({ state });

  const stores = data?.data || [];

  return (
    <>
      <ShopHeader isLogo />
      <section className="max-w-screen-2xl w-full px-4 py-10 md:px-20 md:py-20 mx-auto">
        <div className="mb-8 text-left">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-gray-500 hover:text-[var(--color-blue-primary)] text-sm font-medium mb-4 transition-colors"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold">
            Supermarkets Around You
          </h1>
        </div>

        {isLoading ? (
          <p className="text-center">Loading stores...</p>
        ) : stores.length === 0 ? (
          <p className="text-center">No stores found in {state}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {stores.map((store: any) => (
              <div
                key={store._id}
                className="flex flex-col gap-2 cursor-pointer"
                onClick={() => router.push(`/shops/${store._id}`)}
              >
                <img
                  src={store?.avatar?.imageUrl || "/default-avatar.png"}
                  alt={store.name || "Supermarket"}
                  className="h-24 md:h-32 w-full rounded-[5px] object-cover hover:opacity-90 transition"
                />
                <p className="text-sm md:text-base font-medium text-center">
                  {store.name || "Unnamed Store"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default SearchPage;
