"use client";

import { DocumentStep } from "@/components/onboarding/document-step";
import { completedSteps } from "@/lib/onboarding/steps";
import { useSubmitKycMutation } from "@/services/rider/mutation";
import { useUserProfile } from "@/services/rider/query";
import { useBank } from "@/services/banks/query";

export default function ShopperIdentityPage() {
  const { mutate, isPending } = useSubmitKycMutation();
  const { data } = useUserProfile();
  const { data: bank } = useBank("user");

  return (
    <DocumentStep
      role="shopper"
      stepKey="identity"
      title="Upload your ID"
      description="A photo of your NIN slip, national ID, passport, driver's licence or voter's card. Every shopper is verified before going live."
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
      profile={data?.data}
      hasBank={!!bank}
      completed={completedSteps("shopper", data?.data, !!bank)}
      onSubmit={(body, handlers) => mutate(body, handlers)}
    />
  );
}
