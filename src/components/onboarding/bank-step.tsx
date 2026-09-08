"use client";

import { useRouter } from "next/navigation";

import { BankForm } from "@/components/banks/bank-form";
import { OnboardingShell } from "@/components/onboarding/shell";
import {
  OnboardingRole,
  completedSteps,
  dashboardFor,
} from "@/lib/onboarding/steps";
import { useBank } from "@/services/banks/query";
import { useGetStoreProfile } from "@/services/shops/query";
import { useUserProfile } from "@/services/rider/query";

/**
 * Payout details, for any role.
 *
 * Shoppers had no such step at all, so a shopper could complete onboarding and
 * then have no way to be paid. The form itself is market-aware — see
 * components/banks/bank-form.tsx for why the two markets need different ones.
 */
export const BankStep = ({ role }: { role: OnboardingRole }) => {
  const router = useRouter();
  const owner = role === "store" ? "store" : "user";

  const storeQuery = useGetStoreProfile();
  const userQuery = useUserProfile();
  const profile =
    role === "store" ? storeQuery.data?.data : userQuery.data?.data;

  const { data: bank } = useBank(owner);
  const dashboard = dashboardFor[role];

  return (
    <OnboardingShell
      role={role}
      stepKey="bank"
      title="Where should we send your earnings?"
      description="Your wallet is credited as you complete jobs. These are the details we use when you request a withdrawal."
      completed={completedSteps(role, profile, !!bank)}
      onSkip={() => router.push(dashboard)}
      skipLabel="Add this later"
    >
      <BankForm
        owner={owner}
        country={profile?.country}
        submitLabel="Save and continue"
        onSaved={() => router.push(dashboard)}
      />
    </OnboardingShell>
  );
};
