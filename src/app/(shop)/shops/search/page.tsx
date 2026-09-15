"use client";

import { Suspense } from "react";

import SearchPage from "@/components/search/page";
import { ShopHeader } from "@/components/shop-page/header";

export default function StoreSearchPage() {
  return (
    <>
      <ShopHeader isLogo />
      <Suspense fallback={<div className="p-10">Loading…</div>}>
        <SearchPage />
      </Suspense>
    </>
  );
}
