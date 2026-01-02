"use client";

import React, { useState } from "react";
import { Header } from "@/components/shop/header";
import { Button } from "@/components/button";
import { toast } from "sonner";
import { useUpdateOpeningHours } from "@/services/shops/mutation";
import { useRouter } from "next/navigation";

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

const sampleStandard = {
  monday: { hours: [{ open: "08:00", close: "19:00" }] },
  tuesday: { hours: [{ open: "08:00", close: "19:00" }] },
  wednesday: { hours: [{ open: "08:00", close: "19:00" }] },
  thursday: { hours: [{ open: "08:00", close: "19:00" }] },
  friday: { hours: [{ open: "08:00", close: "19:00" }] },
  saturday: { hours: [{ open: "10:00", close: "16:00" }] },
  sunday: { isClosed: true },
};

export default function OpeningHours() {
  const [state, setState] = useState<OpeningHoursState>(defaultState);
  const router = useRouter();
  const { mutate, isPending } = useUpdateOpeningHours();

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

  function loadSample(sample: OpeningHoursState | any) {
    const normalized = DAYS.reduce((acc, d) => {
      if (sample[d]?.isClosed) acc[d] = { isClosed: true };
      else if (sample[d]?.hours) acc[d] = { hours: sample[d].hours };
      else acc[d] = { hours: [] };
      return acc;
    }, {} as OpeningHoursState);
    setState(normalized);
  }

  function buildRequestBody() {
    const openingHours = DAYS.reduce((acc, d) => {
      const entry = state[d];
      if (!entry) return acc;
      if (entry.isClosed) acc[d] = { isClosed: true };
      else if (entry.hours && entry.hours.length > 0)
        acc[d] = { hours: entry.hours };
      return acc;
    }, {} as Record<string, any>);
    return { openingHours };
  }

  async function handleSubmit() {
    const payload = buildRequestBody();
    mutate(payload, {
      onSuccess: (data) => {
        toast.success(data?.message || "Opening hours updated");
        try {
          router.push("/shop/complete");
        } catch (e) {
          // ignore navigation errors in non-router contexts
        }
      },
      onError: (err: any) => {
        toast.error(err?.message || "Failed to update opening hours");
      },
    });
  }

  return (
    <section className="min-h-screen flex flex-col py-6">
      <Header />
      <div className="max-w-screen-xl mx-auto px-4 w-full">
        <div className="flex items-start gap-8 flex-col md:flex-row">
          <div className="w-full md:w-2/3 bg-white rounded-lg shadow p-2">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl font-semibold">Opening Hours</h1>
                <p className="text-sm text-gray-500">
                  Configure your store's daily hours.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setState(defaultState())}
                  className="rounded"
                >
                  Reset
                </Button>
                <Button
                  variant="auth"
                  onClick={() => loadSample(sampleStandard)}
                  className="rounded"
                >
                  Load Standard
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {DAYS.map((day) => {
                const entry = state[day] || { hours: [] };
                return (
                  <div key={day} className="border rounded p-3">
                    <div className="flex items-center justify-between">
                      <h3 className="capitalize font-medium">{day}</h3>
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
                      <div className="mt-3 space-y-2">
                        {!(entry.hours || []).length && (
                          <div className="text-sm text-gray-500">
                            No interval set. Add one below.
                          </div>
                        )}

                        {(entry.hours || [])[0] ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              value={(entry.hours || [])[0].open}
                              onChange={(e) =>
                                updateInterval(day, "open", e.target.value)
                              }
                              className="border rounded px-2 py-1 w-32"
                            />
                            <span className="text-sm text-gray-500">to</span>
                            <input
                              type="time"
                              value={(entry.hours || [])[0].close}
                              onChange={(e) =>
                                updateInterval(day, "close", e.target.value)
                              }
                              className="border rounded px-2 py-1 w-32"
                            />
                            <Button
                              variant="ghost"
                              onClick={() => removeInterval(day)}
                              className="ml-2"
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Button
                              variant="secondary"
                              onClick={() => addInterval(day)}
                            >
                              + Add Interval
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Button
                onClick={handleSubmit}
                disabled={isPending}
                variant="auth"
              >
                {isPending ? "Preparing..." : "Save Opening Hours"}
              </Button>
            </div>
          </div>

          {/* <aside className="w-full md:w-1/3">
            <div className="bg-white rounded-lg shadow p-4">
              <h4 className="font-medium mb-2">Request Preview</h4>
              <pre className="text-xs bg-gray-100 p-3 rounded max-h-96 overflow-auto">
                {JSON.stringify(buildRequestBody(), null, 2)}
              </pre>
            </div>
          </aside> */}
        </div>
      </div>
    </section>
  );
}
