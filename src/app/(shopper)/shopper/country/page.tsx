"use client";

import { CountryStep } from "@/components/onboarding/country-step";
import { useBank } from "@/services/banks/query";
import { useUserProfile } from "@/services/rider/query";
import { useUpdateUserCountry } from "@/services/rider/mutation";

export default function ShopperCountryPage() {
  const { data } = useUserProfile();
  const { updateCountry, isPending } = useUpdateUserCountry();
  const { data: bank } = useBank("user");
  const profile = data?.data;

  return (
    <CountryStep
      role="shopper"
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
