"use client";
import { QuotePage } from "@/components/delivery/quote-store";
import { Suspense } from "react";

export default function OtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuotePage />
    </Suspense>
  );
}
