/**
 * Onboarding as a described sequence rather than a chain of redirects.
 *
 * Each flow was a series of `router.push` calls in mutation callbacks, with no
 * record of where anyone had got to. A refresh dropped the user into an empty
 * form, there was no way back, and nothing could route them to a step they had
 * skipped — several steps were only reachable by walking forward from the
 * start.
 *
 * What counts as complete is the server's own rule: `evaluateKYCSubmission`
 * decides whether a KYC has been submitted, and this list has to agree with it.
 * It did not — it asked shoppers for a vehicle they are never required to
 * supply, treated a store's business document as optional when the server
 * requires it, and offered no guarantor step at all, so no rider or shopper
 * could reach a submitted KYC through the website.
 */

import { Country } from "@/lib/markets/types";

export type OnboardingRole = "store" | "rider" | "shopper";

/**
 * A literal union rather than `string`, so `STEPS` cannot hold a key nothing
 * checks. These are also persisted server-side, so: add, never rename.
 */
export type OnboardingStepKey =
  | "verify-email"
  | "country"
  | "profile"
  | "phone"
  | "identity"
  | "business-document"
  | "hours"
  | "vehicle"
  | "vehicle-registration"
  | "vehicle-insurance"
  | "guarantor"
  | "bank";

export interface OnboardingStep {
  key: OnboardingStepKey;
  /** Shown in the stepper. Short enough to read at a glance. */
  label: string;
  path: string;
  /**
   * Steps a user may legitimately leave for later — nothing they need on day
   * one is gated on them, and every one has a screen in the dashboard that can
   * still create the record afterwards. This flag is the only thing that
   * decides whether a step offers a skip and whether it can wall a dashboard.
   */
  optional?: boolean;
  /** Wording for the skip affordance. Only read when `optional`. */
  skipLabel?: string;
  /**
   * What the dashboard says about it once skipped. Names the consequence, so
   * the reminder is useful rather than nagging.
   */
  nudge?: string;
}

/** Vehicles that need a registration and an insurance certificate as well. */
const DOCUMENTED_VEHICLES = ["car", "truck", "van"];

const STORE_STEPS: OnboardingStep[] = [
  { key: "verify-email", label: "Verify email", path: "/shop/verify-email" },
  { key: "country", label: "Location", path: "/shop/country" },
  { key: "identity", label: "Your ID", path: "/shop/complete" },
  // Not optional: the server will not treat a store's KYC as submitted without
  // it, so offering a skip promised something it could not deliver.
  {
    key: "business-document",
    label: "Business docs",
    path: "/shop/business-document",
  },
  { key: "profile", label: "Store profile", path: "/shop/setup-profile" },
  {
    key: "hours",
    label: "Opening hours",
    path: "/shop/opening-hours",
    optional: true,
    skipLabel: "Set these later",
    nudge: "Set your opening hours so customers know when you're open.",
  },
  {
    key: "bank",
    label: "Payouts",
    path: "/shop/account",
    optional: true,
    skipLabel: "Add this later",
    nudge: "Add your payout details so you can withdraw your earnings.",
  },
];

const riderSteps = (needsVehicleDocs: boolean): OnboardingStep[] => [
  { key: "verify-email", label: "Verify email", path: "/rider/auth/otp" },
  { key: "country", label: "Location", path: "/rider/country" },
  { key: "profile", label: "Your details", path: "/rider/auth" },
  {
    key: "phone",
    label: "Phone",
    path: "/rider/verify-phonenumber",
    optional: true,
    skipLabel: "I'll verify later",
    nudge: "Verify your phone number to start accepting orders.",
  },
  { key: "identity", label: "Your ID", path: "/rider/complete" },
  { key: "vehicle", label: "Vehicle", path: "/rider/vechicle" },
  ...(needsVehicleDocs
    ? ([
        {
          key: "vehicle-registration",
          label: "Registration",
          path: "/rider/vehicle-registration",
        },
        {
          key: "vehicle-insurance",
          label: "Insurance",
          path: "/rider/vehicle-insurance",
        },
      ] as OnboardingStep[])
    : []),
  { key: "guarantor", label: "Guarantor", path: "/rider/guarantor" },
  {
    key: "bank",
    label: "Payouts",
    path: "/rider/account",
    optional: true,
    skipLabel: "Add this later",
    nudge: "Add your payout details so you can withdraw your earnings.",
  },
];

