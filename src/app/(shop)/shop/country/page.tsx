"use client";

import { CountryStep } from "@/components/onboarding/country-step";
import { completedSteps } from "@/lib/onboarding/steps";
import { useGetStoreProfile } from "@/services/shops/query";
import { useUpdateStoreCountry } from "@/services/shops/mutation";

export default function StoreCountryPage() {
  const { data } = useGetStoreProfile();
  const { updateCountry, isPending } = useUpdateStoreCountry();
  const profile = data?.data;

  return (
    <CountryStep
      role="store"
      current={profile?.country}
      completed={completedSteps("store", profile, false)}
      isPending={isPending}
      onSubmit={async (country) => {
        await updateCountry(country);
      }}
    />
  );
}
