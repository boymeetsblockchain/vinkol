import type { Metadata } from "next";

import { BookADeliveryForm } from "@/components/delivery/book-a-delivery-form";
import { LuPackageCheck, LuShield, LuMapPin, LuClock } from "react-icons/lu";
import { contentFor } from "@/lib/markets";
import { pageMetadata } from "@/lib/markets/metadata";
import { marketFromRequest } from "@/lib/markets/server";

const trustItems = (coverAmount: string) => [
  { icon: LuShield, label: `Up to ${coverAmount} item protection` },
  { icon: LuMapPin, label: "Real-time GPS tracking" },
  { icon: LuPackageCheck, label: "Verified & insured riders" },
  { icon: LuClock, label: "Same-day delivery" },
];

export async function generateMetadata(): Promise<Metadata> {
  const country = await marketFromRequest();

  return pageMetadata({
    country,
    title: "Book a Delivery",
    description: `Get a price in seconds and have a verified rider collect your package across ${contentFor(country).serviceAreaPhrase}. The price you are quoted is the price you pay.`,
    path: "/book-a-delivery",
  });
}

async function BookaDeliveryPage() {
  const { coverAmount } = contentFor(await marketFromRequest());
  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      {/* Page header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-20 pt-14 pb-4">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-3">
            Delivery
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
            Book a delivery.
          </h1>
          <p className="text-gray-500 text-base max-w-xl">
            Get a quote instantly and send packages nationwide — same day, every day.
          </p>

          {/* Trust bar */}
          <div className="mt-8 flex flex-wrap gap-6">
            {trustItems(coverAmount).map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <span className="h-7 w-7 rounded-full bg-[var(--color-blue-primary)]/10 flex items-center justify-center">
                  <Icon size={14} className="text-[var(--color-blue-primary)]" />
                </span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <BookADeliveryForm />
        </div>
      </section>
    </main>
  );
}

export default BookaDeliveryPage;
