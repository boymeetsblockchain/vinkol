"use client";

import { ProfileMenu } from "@/components/dashboard/profile-menu";
import { OnboardingRole } from "@/lib/onboarding/steps";
import { useUserProfile } from "@/services/rider/query";

/**
 * The dashboard top bar's account control, for a rider or a shopper.
 *
 * Was a plain <header> with no click handling, so there was no way to sign out
 * except the sidebar — and the shopper sidebar's was a link that cleared
 * nothing.
 */
export const Profile = ({ role }: { role: OnboardingRole }) => {
  const { data, isLoading } = useUserProfile();

  if (isLoading) {
    return (
      <div className="flex items-center gap-x-4 animate-pulse">
        <div className="hidden md:block">
          <div className="h-4 bg-gray-200 rounded w-24 mb-1" />
          <div className="h-3 bg-gray-200 rounded w-32" />
        </div>
        <div className="h-9 w-9 rounded-full bg-gray-200" />
      </div>
    );
  }

  if (!data?.data) return null;

  const { email, avatar, firstname } = data.data;

  return (
    <ProfileMenu
      role={role}
      name={firstname}
      email={email}
      avatarUrl={avatar?.imageUrl}
    />
  );
};
