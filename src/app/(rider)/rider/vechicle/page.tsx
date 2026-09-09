"use client";

import { DocumentStep } from "@/components/onboarding/document-step";
import { completedSteps } from "@/lib/onboarding/steps";
import { useSubmitVechicle } from "@/services/rider/mutation";
import { useUserProfile } from "@/services/rider/query";
import { useBank } from "@/services/banks/query";

export default function RiderVehiclePage() {
  const { mutate, isPending } = useSubmitVechicle();
  const { data } = useUserProfile();
  const { data: bank } = useBank("user");

  return (
    <DocumentStep
      role="rider"
      stepKey="vehicle"
      title="Tell us about your vehicle"
      description="What you deliver on, and a photo of it. This decides which jobs you are offered."
      typeField="vehicleType"
      typeLabel="Vehicle type"
      options={[
        { value: "bike", label: "Bike" },
        { value: "car", label: "Car" },
        { value: "truck", label: "Truck" },
      ]}
      imageLabel="Photo of your vehicle"
      submitLabel="Submit vehicle"
      isPending={isPending}
      profile={data?.data}
      hasBank={!!bank}
      completed={completedSteps("rider", data?.data, !!bank)}
      onSubmit={(body, handlers) => mutate(body, handlers)}
    />
  );
}
