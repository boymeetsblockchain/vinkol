"use client";

import { useRouter } from "next/navigation";

import { OnboardingShell } from "@/components/onboarding/shell";
import { VerifyPhoneForm } from "@/components/phone/verify-phone-form";
import { useMarket } from "@/lib/markets/useMarket";
import {
  OnboardingRole,
  completedSteps,
  pathAfter,
} from "@/lib/onboarding/steps";
import { useGetUserBank, useUserProfile } from "@/services/rider/query";

/**
 * Phone verification for riders and shoppers.
 *
 * Shared rather than copied: the shopper flow had no phone step at all, and the
 * rider one read the email from a localStorage key ("ride-email") that only the
 * rider auth modal ever wrote — so the same page would have failed outright for
 * a shopper. The email comes from the profile now, with the old key as a
 * fallback for anyone mid-flow.
 *
 * The form itself lives in components/phone so the dashboard can offer it too;
 * this step is skippable, and a skip needs somewhere to come back to.
 */
export const PhoneStep = ({ role }: { role: OnboardingRole }) => {
  const router = useRouter();
  const { data: profileData } = useUserProfile();
  const { data: userBank } = useGetUserBank();
  const profile = profileData?.data;
  const market = useMarket(profile?.country);

  const email =
    profile?.email ??
    (typeof window !== "undefined"
      ? localStorage.getItem("ride-email")
      : null);

  return (
    <OnboardingShell
      role={role}
      stepKey="phone"
      profile={profile}
      title="Verify your phone number"
      description="Customers and our support team reach you on this number, so we send a code to confirm it works. You need a verified number before you can accept orders."
      completed={completedSteps(role, profile, !!userBank?.data)}
    >
      <VerifyPhoneForm
        email={email}
        country={market.country}
        // Was `bank` or the dashboard, which jumped over ID, vehicle and
        // guarantor — collecting payout details before any of the checks that
        // justify them.
        onVerified={() =>
          router.push(pathAfter(role, "phone", profile, !!userBank?.data))
        }
      />
    </OnboardingShell>
  );
};
