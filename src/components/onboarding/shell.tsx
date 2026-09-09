"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import {
  OnboardingProfile,
  OnboardingRole,
  OnboardingStepKey,
  previousStep,
  stepIndex,
  stepsFor,
} from "@/lib/onboarding/steps";

/**
 * The frame every onboarding step renders inside.
 *
 * All seven store steps used to re-implement their own header, illustration and
 * two-column grid, and none of them told the user how many steps were left or
 * offered a way back.
 */

interface Props {
  role: OnboardingRole;
  stepKey: OnboardingStepKey;
  title: string;
  description?: string;
  /**
   * Needed for the step list, not just for display: a rider's list is longer
   * when their vehicle needs a registration and an insurance certificate.
   */
  profile?: OnboardingProfile | null;
  /** Which earlier steps are done, for ticks in the stepper. */
  completed?: Set<OnboardingStepKey>;
  /** Where "skip" goes. Omit to hide it. */
  onSkip?: () => void;
  skipLabel?: string;
  children: React.ReactNode;
}

export const OnboardingShell = ({
  role,
  stepKey,
  title,
  description,
  profile,
  completed,
  onSkip,
  skipLabel = "Skip for now",
  children,
}: Props) => {
  const router = useRouter();
  const steps = stepsFor(role, profile);
  const index = stepIndex(role, stepKey, profile);
  const current = index < 0 ? 0 : index;
  const back = previousStep(role, stepKey, profile);
  const progress = ((current + 1) / steps.length) * 100;

  return (
    <section className="min-h-screen bg-white">
      <div className="max-w-screen-2xl w-full px-4 md:px-20 py-8 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <img src="/logo.png" alt="Vinkol" className="w-28 h-12 object-contain" />
          </Link>
          <p className="text-sm text-gray-500">
            Step {current + 1} of {steps.length}
          </p>
        </div>

        {/* Progress. The bar carries the same information as the numbered
            stepper below, which is hidden on small screens. */}
        <div
          className="h-1 w-full bg-gray-100 rounded-full overflow-hidden mb-8"
          role="progressbar"
          aria-valuenow={current + 1}
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-label={`Onboarding progress: step ${current + 1} of ${steps.length}`}
        >
          <div
            className="h-full bg-[var(--color-blue-primary)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <ol className="hidden lg:flex items-center gap-1 mb-10">
          {steps.map((step, i) => {
            const isDone = completed?.has(step.key) && i !== current;
            const isCurrent = i === current;

            return (
              <li key={step.key} className="flex items-center gap-1 flex-1 last:flex-none">
                <span
                  className={
                    isCurrent
                      ? "flex items-center gap-2 text-sm font-semibold text-gray-900"
                      : "flex items-center gap-2 text-sm text-gray-400"
                  }
                >
                  <span
                    className={
                      isDone
                        ? "w-6 h-6 rounded-full bg-[var(--color-blue-primary)] text-white flex items-center justify-center flex-shrink-0"
                        : isCurrent
                          ? "w-6 h-6 rounded-full border-2 border-[var(--color-blue-primary)] text-[var(--color-blue-primary)] text-xs font-bold flex items-center justify-center flex-shrink-0"
                          : "w-6 h-6 rounded-full border border-gray-200 text-xs flex items-center justify-center flex-shrink-0"
                    }
                  >
                    {isDone ? <Check size={13} strokeWidth={3} /> : i + 1}
                  </span>
                  {/* Completed steps stay reachable so an answer can be
                      corrected without starting over. */}
                  {isDone ? (
                    <Link
                      href={step.path}
                      className="whitespace-nowrap hover:text-gray-700 hover:underline underline-offset-4"
                    >
                      {step.label}
                    </Link>
                  ) : (
                    <span className="whitespace-nowrap">{step.label}</span>
                  )}
                </span>
                {i < steps.length - 1 && (
                  <span className="h-px bg-gray-200 flex-1 min-w-4" />
                )}
              </li>
            );
          })}
        </ol>

        <div className="flex items-center h-full justify-center max-w-screen-xl mx-auto w-full">
          <div className="grid grid-cols-1 w-full h-full md:grid-cols-2 gap-12">
            <div className="w-full flex flex-col gap-6">
              {back && (
                <button
                  type="button"
                  onClick={() => router.push(back.path)}
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors w-fit"
                >
                  <ArrowLeft size={16} />
                  Back to {back.label.toLowerCase()}
                </button>
              )}

              <div>
                <h1 className="text-3xl font-bold">{title}</h1>
                {description && (
                  <p className="text-sm text-gray-600 mt-2 max-w-md">
                    {description}
                  </p>
                )}
              </div>

              {children}

              {onSkip && (
                <button
                  type="button"
                  onClick={onSkip}
                  className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4 w-fit"
                >
                  {skipLabel}
                </button>
              )}
            </div>

            <div className="hidden md:block w-full h-full">
              <img
                src="/assets/riderauth.jpg"
                alt=""
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
