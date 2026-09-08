"use client";

import { CountryStep } from "@/components/onboarding/country-step";
import { completedSteps } from "@/lib/onboarding/steps";
import { useUserProfile } from "@/services/rider/query";
import { useUpdateUserCountry } from "@/services/rider/mutation";

export default function ShopperCountryPage() {
  const { data } = useUserProfile();
  const { updateCountry, isPending } = useUpdateUserCountry();
  const profile = data?.data;

  return (
    <CountryStep
      role="shopper"
      current={profile?.country}
      completed={completedSteps("shopper", profile, false)}
      isPending={isPending}
      onSubmit={async (country) => {
        await updateCountry(country);
      }}
    />
  );
}
