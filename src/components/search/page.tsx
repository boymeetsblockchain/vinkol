"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, ArrowLeft, Store } from "lucide-react";

import { IStore } from "@/lib/interfaces/store";
import { regionLabel } from "@/lib/markets";
import { useMarket } from "@/lib/markets/useMarket";
import { useGetAllStores } from "@/services/shops/query";

function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const market = useMarket();

  const state = searchParams.get("state") ?? undefined;
  // The store-name box appended `q` but nothing ever read it, so searching by
  // name did nothing at all. The server filters on `search` over name, lga and
  // address, so that is the parameter to send.
  const search = searchParams.get("search") ?? searchParams.get("q") ?? undefined;

  // Hooks cannot be called conditionally, so this query is always made; the
  // empty-criteria case is handled in the markup below. Returning early above
  // a hook, as this component used to, throws on re-render.
  const { data, isLoading, isError, refetch } = useGetAllStores({
    state,
    search,
    country: market.country,
  });

  const stores: IStore[] = data?.data ?? [];
  const hasCriteria = Boolean(state || search);

  const heading = search
    ? `Results for “${search}”`
    : state
      ? `Stores in ${regionLabel(state, market.country)}`
      : "Search stores";

  return (
    <>
      <section className="max-w-screen-2xl w-full px-4 py-10 md:px-20 md:py-20 mx-auto">
        <div className="mb-8 text-left">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-gray-500 hover:text-[var(--color-blue-primary)] text-sm font-medium mb-4 transition-colors"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold">{heading}</h1>
        </div>

        {!hasCriteria ? (
          <Empty
            message="Search for a store by name, or pick a location to browse."
            action={
              <Link
                href="/explore-shop"
                className="text-sm font-semibold text-blue-primary hover:underline underline-offset-4"
              >
                Browse all stores
              </Link>
            }
          />
        ) : isError ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <AlertCircle size={32} className="text-red-500" />
            <p className="font-semibold text-gray-900">
              We could not run that search
            </p>
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
        ) : stores.length === 0 ? (
          <Empty
            message={
              search
                ? `No stores match “${search}”.`
                : `No stores yet in ${regionLabel(state!, market.country)}.`
            }
            action={
              <Link
                href="/explore-shop"
                className="text-sm font-semibold text-blue-primary hover:underline underline-offset-4"
              >
                Browse all stores
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {stores.map((store) => (
              <Link
                key={store._id}
                href={`/shops/${store._id}`}
                className="flex flex-col gap-2 group"
              >
                <img
                  src={store?.avatar?.imageUrl || "/default-avatar.png"}
                  alt={store.name || "Store"}
                  className="h-24 md:h-32 w-full rounded-[5px] object-cover group-hover:opacity-90 transition"
                />
                <p className="text-sm md:text-base font-medium text-center">
                  {store.name || "Unnamed Store"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

const Empty = ({
  message,
  action,
}: {
  message: string;
  action: React.ReactNode;
}) => (
  <div className="flex flex-col items-center gap-3 py-16 text-center">
    <Store size={32} className="text-gray-300" />
    <p className="text-sm text-gray-500">{message}</p>
    {action}
  </div>
);

export default SearchPage;
