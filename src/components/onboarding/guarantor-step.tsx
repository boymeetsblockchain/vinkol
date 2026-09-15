"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/button";
import { OnboardingShell } from "@/components/onboarding/shell";
import { useMarket } from "@/lib/markets/useMarket";
import { normalizePhone, phonePlaceholder } from "@/lib/phone";
import { completedSteps, pathAfter } from "@/lib/onboarding/steps";
import { OnboardingRole } from "@/lib/onboarding/steps";
import { useSubmitGuarantor } from "@/services/rider/mutation";
import { useGetUserBank, useUserProfile } from "@/services/rider/query";

/**
 * Someone who will vouch for a rider or shopper.
 *
 * The server has always required this for both roles — `evaluateKYCSubmission`
 * will not treat a KYC as submitted without it — but the website never asked,
 * so no rider or shopper could reach a submitted KYC and no admin had anything
 * to approve.
 *
 * Not a `DocumentStep`: this one collects a name and a phone number as well as
 * the ID photo.
 */

const FIELD =
  "w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:bg-white transition-all";

const MAX_BYTES = 2 * 1024 * 1024;

const ID_TYPES = [
  { value: "nin", label: "NIN" },
  { value: "national-id", label: "National ID" },
  { value: "drivers-license", label: "Driver's licence" },
  { value: "passport", label: "Passport" },
  { value: "voters-card", label: "Voter's card" },
];

export const GuarantorStep = ({ role }: { role: OnboardingRole }) => {
  const router = useRouter();
  const { data: profileData } = useUserProfile();
  const { data: userBank } = useGetUserBank();
  const profile = profileData?.data;
  const market = useMarket(profile?.country);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [idType, setIdType] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const { mutate, isPending } = useSubmitGuarantor();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length < 2) {
      toast.error("Please enter your guarantor's full name.");
      return;
    }

    const normalized = normalizePhone(phone, market.country);
    if (!normalized) {
      toast.error("Please enter a valid phone number for your guarantor.");
      return;
    }

    if (!idType) {
      toast.error("Please choose which ID your guarantor is providing.");
      return;
    }
    if (!image) {
      toast.error("Please attach a photo of your guarantor's ID.");
      return;
    }
    if (image.size > MAX_BYTES) {
      toast.error("That file is larger than 2MB. Please attach a smaller one.");
      return;
    }

    const body = new FormData();
    body.append("name", name.trim());
    body.append("phone", normalized);
    body.append("idType", idType);
    body.append("image", image);

    mutate(body, {
      onSuccess: () => {
        toast.success("Guarantor submitted.");
        router.push(pathAfter(role, "guarantor", profile, !!userBank?.data));
      },
      onError: (error) =>
        toast.error(error.message || "Could not submit your guarantor."),
    });
  };

  return (
    <OnboardingShell
      role={role}
      stepKey="guarantor"
      profile={profile}
      title="Who will vouch for you?"
      description="Someone who can confirm your identity if we ever need to reach them. We contact a guarantor only if there is a problem with a delivery."
      completed={completedSteps(role, profile, !!userBank?.data)}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="gName" className="text-sm font-medium text-gray-700">
            Guarantor&rsquo;s full name
          </label>
          <input
            id="gName"
            className={FIELD}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ada Obi"
            disabled={isPending}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="gPhone" className="text-sm font-medium text-gray-700">
            Guarantor&rsquo;s phone number
          </label>
          <input
            id="gPhone"
            type="tel"
            inputMode="tel"
            className={FIELD}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={phonePlaceholder(market.country)}
            disabled={isPending}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="gIdType" className="text-sm font-medium text-gray-700">
            Which ID are they providing?
          </label>
          <select
            id="gIdType"
            className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)]"
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
            disabled={isPending}
            required
          >
            <option value="">Select ID type</option>
            {ID_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="gImage" className="text-sm font-medium text-gray-700">
            Photo of their ID
          </label>
          <input
            id="gImage"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={isPending}
            required
          />
          <span className="text-xs text-gray-500">
            {image ? image.name : "JPG or PNG, up to 2MB."}
          </span>
        </div>

        <Button
          variant="auth"
          className="w-full rounded-md mt-1"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Submitting…" : "Submit guarantor"}
        </Button>
      </form>
    </OnboardingShell>
  );
};
