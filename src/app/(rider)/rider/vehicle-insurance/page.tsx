"use client";

import { DocumentStep } from "@/components/onboarding/document-step";
import { completedSteps } from "@/lib/onboarding/steps";
import { useSubmitVehicleInsurance } from "@/services/rider/mutation";
import { useGetUserBank, useUserProfile } from "@/services/rider/query";

export default function VehicleInsurancePage() {
  const { mutate, isPending } = useSubmitVehicleInsurance();
  const { data } = useUserProfile();
  const { data: bank } = useGetUserBank();
  const profile = data?.data;
  const hasBank = !!bank?.data;

  return (
    <DocumentStep
      role="rider"
      stepKey="vehicle-insurance"
      title="Upload your insurance certificate"
      description="Required for a car, truck or van. Make sure the cover dates are readable."
      imageLabel="Photo of the certificate"
      submitLabel="Submit certificate"
      isPending={isPending}
      profile={profile}
      hasBank={hasBank}
      completed={completedSteps("rider", profile, hasBank)}
      onSubmit={(body, handlers) => mutate(body, handlers)}
    />
  );
}
