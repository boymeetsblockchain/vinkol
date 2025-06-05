"use client";
import { VerifyOtpPage } from "@/components/shop/otp";
import { Suspense } from "react";

export default function OtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpPage />
    </Suspense>
  );
}
