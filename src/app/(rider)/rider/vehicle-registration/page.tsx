"use client";

import { DocumentStep } from "@/components/onboarding/document-step";
import { completedSteps } from "@/lib/onboarding/steps";
import { useSubmitVehicleRegistration } from "@/services/rider/mutation";
import { useGetUserBank, useUserProfile } from "@/services/rider/query";

export default function VehicleRegistrationPage() {
  const { mutate, isPending } = useSubmitVehicleRegistration();
  const { data } = useUserProfile();
  const { data: bank } = useGetUserBank();
  const profile = data?.data;
  const hasBank = !!bank?.data;

  return (
    <DocumentStep
      role="rider"
      stepKey="vehicle-registration"
      title="Upload your vehicle registration"
      description="Required for a car, truck or van. A clear photo of the registration document in your name."
      imageLabel="Photo of the registration document"
      submitLabel="Submit registration"
      isPending={isPending}
      profile={profile}
      hasBank={hasBank}
      completed={completedSteps("rider", profile, hasBank)}
      onSubmit={(body, handlers) => mutate(body, handlers)}
    />
  );
}
