"use client";

import { BulkDeliveryForm } from "@/components/delivery/bulk-delivery-form";
import { BulkQuoteSummary } from "@/components/delivery/bulk-quote-summary";
import DeliveryFlowSelector, {
  DeliveryFlowType,
} from "@/components/delivery/delivery-flow-selector";
import MultiDeliveryForm from "@/components/delivery/multi-delivery-form";
import MultiQuoteSummary from "@/components/delivery/multi-quote-summary";
import { useState } from "react";

const BulkDeliveryPage = () => {
  const [flow, setFlow] = useState<DeliveryFlowType>(DeliveryFlowType.BULK);
  const [bulkQuote, setBulkQuote] = useState(null);
  const [multiQuote, setMultiQuote] = useState(null);
  return (
    <main className="min-h-screen flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-screen-xl">
        {/* Flow selector */}
        <DeliveryFlowSelector value={flow} onChange={setFlow} />

        {/* BULK FLOW */}
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

        {/* MULTI FLOW */}
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
    </main>
  );
};

export default BulkDeliveryPage;
