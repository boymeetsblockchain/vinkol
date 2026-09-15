"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, Loader2 } from "lucide-react";

import { Button } from "@/components/button";
import { OnboardingShell } from "@/components/onboarding/shell";
import { MARKET_COOKIE } from "@/lib/markets";
import {
  COUNTRIES,
  COUNTRY_NAMES,
  Country,
  isCountry,
} from "@/lib/markets/types";
import {
  OnboardingProfile,
  OnboardingRole,
  OnboardingStepKey,
  completedSteps,
  pathAfter,
} from "@/lib/onboarding/steps";

/**
 * Where the account operates.
 *
 * This is the step that lets a Canadian account exist at all — until now every
 * user, rider and store fell to the server's NG default because no
 * registration or profile endpoint accepted a country.
 *
 * Prefilled from the market the visitor was already browsing (the cookie the
 * middleware and country switcher write), but confirmed rather than assumed: it
 * decides currency, payment methods, payout rails, tax treatment and bank
 * details for the life of the account, and geolocation is wrong often enough
 * that it should not silently make that choice.
 */

const DETAIL: Record<Country, string> = {
  NG: "Paid in naira. Withdraw to a Nigerian bank account.",
  CA: "Paid in Canadian dollars. Withdraw by Interac e-Transfer or bank deposit.",
};

const readCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
};

interface Props {
  role: OnboardingRole;
  /** Persists the choice. Resolves when the profile has been updated. */
  onSubmit: (country: Country) => Promise<void>;
  isPending?: boolean;
  /** Already-stored country, when returning to this step to change it. */
  current?: Country;
  profile?: OnboardingProfile | null;
  hasBank?: boolean;
}

export const CountryStep = ({
  role,
  onSubmit,
  isPending,
  current,
  profile,
  hasBank = false,
}: Props) => {
  const router = useRouter();
  const [selected, setSelected] = useState<Country | null>(current ?? null);

  useEffect(() => {
    if (selected) return;
    const remembered = readCookie(MARKET_COOKIE);
    if (isCountry(remembered)) setSelected(remembered);
  }, [selected]);

  const completed: Set<OnboardingStepKey> = completedSteps(
    role,
    profile,
    hasBank,
  );

  const submit = async () => {
    if (!selected) return;
    try {
      await onSubmit(selected);
      router.push(pathAfter(role, "country", profile, hasBank));
    } catch (error: any) {
      toast.error(error?.message ?? "Could not save your location.");
    }
  };

  return (
    <OnboardingShell
      role={role}
      stepKey="country"
      profile={profile}
      title="Where do you operate?"
      description="This sets your currency, how you get paid, and the details we need for payouts. It cannot be changed later without contacting support."
      completed={completed}
    >
      <div className="flex flex-col gap-3">
        {COUNTRIES.map((country) => {
          const isSelected = selected === country;

          return (
            <button
              key={country}
              type="button"
              onClick={() => setSelected(country)}
              aria-pressed={isSelected}
              className={
                isSelected
                  ? "flex items-start gap-3 text-left rounded-xl border-2 border-[var(--color-blue-primary)] bg-blue-50/40 p-4 transition-colors"
                  : "flex items-start gap-3 text-left rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors"
              }
            >
              <span
                className={
                  isSelected
                    ? "mt-0.5 w-5 h-5 rounded-full bg-[var(--color-blue-primary)] text-white flex items-center justify-center flex-shrink-0"
                    : "mt-0.5 w-5 h-5 rounded-full border border-gray-300 flex-shrink-0"
                }
              >
                {isSelected && <Check size={12} strokeWidth={3} />}
              </span>
              <span>
                <span className="block font-semibold text-gray-900">
                  {COUNTRY_NAMES[country]}
                </span>
                <span className="block text-sm text-gray-500 mt-0.5">
                  {DETAIL[country]}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <Button
        variant="auth"
        className="w-full rounded-md mt-2"
        onClick={submit}
        disabled={!selected || isPending}
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <Loader2 size={16} className="animate-spin" />
            Saving…
          </span>
        ) : (
          "Continue"
        )}
      </Button>
    </OnboardingShell>
  );
};
