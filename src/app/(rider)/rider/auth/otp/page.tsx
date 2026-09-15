"use client";

import { Suspense } from "react";

import { VerifyEmailStep } from "@/components/onboarding/verify-email-step";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailStep role="rider" />
    </Suspense>
  );
}
