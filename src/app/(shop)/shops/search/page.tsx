"use client";
import SearchPage from "@/components/search/page";
import { Suspense } from "react";

export default function OtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}
