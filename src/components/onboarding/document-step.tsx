"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/button";
import { OnboardingShell } from "@/components/onboarding/shell";
import {
  OnboardingProfile,
  OnboardingRole,
  OnboardingStepKey,
  pathAfter,
} from "@/lib/onboarding/steps";

/**
 * A document upload step: pick a type, attach an image, submit.
 *
 * Six pages implemented this identically — the three identity steps, two
 * vehicle steps and the business-document step — each with their own copy of
 * the logo, layout and file input. One of them is why a shopper's vehicle step
 * navigated into the *rider* marketing page on success.
 */

const MAX_BYTES = 2 * 1024 * 1024;

interface Props {
  role: OnboardingRole;
  stepKey: OnboardingStepKey;
  title: string;
  description: string;
  /**
   * Form field for the selected type, e.g. "idType". Omit all three for a
   * document that has no type to choose — a registration or an insurance
   * certificate is just a file.
   */
  typeField?: string;
  typeLabel?: string;
  options?: { value: string; label: string }[];
  imageLabel: string;
  submitLabel: string;
  isPending: boolean;
  /** Given the built FormData, performs the upload. */
  onSubmit: (
    body: FormData,
    handlers: { onSuccess: () => void; onError: (error: Error) => void },
  ) => void;
  profile?: OnboardingProfile | null;
  hasBank?: boolean;
  /** Shown as "skip" when the step is genuinely optional. */
  skipPath?: string;
  completed?: Set<OnboardingStepKey>;
}

export const DocumentStep = ({
  role,
  stepKey,
  title,
  description,
  typeField,
  typeLabel,
  options,
  imageLabel,
  submitLabel,
  isPending,
  onSubmit,
  profile,
  hasBank = false,
  skipPath,
  completed,
}: Props) => {
  const router = useRouter();
  const [type, setType] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (typeField && !type) {
      toast.error(`Please choose a ${(typeLabel ?? "type").toLowerCase()}.`);
      return;
    }
    if (!image) {
      toast.error("Please attach a photo of the document.");
      return;
    }
    // Caught here rather than by the upload failing, so the message is useful.
    if (image.size > MAX_BYTES) {
      toast.error("That file is larger than 2MB. Please attach a smaller one.");
      return;
    }

    const body = new FormData();
    if (typeField) body.append(typeField, type);
    body.append("image", image);

    onSubmit(body, {
      onSuccess: () => {
        toast.success("Uploaded.");
        // Asked of the sequence, so this step cannot skip its successor.
        router.push(pathAfter(role, stepKey, profile, hasBank));
      },
      onError: (error) =>
        toast.error(error.message || "Upload failed. Please try again."),
    });
  };

  return (
    <OnboardingShell
      role={role}
      stepKey={stepKey}
      profile={profile}
      title={title}
      description={description}
      completed={completed}
      onSkip={skipPath ? () => router.push(skipPath) : undefined}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {typeField && (
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="docType"
              className="text-sm font-medium text-gray-700"
            >
              {typeLabel}
            </label>
            <select
              id="docType"
              className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)]"
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={isPending}
              required
            >
              <option value="">
                Select {(typeLabel ?? "type").toLowerCase()}
              </option>
              {(options ?? []).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="docImage" className="text-sm font-medium text-gray-700">
            {imageLabel}
          </label>
          <input
            id="docImage"
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
          {isPending ? "Uploading…" : submitLabel}
        </Button>
      </form>
    </OnboardingShell>
  );
};
