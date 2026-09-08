"use client";

import { DocumentStep } from "@/components/onboarding/document-step";
import { completedSteps } from "@/lib/onboarding/steps";
import { useSubmitVechicle } from "@/services/rider/mutation";
import { useUserProfile } from "@/services/rider/query";
import { useBank } from "@/services/banks/query";

export default function ShopperVehiclePage() {
  const { mutate, isPending } = useSubmitVechicle();
  const { data } = useUserProfile();
  const { data: bank } = useBank("user");

  return (
    <DocumentStep
      role="shopper"
      stepKey="vehicle"
      title="Tell us about your vehicle"
      description="What you get around on, and a photo of it. Shoppers can work without a motorcycle."
      typeField="vehicleType"
      typeLabel="Vehicle type"
      options={[
        { value: "bicycle", label: "Bicycle" },
        { value: "bike", label: "Bike" },
        { value: "car", label: "Car" },
        { value: "truck", label: "Truck" },
      ]}
      imageLabel="Photo of your vehicle"
      submitLabel="Submit vehicle"
      isPending={isPending}
      nextPath="/shopper/account"
      completed={completedSteps("shopper", data?.data, !!bank)}
      onSubmit={(body, handlers) => mutate(body, handlers)}
    />
  );
}
