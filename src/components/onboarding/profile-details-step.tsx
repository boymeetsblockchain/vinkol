"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/button";
import { OnboardingShell } from "@/components/onboarding/shell";
import { regionFieldLabel, regionsFor } from "@/lib/markets";
import { useMarket } from "@/lib/markets/useMarket";
import {
  OnboardingRole,
  completedSteps,
  pathAfter,
} from "@/lib/onboarding/steps";
import { useUpdateProfileMutation } from "@/services/rider/mutation";
import { useGetUserBank, useUserProfile } from "@/services/rider/query";

/**
 * Name, region and avatar, for a rider or a shopper.
 *
 * The two pages this replaces were byte-identical apart from one hardcoded
 * `router.push`, which is now asked of the step sequence instead.
 */

const MAX_BYTES = 2 * 1024 * 1024;

export const ProfileDetailsStep = ({
  role,
}: {
  role: Extract<OnboardingRole, "rider" | "shopper">;
}) => {
  const router = useRouter();
  const { data: profileData } = useUserProfile();
  const { data: userBank } = useGetUserBank();
  const profile = profileData?.data;
  const market = useMarket(profile?.country);
  const regionLabel = regionFieldLabel(market.country);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [region, setRegion] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);

  const { mutate: updateProfile, isPending } = useUpdateProfileMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstname.trim()) {
      toast.error("Please enter your first name.");
      return;
    }
    if (!lastname.trim()) {
      toast.error("Please enter your last name.");
      return;
    }
    if (!region) {
      toast.error(`Please select your ${regionLabel.toLowerCase()}.`);
      return;
    }
    if (!avatar) {
      toast.error("Please upload a photo of yourself.");
      return;
    }
    if (avatar.size > MAX_BYTES) {
      toast.error("That file is larger than 2MB. Please attach a smaller one.");
      return;
    }

    updateProfile(
      {
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        state: region,
        avatar,
      },
      {
        onSuccess: () => {
          toast.success("Profile saved.");
          router.push(pathAfter(role, "profile", profile, !!userBank?.data));
        },
        onError: (error: any) =>
          toast.error(error?.message || "Failed to update your profile."),
      },
    );
  };

  return (
    <OnboardingShell
      role={role}
      stepKey="profile"
      profile={profile}
      title="Tell us who you are"
      description="Customers see your name and photo when you are on a job, so use the name on your ID and a clear picture of your face."
      completed={completedSteps(role, profile, !!userBank?.data)}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="firstname"
              className="text-sm font-medium text-gray-700"
            >
              Full name
            </label>
            <input
              id="firstname"
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:bg-white transition-all"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="e.g. John"
              disabled={isPending}
              required
            />
            <span className="text-xs text-gray-500">
              Must match your government-issued ID.
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="lastname"
              className="text-sm font-medium text-gray-700"
            >
              Last name
            </label>
            <input
              id="lastname"
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:bg-white transition-all"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="e.g. Doe"
              disabled={isPending}
              required
            />
            <span className="text-xs text-gray-500">
              Must match your government-issued ID.
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="region" className="text-sm font-medium text-gray-700">
            {regionLabel}
          </label>
          <select
            id="region"
            className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)]"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            disabled={isPending}
            required
          >
            <option value="">Select your {regionLabel.toLowerCase()}</option>
            {regionsFor(market.country).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="avatar" className="text-sm font-medium text-gray-700">
            Your photo
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={isPending}
            required
          />
          <span className="text-xs text-gray-500">
            {avatar ? avatar.name : "JPG or PNG, up to 2MB."}
          </span>
        </div>

        <Button
          variant="auth"
          className="w-full rounded-md mt-1"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Saving…" : "Save and continue"}
        </Button>
      </form>
    </OnboardingShell>
  );
};
