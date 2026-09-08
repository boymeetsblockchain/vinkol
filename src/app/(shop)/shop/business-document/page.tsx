"use client";

import { DocumentStep } from "@/components/onboarding/document-step";
import { completedSteps } from "@/lib/onboarding/steps";
import { useSubmitBusinessDoc } from "@/services/shops/mutation";
import { useGetStoreProfile } from "@/services/shops/query";
import { useBank } from "@/services/banks/query";

export default function StoreBusinessDocPage() {
  const { mutate, isPending } = useSubmitBusinessDoc();
  const { data } = useGetStoreProfile();
  const { data: bank } = useBank("store");

  return (
    <DocumentStep
      role="store"
      stepKey="business-document"
      title="Upload a business document"
      description="Optional, but it speeds up verification and unlocks business invoicing. You can add it later from your dashboard."
      typeField="documentType"
      typeLabel="Document type"
      options={[
        { value: "cac", label: "CAC certificate" },
        { value: "certificate-of-incorporation", label: "Certificate of incorporation" },
        { value: "memorandum-of-registration", label: "Memorandum of registration" },
      ]}
      imageLabel="Photo or scan of the document"
      submitLabel="Submit document"
      isPending={isPending}
      nextPath="/shop/setup-profile"
      skipPath="/shop/setup-profile"
      completed={completedSteps("store", data?.data, !!bank)}
      onSubmit={(body, handlers) => mutate(body, handlers)}
    />
  );
}
