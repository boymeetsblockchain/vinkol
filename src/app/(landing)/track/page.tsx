import type { Metadata } from "next";
import { Suspense } from "react";
import { TrackPageClient } from "./track-client";

export const metadata: Metadata = {
  title: "Track Your Delivery — Vinkol",
  description: "Enter your tracking ID to see real-time status of your Vinkol delivery.",
};

export default function TrackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-primary/30 border-t-blue-primary rounded-full animate-spin" />
        </div>
      }
    >
      <TrackPageClient />
    </Suspense>
  );
}
