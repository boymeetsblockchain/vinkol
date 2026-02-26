"use client";

import { BulkDeliveryForm } from "@/components/delivery/bulk-delivery-form";
import { BulkQuoteSummary } from "@/components/delivery/bulk-quote-summary";
import React, { useState } from "react";

const BulkDeliveryPage = () => {
  const [quoteData, setQuoteData] = useState(null);
  return (
    <main className="min-h-screen flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-screen-xl">
        {!quoteData ? (
          <BulkDeliveryForm handleSetQuote={setQuoteData} />
        ) : (
          <BulkQuoteSummary
            quote={quoteData}
            onEdit={() => setQuoteData(null)}
          />
        )}
      </div>
    </main>
  );
};

export default BulkDeliveryPage;
