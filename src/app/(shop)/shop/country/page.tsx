"use client";

import { CountryStep } from "@/components/onboarding/country-step";
import { useBank } from "@/services/banks/query";
import { useGetStoreProfile } from "@/services/shops/query";
import { useUpdateStoreCountry } from "@/services/shops/mutation";

export default function StoreCountryPage() {
  const { data } = useGetStoreProfile();
  const { updateCountry, isPending } = useUpdateStoreCountry();
  const { data: bank } = useBank("store");
  const profile = data?.data;

  return (
    <CountryStep
      role="store"
      current={profile?.country}
      profile={profile}
      hasBank={!!bank}
      isPending={isPending}
      onSubmit={async (country) => {
        await updateCountry(country);
      }}
    />
  );
}
