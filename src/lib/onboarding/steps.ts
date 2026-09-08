/**
 * Onboarding as a described sequence rather than a chain of redirects.
 *
 * Each flow was a series of `router.push` calls in mutation callbacks, with no
 * record of where anyone had got to. A refresh dropped the user into an empty
 * form, there was no way back, and nothing could route them to a step they had
 * skipped — several steps were only reachable by walking forward from the
 * start.
 *
 * The current step is derived from the profile the server already returns
 * rather than from a new column: `kyc`, `isKYCVerified`, name/address,
 * openingHours and the presence of a bank account are between them enough to
 * say how far someone has got.
 */

import { Country } from "@/lib/markets/types";

export type OnboardingRole = "store" | "rider" | "shopper";

export interface OnboardingStep {
  key: string;
  /** Shown in the stepper. Short enough to read at a glance. */
  label: string;
  path: string;
  /** Steps a user may legitimately leave for later. */
  optional?: boolean;
}

const STORE_STEPS: OnboardingStep[] = [
  { key: "verify-email", label: "Verify email", path: "/shop/verify-email" },
  { key: "country", label: "Location", path: "/shop/country" },
  { key: "identity", label: "Your ID", path: "/shop/complete" },
  {
    key: "business-document",
    label: "Business docs",
    path: "/shop/business-document",
    optional: true,
  },
  { key: "profile", label: "Store profile", path: "/shop/setup-profile" },
  { key: "hours", label: "Opening hours", path: "/shop/opening-hours" },
  { key: "bank", label: "Payouts", path: "/shop/account", optional: true },
];

const RIDER_STEPS: OnboardingStep[] = [
  { key: "verify-email", label: "Verify email", path: "/rider/auth/otp" },
  { key: "country", label: "Location", path: "/rider/country" },
  { key: "profile", label: "Your details", path: "/rider/auth" },
  { key: "phone", label: "Phone", path: "/rider/verify-phonenumber" },
  { key: "identity", label: "Your ID", path: "/rider/complete" },
  { key: "vehicle", label: "Vehicle", path: "/rider/vechicle" },
  { key: "bank", label: "Payouts", path: "/rider/account" },
];

const SHOPPER_STEPS: OnboardingStep[] = [
  { key: "verify-email", label: "Verify email", path: "/shopper/auth/otp" },
  { key: "country", label: "Location", path: "/shopper/country" },
  { key: "profile", label: "Your details", path: "/shopper/auth" },
  { key: "phone", label: "Phone", path: "/shopper/verify-phonenumber" },
  { key: "identity", label: "Your ID", path: "/shopper/complete" },
  { key: "vehicle", label: "Vehicle", path: "/shopper/vechicle" },
  { key: "bank", label: "Payouts", path: "/shopper/account" },
];

export const STEPS: Record<OnboardingRole, OnboardingStep[]> = {
  store: STORE_STEPS,
  rider: RIDER_STEPS,
  shopper: SHOPPER_STEPS,
};

export const dashboardFor: Record<OnboardingRole, string> = {
  store: "/shop/dashboard",
  rider: "/rider/dashboard",
  shopper: "/shopper/dashboard",
};

/** What we can see of a profile, from GET /stores/profile or /users/profile. */
export interface OnboardingProfile {
  country?: Country;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  isKYCVerified?: boolean;
  kyc?: { status?: string; remark?: string; vehicle?: unknown } | null;
  /** Store. */
  name?: string;
  address?: string;
  openingHours?: unknown;
  /** Rider and shopper. */
  firstname?: string;
  state?: string;
}

const hasOpeningHours = (hours: unknown) =>
  !!hours && typeof hours === "object" && Object.keys(hours).length > 0;

/**
 * Which steps are already done.
 *
 * `country` is treated as done once any later step has data. The field
 * defaults to NG on the server, so a stored value cannot by itself prove the
 * account holder was asked — but having completed a step that comes after it
 * means they passed through. An account with nothing else done is asked, which
 * is the safe direction to be wrong in.
 */
export function completedSteps(
  role: OnboardingRole,
  profile: OnboardingProfile | null | undefined,
  hasBank: boolean,
): Set<string> {
  const done = new Set<string>();
  if (!profile) return done;

  if (profile.isEmailVerified) done.add("verify-email");
  if (profile.kyc) done.add("identity");
  if (hasBank) done.add("bank");

  if (role === "store") {
    if (profile.name && profile.address) done.add("profile");
    if (hasOpeningHours(profile.openingHours)) done.add("hours");
    // The server does not report whether a business document was uploaded
    // separately from the identity document, so this optional step is treated
    // as done once the profile is set and the user has moved past it.
    if (done.has("profile")) done.add("business-document");
  } else {
    if (profile.firstname && profile.state) done.add("profile");
    if (profile.isPhoneVerified) done.add("phone");
    if (profile.kyc && (profile.kyc as { vehicle?: unknown }).vehicle) {
      done.add("vehicle");
    }
  }

  const laterThanCountry = STEPS[role]
    .slice(2)
    .some((step) => done.has(step.key));
  if (laterThanCountry) done.add("country");

  return done;
}

/** The first step still outstanding, or null when onboarding is finished. */
export function nextStep(
  role: OnboardingRole,
  profile: OnboardingProfile | null | undefined,
  hasBank: boolean,
): OnboardingStep | null {
  const done = completedSteps(role, profile, hasBank);
  return STEPS[role].find((step) => !done.has(step.key)) ?? null;
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
  stepKey: string,
  profile: OnboardingProfile | null | undefined,
  hasBank: boolean,
): boolean {
  const done = completedSteps(role, profile, hasBank);
  if (done.has(stepKey)) return true;
  return nextStep(role, profile, hasBank)?.key === stepKey;
}

export const stepIndex = (role: OnboardingRole, stepKey: string): number =>
  STEPS[role].findIndex((step) => step.key === stepKey);

/** The step before this one, for back navigation. Null on the first step. */
export function previousStep(
  role: OnboardingRole,
  stepKey: string,
): OnboardingStep | null {
  const index = stepIndex(role, stepKey);
  return index > 0 ? STEPS[role][index - 1] : null;
}
