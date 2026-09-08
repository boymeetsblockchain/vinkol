"use client";

import { DocumentStep } from "@/components/onboarding/document-step";
import { completedSteps } from "@/lib/onboarding/steps";
import { useSubmitStoreIdMutation } from "@/services/shops/mutation";
import { useGetStoreProfile } from "@/services/shops/query";
import { useBank } from "@/services/banks/query";

export default function StoreIdentityPage() {
  const { mutate, isPending } = useSubmitStoreIdMutation();
  const { data } = useGetStoreProfile();
  const { data: bank } = useBank("store");

  return (
    <DocumentStep
      role="store"
      stepKey="identity"
      title="Upload your ID"
      description="A photo of your NIN slip, national ID, passport, driver's licence or voter's card. We use this to verify who runs the store."
      typeField="idType"
      typeLabel="ID type"
      options={[
        { value: "nin", label: "NIN" },
        { value: "national-id", label: "National ID" },
        { value: "drivers-license", label: "Driver's licence" },
        { value: "passport", label: "Passport" },
        { value: "voters-card", label: "Voter's card" },
      ]}
      imageLabel="Photo of your ID"
      submitLabel="Submit ID"
      isPending={isPending}
      nextPath="/shop/business-document"
      completed={completedSteps("store", data?.data, !!bank)}
      onSubmit={(body, handlers) => mutate(body, handlers)}
    />
  );
}