// No vehicle step: a personal shopper is never asked for one, and the server's
// shopper rule requires only an ID and a guarantor.
const SHOPPER_STEPS: OnboardingStep[] = [
  { key: "verify-email", label: "Verify email", path: "/shopper/auth/otp" },
  { key: "country", label: "Location", path: "/shopper/country" },
  { key: "profile", label: "Your details", path: "/shopper/auth" },
  {
    key: "phone",
    label: "Phone",
    path: "/shopper/verify-phonenumber",
    optional: true,
    skipLabel: "I'll verify later",
    nudge: "Verify your phone number to start accepting orders.",
  },
  { key: "identity", label: "Your ID", path: "/shopper/complete" },
  { key: "guarantor", label: "Guarantor", path: "/shopper/guarantor" },
  {
    key: "bank",
    label: "Payouts",
    path: "/shopper/account",
    optional: true,
    skipLabel: "Add this later",
    nudge: "Add your payout details so you can withdraw your earnings.",
  },
];

export const dashboardFor: Record<OnboardingRole, string> = {
  store: "/shop/dashboard",
  rider: "/rider/dashboard",
  shopper: "/shopper/dashboard",
};

interface KycView {
  status?: string;
  remark?: string;
  identification?: unknown;
  businessDocument?: unknown;
  guarantor?: unknown;
  vehicle?: { vehicleType?: string } | null;
  vehicleRegistration?: unknown;
  insuranceCertificate?: unknown;
}

/** What we can see of a profile, from GET /stores/profile or /users/profile. */
export interface OnboardingProfile {
  country?: Country;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  isKYCVerified?: boolean;
  kyc?: KycView | null;
  /** Recorded server-side as each step's write lands. */
  completedOnboardingSteps?: OnboardingStepKey[];
  /** Store. */
  name?: string;
  address?: string;
  openingHours?: unknown;
  /** Rider and shopper. */
  firstname?: string;
  state?: string;
}

/**
 * The steps this account has to complete.
 *
 * A rider's list is not fixed: a bike needs no registration or insurance, a car
 * does, so the length depends on the vehicle they chose.
 */
export function stepsFor(
  role: OnboardingRole,
  profile?: OnboardingProfile | null,
): OnboardingStep[] {
  if (role === "store") return STORE_STEPS;
  if (role === "shopper") return SHOPPER_STEPS;

  const vehicleType = profile?.kyc?.vehicle?.vehicleType;
  return riderSteps(
    !!vehicleType && DOCUMENTED_VEHICLES.includes(vehicleType),
  );
}

/**
 * A store has answered this step when at least one day says something.
 *
 * Every store is created with seven days of `{isClosed: false, hours: []}`, so
 * counting keys — which this used to do — reported the *absence* of an answer
 * as an answer, for every store ever created. That in turn marked the country
 * step complete, and neither screen was ever reached.
 */
const hasOpeningHours = (hours: unknown): boolean => {
  if (!hours || typeof hours !== "object") return false;

  return Object.values(
    hours as Record<string, { isClosed?: boolean; hours?: unknown[] } | null>,
  ).some((day) => day?.isClosed === true || (day?.hours?.length ?? 0) > 0);
};

/**
 * Which steps are already done.
 *
 * The union of what the server recorded and what the profile still shows —
 * a union rather than a preference, because an account can have a recorded
 * `country` and a `profile` that predates recording, so neither source alone
 * is complete. Every rule only ever adds, so this cannot send anyone backwards.
 */
export function completedSteps(
  role: OnboardingRole,
  profile: OnboardingProfile | null | undefined,
  hasBank: boolean,
): Set<OnboardingStepKey> {
  const done = new Set<OnboardingStepKey>();
  if (!profile) return done;

  for (const key of profile.completedOnboardingSteps ?? []) done.add(key);

  const kyc = profile.kyc;

  if (profile.isEmailVerified) done.add("verify-email");
  // The document itself, not the row: a blank KYC row is created by several
  // unrelated uploads, so its existence proved nothing.
  if (kyc?.identification) done.add("identity");
  if (hasBank) done.add("bank");

  if (role === "store") {
    if (profile.name && profile.address) done.add("profile");
    if (hasOpeningHours(profile.openingHours)) done.add("hours");
    if (kyc?.businessDocument) done.add("business-document");
    return done;
  }

  if (profile.firstname && profile.state) done.add("profile");
  if (profile.isPhoneVerified) done.add("phone");
  if (kyc?.guarantor) done.add("guarantor");

  if (role === "rider") {
    if (kyc?.vehicle) done.add("vehicle");
    if (kyc?.vehicleRegistration) done.add("vehicle-registration");
    if (kyc?.insuranceCertificate) done.add("vehicle-insurance");
  }

  return done;
}

