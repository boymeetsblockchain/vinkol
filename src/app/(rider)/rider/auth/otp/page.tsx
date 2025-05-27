"use client";
import VerifyOtpPage from "@/components/rider/otp";
import { Suspense } from "react";

export default function OtpPage() {
  <Suspense fallback={<div>Loading...</div>}>
    <VerifyOtpPage />
  </Suspense>;
}
