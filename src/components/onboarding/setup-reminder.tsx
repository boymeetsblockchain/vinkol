"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

import {
  OnboardingProfile,
  OnboardingRole,
  skippedSteps,
} from "@/lib/onboarding/steps";

/**
 * What is still outstanding after a skip.
 *
 * Optional steps no longer hold the dashboard closed, so without this a rider
 * who deferred phone verification would reach a list of orders and simply be
 * refused when they tried to accept one — the server's 403 being the only
 * explanation they ever saw. Each line names the consequence rather than
 * nagging; the wording lives on the step in `steps.ts`.
 *
 * Dismissal is per session on purpose. Permanently hiding the reason someone
 * cannot earn is worse than showing a banner they have already read once.
 */
export const SetupReminder = ({
  role,
  profile,
  hasBank,
}: {
  role: OnboardingRole;
  profile: OnboardingProfile | null | undefined;
  hasBank: boolean;
}) => {
  const [dismissed, setDismissed] = useState(true);

  // Read after mount: sessionStorage is not available while rendering on the
  // server, and assuming "not dismissed" would flash the banner every load.
  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(`setup-reminder-${role}`) === "1");
    } catch {
      setDismissed(false);
    }
  }, [role]);

  const outstanding = skippedSteps(role, profile, hasBank);
  // Without a profile every optional step reads as outstanding, so a
  // signed-out visitor was told they had two things left to finish.
  if (!profile || dismissed || !outstanding.length) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(`setup-reminder-${role}`, "1");
    } catch {
      // Dismissed for this render either way.
    }
  };

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5 mb-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-amber-900">
            {outstanding.length === 1
              ? "One thing left to finish"
              : `${outstanding.length} things left to finish`}
          </p>
          <ul className="flex flex-col gap-1.5">
            {outstanding.map((step) => (
              <li
                key={step.key}
                className="text-sm text-amber-900 flex flex-wrap items-center gap-x-2"
              >
                <span>{step.nudge ?? `Finish ${step.label.toLowerCase()}.`}</span>
                <Link
                  href={step.path}
                  className="font-semibold underline underline-offset-4 hover:no-underline"
                >
                  {step.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="text-amber-700 hover:text-amber-900 flex-shrink-0"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
