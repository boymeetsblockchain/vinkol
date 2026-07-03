"use client";

import { BulkDeliveryForm } from "@/components/delivery/bulk-delivery-form";
import { BulkQuoteSummary } from "@/components/delivery/bulk-quote-summary";
import DeliveryFlowSelector, {
  DeliveryFlowType,
} from "@/components/delivery/delivery-flow-selector";
import MultiDeliveryForm from "@/components/delivery/multi-delivery-form";
import MultiQuoteSummary from "@/components/delivery/multi-quote-summary";
import { useState } from "react";
import { LuBuilding2, LuTruck, LuRepeat2, LuBadgeCheck } from "react-icons/lu";

const perks = [
  { icon: LuTruck, label: "High-volume capacity", detail: "Send 10 to 1,000+ packages in one request" },
  { icon: LuRepeat2, label: "Flexible routing", detail: "One pickup with many dropoffs, or multiple pickup points" },
  { icon: LuBadgeCheck, label: "Insured shipments", detail: "Up to ₦50,000 protection per item" },
  { icon: LuBuilding2, label: "Business invoicing", detail: "Get itemized receipts for every bulk run" },
];

const BulkDeliveryPage = () => {
  const [flow, setFlow] = useState<DeliveryFlowType>(DeliveryFlowType.BULK);
  const [bulkQuote, setBulkQuote] = useState(null);
  const [multiQuote, setMultiQuote] = useState(null);

  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      {/* Page header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-20 pt-14 pb-4">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-3">
            For businesses
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
            Ship in bulk. Move fast.
          </h1>
          <p className="text-gray-500 text-base max-w-xl">
            Built for businesses, distributors, and high-volume senders. Send multiple packages in a single request — with instant quotes.
          </p>

          {/* Perks grid */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {perks.map(({ icon: Icon, label, detail }) => (
              <div key={label} className="flex flex-col gap-2">
                <span className="h-9 w-9 rounded-xl bg-[var(--color-blue-primary)]/10 flex items-center justify-center">
                  <Icon size={18} className="text-[var(--color-blue-primary)]" />
                </span>
                <p className="text-sm font-semibold text-gray-900">{label}</p>
                <p className="text-xs text-gray-500 leading-snug">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <DeliveryFlowSelector value={flow} onChange={setFlow} />

          {flow === DeliveryFlowType.BULK && (
            <>
              {!bulkQuote ? (
                <BulkDeliveryForm handleSetQuote={setBulkQuote} />
              ) : (
                <BulkQuoteSummary
                  quote={bulkQuote}
                  onEdit={() => setBulkQuote(null)}
                />
              )}
            </>
          )}

          {flow === DeliveryFlowType.MULTI && (
            <>
              {!multiQuote ? (
                <MultiDeliveryForm handleSetQuote={setMultiQuote} />
              ) : (
                <MultiQuoteSummary
                  quote={multiQuote}
                  onEdit={() => setMultiQuote(null)}
                />
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default BulkDeliveryPage;
