"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/button";
import { Avatar } from "@/components/dashboard/avatar";
import { PageHeader } from "@/components/dashboard/page-header";
import { PayoutSettings } from "@/components/dashboard/payout-settings";
import { PhoneSettings } from "@/components/dashboard/phone-settings";
import { SettingsCard } from "@/components/dashboard/settings-card";
import { regionsFor } from "@/lib/markets";
import { useMarket } from "@/lib/markets/useMarket";
import { useUpdateProfileMutation } from "@/services/rider/mutation";
import { useUserProfile } from "@/services/rider/query";

/**
 * Profile, phone and payouts for a rider or a shopper.
 *
 * The two pages were byte-identical apart from two lines, so this is one
 * screen. Each section is its own card: they were separated by a top border
 * and a wide margin, which read as one long column of unrelated fields, and
 * the profile form sat in a two-column grid with nothing in the second column,
 * so it filled half the width and left the rest blank.
 */

const FIELD =
  "w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:bg-white transition-all";

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

export const AccountSettings = () => {
  const { data, isPending, refetch } = useUserProfile();
  const updateProfile = useUpdateProfileMutation();
  const market = useMarket(data?.data?.country);

  const [firstname, setFirstname] = useState("");
  const [region, setRegion] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!data?.data) return;
    setFirstname(data.data.firstname || "");
    setRegion(data.data.state || "");
  }, [data]);

  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  if (isPending) {
    return (
      <div className="p-5 md:p-8 flex flex-col gap-6 max-w-3xl">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-2xl p-6 animate-pulse"
          >
            <div className="h-4 w-32 bg-gray-100 rounded mb-3" />
            <div className="h-3 w-64 bg-gray-100 rounded mb-6" />
            <div className="h-10 w-full bg-gray-100 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (!data?.data) return null;

  const { email, avatar } = data.data;
  const regionLabel = market.country === "CA" ? "Province" : "State";

  const pickAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // The label has always promised 2MB; nothing enforced it, so an oversized
    // file failed at the upload with no explanation.
    if (file.size > MAX_AVATAR_BYTES) {
      toast.error("That image is larger than 2MB. Please pick a smaller one.");
      event.target.value = "";
      return;
    }
    setAvatarFile(file);
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(file);
    });
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();

    if (firstname.trim().length < 2) {
      toast.error("Please enter your name.");
      return;
    }
    if (!region) {
      toast.error(`Please choose your ${regionLabel.toLowerCase()}.`);
      return;
    }

    const payload: { firstname: string; state: string; avatar?: File } = {
      firstname: firstname.trim(),
      state: region,
    };
    if (avatarFile) payload.avatar = avatarFile;

    // Reported from the callbacks rather than straight after calling mutate.
    // It used to toast success and refetch immediately, so a rejected update
    // still said "Profile updated successfully!".
    updateProfile.mutate(payload, {
      onSuccess: () => {
        toast.success("Profile updated.");
        setAvatarFile(null);
        setPreview(null);
        refetch();
      },
      onError: (error: any) =>
        toast.error(error?.message ?? "Could not update your profile."),
    });
  };

  return (
    <div className="p-5 md:p-8">
      <PageHeader
        title="Settings"
        subtitle="Your profile, phone number and payout details"
      />

      <div className="flex flex-col gap-6 max-w-3xl">
        <SettingsCard
          title="Profile"
          description="How you appear to customers and support."
        >
          <form onSubmit={save} className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <Avatar
                src={preview ?? avatar?.imageUrl}
                name={firstname}
                className="h-20 w-20 flex-shrink-0"
                textClass="text-2xl"
              />
              <div className="flex flex-col gap-1 min-w-0">
                <label
                  htmlFor="avatar-upload"
                  className="cursor-pointer text-sm font-semibold text-[var(--color-blue-primary)] hover:underline w-fit"
                >
                  Change profile picture
                </label>
                <span className="text-xs text-gray-500 truncate">
                  {avatarFile ? avatarFile.name : "JPG or PNG, up to 2MB."}
                </span>
              </div>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={pickAvatar}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="firstname"
                className="text-sm font-medium text-gray-700"
              >
                Full name
              </label>
              <input
                id="firstname"
                className={FIELD}
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="e.g. Ada Obi"
                required
              />
              <span className="text-xs text-gray-500">
                Make sure this matches your government-issued ID.
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                className={`${FIELD} text-gray-500 cursor-not-allowed`}
                value={email ?? ""}
                readOnly
              />
              <span className="text-xs text-gray-500">
                Contact support if you need to change this.
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="region" className="text-sm font-medium text-gray-700">
                {regionLabel}
              </label>
              <select
                id="region"
                className={FIELD}
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
              >
                <option value="">Select your {regionLabel.toLowerCase()}</option>
                {regionsFor(market.country).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="text-xs text-gray-500">
                We show you orders in this {regionLabel.toLowerCase()}.
              </span>
            </div>

            <Button
              variant="auth"
              type="submit"
              className="w-full sm:w-fit sm:px-8 rounded-md"
              disabled={updateProfile.isPending}
            >
              {updateProfile.isPending ? "Saving…" : "Save changes"}
            </Button>
          </form>
        </SettingsCard>

        <PhoneSettings
          email={email}
          phone={data.data.phone}
          isPhoneVerified={data.data.isPhoneVerified}
          country={data.data.country}
        />

        <PayoutSettings owner="user" country={data.data.country} />
      </div>
    </div>
  );
};
