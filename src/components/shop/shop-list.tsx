"use client";

import { useGetAllCollaborativeStores } from "@/services/shops/query";
import { Store, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
    <div className="h-40 bg-gray-100" />
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gray-100 flex-shrink-0" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3.5 w-3/4 bg-gray-100 rounded" />
          <div className="h-3 w-1/2 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  </div>
);

const StoreCard = ({ shop }: { shop: any }) => {
  const avatar = shop.avatar?.imageUrl || null;
  const cover = shop.coverImage?.imageUrl || shop.avatar?.imageUrl || null;
  const name = shop.storeName || shop.name || "Unnamed Store";
  const category = shop.category || shop.storeType || null;
  const location = shop.state || shop.location || "Nigeria";

  return (
    <Link
      href={`/shops/${shop._id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
    >
      {/* Cover */}
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50">
        {cover ? (
          <img
            src={cover}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Store size={40} className="text-[var(--color-blue-primary)]/20" />
          </div>
        )}
        {category && (
          <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-gray-700 backdrop-blur-sm capitalize shadow-sm">
            {category}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm leading-snug">{name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{location}</p>
        </div>
        <span className="w-7 h-7 rounded-full bg-gray-50 group-hover:bg-[var(--color-blue-primary)] flex items-center justify-center transition-colors flex-shrink-0">
          <ArrowRight size={13} className="text-gray-400 group-hover:text-white transition-colors" />
        </span>
      </div>
    </Link>
  );
};

export const ShopList = () => {
  const { data, isLoading, isError } = useGetAllCollaborativeStores();
  const shops: any[] = Array.isArray(data?.data) ? data.data : [];

  return (
    <section className="bg-white w-full py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-20">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-3">
              Partner Stores
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Find your favourite<br className="hidden md:block" /> stores in Nigeria.
            </h2>
          </div>
          {!isLoading && shops.length > 0 && (
            <p className="text-sm text-gray-400 pb-1 flex-shrink-0">
              {shops.length} store{shops.length !== 1 ? "s" : ""} available
            </p>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <AlertCircle size={24} className="text-red-400" />
            </div>
            <p className="font-semibold text-gray-700">Failed to load stores</p>
            <p className="text-sm text-gray-400 mt-1">Please try refreshing the page.</p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && shops.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
              <Store size={24} className="text-[var(--color-blue-primary)]" />
            </div>
            <p className="font-semibold text-gray-800">No stores yet</p>
            <p className="text-sm text-gray-400 mt-1">Partner stores will appear here once they go live.</p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && shops.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {shops.map((shop: any, idx: number) => (
              <StoreCard key={shop._id ?? idx} shop={shop} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