/** The first step still outstanding, or null when onboarding is finished. */
export function nextStep(
  role: OnboardingRole,
  profile: OnboardingProfile | null | undefined,
  hasBank: boolean,
): OnboardingStep | null {
  const done = completedSteps(role, profile, hasBank);
  return stepsFor(role, profile).find((step) => !done.has(step.key)) ?? null;
}

/**
 * The first outstanding step that cannot be deferred, or null.
 *
 * This is what may hold a dashboard closed. `nextStep` cannot: it returns
 * optional steps too, so gating on it meant a skip button changed nothing —
 * pressing skip landed on the dashboard, which sent the user back to the step
 * they had just skipped.
 */
export function nextRequiredStep(
  role: OnboardingRole,
  profile: OnboardingProfile | null | undefined,
  hasBank: boolean,
): OnboardingStep | null {
  const done = completedSteps(role, profile, hasBank);
  return (
    stepsFor(role, profile).find(
      (step) => !step.optional && !done.has(step.key),
    ) ?? null
  );
}

/** Steps that were deferred and are still outstanding, for the dashboard nudge. */
export function skippedSteps(
  role: OnboardingRole,
  profile: OnboardingProfile | null | undefined,
  hasBank: boolean,
): OnboardingStep[] {
  const done = completedSteps(role, profile, hasBank);
  return stepsFor(role, profile).filter(
    (step) => step.optional && !done.has(step.key),
  );
}

/**
 * Where "skip" goes, and what to call it. Null when the step cannot be skipped.
 *
 * Deliberately not `pathAfter`. That marks the step done for routing purposes,
 * which is the one assumption a skip violates, and when nothing is left ahead
 * it walks *backwards* — so `pathAfter("bank")` on a part-built account returns
 * the email step. Skipping only ever moves forward, then out to the dashboard.
 */
export function skipFor(
  role: OnboardingRole,
  stepKey: OnboardingStepKey,
  profile: OnboardingProfile | null | undefined,
  done: Set<OnboardingStepKey>,
): { path: string; label: string } | null {
  const steps = stepsFor(role, profile);
  const from = steps.findIndex((step) => step.key === stepKey);
  if (from < 0 || !steps[from].optional) return null;

  return {
    path:
      steps.slice(from + 1).find((step) => !done.has(step.key))?.path ??
      dashboardFor[role],
    label: steps[from].skipLabel ?? "Skip for now",
  };
}

/**
 * Where to go after finishing a step.
 *
 * Asked of the sequence rather than hardcoded per page, so a step cannot
 * dead-end, skip its successor, or cross into another role's flow — which is
 * how the phone step came to jump over ID and vehicle for riders and shoppers.
 */
export function pathAfter(
  role: OnboardingRole,
  stepKey: OnboardingStepKey,
  profile: OnboardingProfile | null | undefined,
  hasBank: boolean,
): string {
  const done = completedSteps(role, profile, hasBank);
  done.add(stepKey);

  const steps = stepsFor(role, profile);
  const from = steps.findIndex((step) => step.key === stepKey);

  const ahead = steps.slice(from + 1).find((step) => !done.has(step.key));
  if (ahead) return ahead.path;

  // Nothing after it outstanding, but something before it might be — a skipped
  // optional step, or a step whose data was later cleared.
  return steps.find((step) => !done.has(step.key))?.path ?? dashboardFor[role];
}

/**
 * Whether a step can be opened directly.
 *
 * Completed steps stay reachable so someone can go back and correct an answer,
 * and the next outstanding step is reachable. Anything further ahead is not,
 * so a deep link cannot skip a step and leave a half-built account.
 */
export function canVisit(
  role: OnboardingRole,
  stepKey: OnboardingStepKey,
  profile: OnboardingProfile | null | undefined,
  hasBank: boolean,
): boolean {
  const done = completedSteps(role, profile, hasBank);
  if (done.has(stepKey)) return true;
  return nextStep(role, profile, hasBank)?.key === stepKey;
}

export const stepIndex = (
  role: OnboardingRole,
  stepKey: OnboardingStepKey,
  profile?: OnboardingProfile | null,
): number => stepsFor(role, profile).findIndex((step) => step.key === stepKey);

/** The step before this one, for back navigation. Null on the first step. */
export function previousStep(
  role: OnboardingRole,
  stepKey: OnboardingStepKey,
  profile?: OnboardingProfile | null,
): OnboardingStep | null {
  const steps = stepsFor(role, profile);
  const index = stepIndex(role, stepKey, profile);
  return index > 0 ? steps[index - 1] : null;
}
