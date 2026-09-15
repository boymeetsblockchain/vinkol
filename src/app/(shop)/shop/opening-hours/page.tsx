"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/button";
import { OnboardingShell } from "@/components/onboarding/shell";
import { completedSteps, pathAfter } from "@/lib/onboarding/steps";
import { useBank } from "@/services/banks/query";
import { useUpdateOpeningHours } from "@/services/shops/mutation";
import { useGetStoreProfile } from "@/services/shops/query";

type Interval = { open: string; close: string };
type DayEntry = { hours?: Interval[]; isClosed?: boolean };
type OpeningHoursState = Record<string, DayEntry>;

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const defaultState = (): OpeningHoursState =>
  DAYS.reduce((acc, d) => {
    acc[d] = { hours: [] };
    return acc;
  }, {} as OpeningHoursState);

const sampleStandard: OpeningHoursState = {
  monday: { hours: [{ open: "08:00", close: "19:00" }] },
  tuesday: { hours: [{ open: "08:00", close: "19:00" }] },
  wednesday: { hours: [{ open: "08:00", close: "19:00" }] },
  thursday: { hours: [{ open: "08:00", close: "19:00" }] },
  friday: { hours: [{ open: "08:00", close: "19:00" }] },
  saturday: { hours: [{ open: "10:00", close: "16:00" }] },
  sunday: { isClosed: true },
};

/** One shape, whether it came from a sample or from the store's own record. */
const normalize = (source: Record<string, DayEntry> | undefined | null) =>
  DAYS.reduce((acc, d) => {
    const day = source?.[d];
    if (day?.isClosed) acc[d] = { isClosed: true };
    else if (day?.hours?.length) acc[d] = { hours: day.hours };
    else acc[d] = { hours: [] };
    return acc;
  }, {} as OpeningHoursState);

export default function OpeningHours() {
  const router = useRouter();
  const [state, setState] = useState<OpeningHoursState>(defaultState);
  const [failure, setFailure] = useState("");

  const { data: profileData } = useGetStoreProfile();
  const { data: bank } = useBank("store");
  const profile = profileData?.data;

  const { mutate, isPending } = useUpdateOpeningHours();

  // Seeded once, so editing is not undone by a background refetch. Without
  // this the form was empty on re-entry even though the step showed as done.
  const seeded = useRef(false);
  useEffect(() => {
    if (seeded.current || !profile?.openingHours) return;
    seeded.current = true;
    setState(normalize(profile.openingHours as Record<string, DayEntry>));
  }, [profile?.openingHours]);

  function toggleClosed(day: string) {
    setState((s) => ({
      ...s,
      [day]: {
        ...(s[day] || {}),
        isClosed: !s[day]?.isClosed,
        hours: !s[day]?.isClosed ? [] : s[day]?.hours || [],
      },
    }));
  }

  function addInterval(day: string) {
    setState((s) => {
      const current = s[day] || { hours: [] };
      // Enforce single interval per day
      if ((current.hours || []).length >= 1) return s;
      const hours = [{ open: "09:00", close: "17:00" }];
      return { ...s, [day]: { ...current, hours, isClosed: false } };
    });
  }

  function updateInterval(day: string, field: keyof Interval, value: string) {
    setState((s) => {
      const current = s[day] || { hours: [] };
      const existing = (current.hours || [])[0] || {
        open: "09:00",
        close: "17:00",
      };
      const hours = [{ ...existing, [field]: value }];
      return { ...s, [day]: { ...current, hours } };
    });
  }

  function removeInterval(day: string) {
    setState((s) => {
      const current = s[day] || { hours: [] };
      return { ...s, [day]: { ...current, hours: [] } };
    });
  }

  function buildRequestBody() {
    const openingHours = DAYS.reduce(
      (acc, d) => {
        const entry = state[d];
        if (!entry) return acc;
        if (entry.isClosed) acc[d] = { isClosed: true };
        else if (entry.hours && entry.hours.length > 0)
          acc[d] = { hours: entry.hours };
        return acc;
      },
      {} as Record<string, DayEntry>,
    );
    return { openingHours };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFailure("");

    const { openingHours } = buildRequestBody();

    // The server records nothing for a day that is neither closed nor open,
    // so an untouched form would save nothing and still look saved.
    if (Object.keys(openingHours).length === 0) {
      setFailure(
        "Set hours for at least one day, or mark the days you are closed.",
      );
      return;
    }

    mutate(
      { openingHours },
      {
        onSuccess: () => {
          toast.success("Opening hours saved.");
          router.push(pathAfter("store", "hours", profile, !!bank));
        },
        // The mutation reports the failure itself; this keeps it on the page
        // instead of only in a toast that disappears.
        onError: (error: any) =>
          setFailure(
            error?.message || "Could not save your hours. Please try again.",
          ),
      },
    );
  }

  return (
    <OnboardingShell
      role="store"
      stepKey="hours"
      profile={profile}
      title="When are you open?"
      description="Customers only see your shop during these hours, and orders are not sent to you outside them."
      completed={completedSteps("store", profile, !!bank)}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="auth"
            onClick={() => setState(normalize(sampleStandard))}
            className="rounded-md"
          >
            Use standard hours
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setState(defaultState())}
            className="rounded-md"
          >
            Clear
          </Button>
        </div>

        <div className="space-y-3">
          {DAYS.map((day) => {
            const entry = state[day] || { hours: [] };
            return (
              <div key={day} className="border border-gray-200 rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <h3 className="capitalize font-medium text-gray-900">
                    {day}
                  </h3>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={!!entry.isClosed}
                      onChange={() => toggleClosed(day)}
                    />
                    <span className="text-gray-600">Closed</span>
                  </label>
                </div>

                {!entry.isClosed && (
                  <div className="mt-3">
                    {(entry.hours || [])[0] ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={(entry.hours || [])[0].open}
                          onChange={(e) =>
                            updateInterval(day, "open", e.target.value)
                          }
                          className="border border-gray-200 rounded-lg px-2 py-1 w-32"
                        />
                        <span className="text-sm text-gray-500">to</span>
                        <input
                          type="time"
                          value={(entry.hours || [])[0].close}
                          onChange={(e) =>
                            updateInterval(day, "close", e.target.value)
                          }
                          className="border border-gray-200 rounded-lg px-2 py-1 w-32"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => removeInterval(day)}
                          className="ml-2"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => addInterval(day)}
                      >
                        + Set hours
                      </Button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {failure && (
          <p
            role="alert"
            className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
          >
            {failure}
          </p>
        )}

        <Button
          variant="auth"
          type="submit"
          className="w-full rounded-md"
          disabled={isPending}
        >
          {isPending ? "Saving…" : "Save opening hours"}
        </Button>
      </form>
    </OnboardingShell>
  );
}
