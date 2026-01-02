"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { Header } from "@/components/shop/header";
import { useGetStoreProfile } from "@/services/shops/query";
import {
  useUpdateOpeningHours,
  useUpdateStoreProfile,
} from "@/services/shops/mutation";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

type Interval = { open: string; close: string };
type DayEntry = { hours?: Interval[]; isClosed?: boolean };
type OpeningHoursState = Record<string, DayEntry>;

const defaultHours = (): OpeningHoursState =>
  DAYS.reduce((acc, d) => {
    acc[d] = { hours: [] };
    return acc;
  }, {} as OpeningHoursState);

function StoreProfile() {
  const { data: profile, isLoading, isError } = useGetStoreProfile();
  const { mutate: updateProfile, isPending: isPendingProfile } =
    useUpdateStoreProfile();
  const { mutate: updateOpeningHoursMutate, isPending: isPendingOpeningHours } =
    useUpdateOpeningHours();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    address: "",
    lga: "",
    state: "",
    phone: "",
    avatar: null as File | null,
    lat: "",
    lng: "",
  });

  const [openingHours, setOpeningHours] =
    useState<OpeningHoursState>(defaultHours);

  useEffect(() => {
    if (profile?.data) {
      setFormData({
        name: profile.data.name || "",
        bio: profile.data.bio || "",
        address: profile.data.address || "",
        lga: profile.data.lga || "",
        state: profile.data.state || "",
        phone: profile.data.phone || "",
        avatar: null,
        lat: profile.data.lat || "",
        lng: profile.data.lng || "",
      });
      // Initialize opening hours from profile if present
      if (profile.data.openingHours) {
        const normalized = DAYS.reduce((acc, d) => {
          const entry = profile.data.openingHours[d];
          if (!entry) acc[d] = { hours: [] };
          else if (entry.isClosed) acc[d] = { isClosed: true };
          else acc[d] = { hours: entry.hours || [] };
          return acc;
        }, {} as OpeningHoursState);
        setOpeningHours(normalized);
      }
    }
  }, [profile]);

  const handleSubmit = () => {
    // Ensure avatar is undefined instead of null
    const submitData = {
      ...formData,
      avatar: formData.avatar ?? undefined,
    } as any;
    updateProfile(submitData, {
      onSuccess: () => {
        toast?.success?.("Profile updated successfully");
        setIsEditing(false);
      },
    });
  };

  function handleSaveOpeningHours() {
    const payload = { openingHours };
    updateOpeningHoursMutate(payload, {
      onSuccess: () => {
        toast?.success?.("Opening hours saved");
        setIsEditing(false);
      },
      onError: (err: any) => {
        toast?.error?.(err?.message || "Failed to save opening hours");
      },
    });
  }

  // Opening hours helpers (single interval per day)
  function toggleClosed(day: string) {
    setOpeningHours((s) => ({
      ...s,
      [day]: {
        ...(s[day] || {}),
        isClosed: !s[day]?.isClosed,
        hours: !s[day]?.isClosed ? [] : s[day]?.hours || [],
      },
    }));
  }

  function addInterval(day: string) {
    setOpeningHours((s) => {
      const current = s[day] || { hours: [] };
      if ((current.hours || []).length >= 1) return s;
      return {
        ...s,
        [day]: {
          ...current,
          hours: [{ open: "09:00", close: "17:00" }],
          isClosed: false,
        },
      };
    });
  }

  function updateInterval(day: string, field: keyof Interval, value: string) {
    setOpeningHours((s) => {
      const current = s[day] || { hours: [] };
      const existing = (current.hours || [])[0] || {
        open: "09:00",
        close: "17:00",
      };
      return {
        ...s,
        [day]: { ...current, hours: [{ ...existing, [field]: value }] },
      };
    });
  }

  function removeInterval(day: string) {
    setOpeningHours((s) => ({ ...s, [day]: { ...(s[day] || {}), hours: [] } }));
  }

  if (isLoading) {
    return (
      <section className="min-h-screen flex flex-col">
        <div className="flex items-center justify-center max-w-screen-xl mx-auto px-4 w-full">
          <div className="w-full max-w-md space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <div className="flex justify-center">
              <Skeleton className="h-36 w-36 rounded-full" />
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-h-screen flex flex-col">
        <div className="flex items-center justify-center max-w-screen-xl mx-auto px-4 w-full">
          <div className="text-center text-red-500">
            Failed to load profile. Please try again.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex items-center justify-center max-w-screen-xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-12 w-full">
          <span className="block md:hidden ml-8">
            <Header />
          </span>
          {/* Left: Profile Section */}
          <div className="w-full flex flex-col gap-6 py-4">
            <div>
              <h1 className="text-3xl font-bold">Store Profile</h1>
              <h2 className="text-sm text-gray-600 mt-1">
                {isEditing
                  ? "Edit your store details"
                  : "Your store information"}
              </h2>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center flex-col items-center gap-2">
              <img
                src={
                  formData.avatar
                    ? URL.createObjectURL(formData.avatar)
                    : profile?.data?.avatar?.imageUrl ||
                      "/assets/placeholder.png"
                }
                alt="Store Profile"
                className="h-36 w-36 rounded-md object-cover"
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFormData({ ...formData, avatar: e.target.files[0] });
                    }
                  }}
                />
              )}
            </div>

            {/* Profile Information */}
            <div className="flex flex-col gap-4">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    placeholder="Shop Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px]"
                  />
                  <textarea
                    placeholder="Bio"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] min-h-[100px]"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px]"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Local government"
                      value={formData.lga}
                      onChange={(e) =>
                        setFormData({ ...formData, lga: e.target.value })
                      }
                      className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px]"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px]"
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px]"
                  />
                  <div className="mt-4 border p-3 rounded">
                    <div className="flex items-center justify-between w-full mb-2">
                      <h4 className="font-medium">Opening Hours</h4>
                      <p className="text-sm text-gray-500">
                        Single interval per day
                      </p>
                    </div>
                    <div className="space-y-2">
                      {DAYS.map((d) => {
                        const entry = openingHours[d] || { hours: [] };
                        return (
                          <div
                            key={d}
                            className="flex items-start justify-between gap-2"
                          >
                            <div className="w-1/3 capitalize">{d}</div>
                            <div className="flex flex-wrap md:flex-nowrap items-center gap-2 w-2/3">
                              {entry.isClosed ? (
                                <div className="text-red-500">Closed</div>
                              ) : (entry.hours || [])[0] ? (
                                <>
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="time"
                                      value={(entry.hours || [])[0].open}
                                      onChange={(e) =>
                                        updateInterval(
                                          d,
                                          "open",
                                          e.target.value
                                        )
                                      }
                                      className="border rounded px-2 py-1 w-28"
                                    />
                                    <span className="text-sm text-gray-500">
                                      to
                                    </span>
                                    <input
                                      type="time"
                                      value={(entry.hours || [])[0].close}
                                      onChange={(e) =>
                                        updateInterval(
                                          d,
                                          "close",
                                          e.target.value
                                        )
                                      }
                                      className="border rounded px-2 py-1 w-28"
                                    />
                                  </div>
                                  <Button
                                    variant="ghost"
                                    onClick={() => removeInterval(d)}
                                  >
                                    Remove
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  variant="secondary"
                                  onClick={() => addInterval(d)}
                                >
                                  + Add Interval
                                </Button>
                              )}

                              <label className="flex items-center gap-2 ml-auto text-sm">
                                <input
                                  type="checkbox"
                                  checked={!!entry.isClosed}
                                  onChange={() => toggleClosed(d)}
                                />
                                <span className="text-gray-600">Closed</span>
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-700">Shop Name</h3>
                    <p>{profile?.data?.name || "Not provided"}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-700">Bio</h3>
                    <p>{profile?.data?.bio || "Not provided"}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-700">Address</h3>
                    <p>{profile?.data?.address || "Not provided"}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <h3 className="font-medium text-gray-700">LGA</h3>
                      <p>{profile?.data?.lga || "Not provided"}</p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium text-gray-700">State</h3>
                      <p>{profile?.data?.state || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-700">Phone</h3>
                    <p>{profile?.data?.phone || "Not provided"}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-700">
                        Opening Hours
                      </h3>
                      <Button
                        variant="ghost"
                        onClick={() => setIsEditing(true)}
                        className="text-sm"
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-1 text-sm text-gray-700">
                      {DAYS.map((d) => {
                        const entry = profile?.data?.openingHours?.[d];
                        if (!entry)
                          return (
                            <div key={d} className="flex justify-between">
                              <span className="capitalize">{d}</span>
                              <span className="text-gray-500">Not set</span>
                            </div>
                          );

                        if (entry.isClosed)
                          return (
                            <div key={d} className="flex justify-between">
                              <span className="capitalize">{d}</span>
                              <span className="text-red-500">Closed</span>
                            </div>
                          );

                        const hours = entry.hours?.[0];
                        return (
                          <div key={d} className="flex justify-between">
                            <span className="capitalize">{d}</span>
                            <span className="text-gray-600">
                              {hours
                                ? `${hours.open} - ${hours.close}`
                                : "Not set"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              <div className="flex flex-col md:flex-row w-full gap-4 mt-4">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="w-full md:w-1/3"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="auth"
                      onClick={handleSubmit}
                      disabled={isPendingProfile}
                      className="w-full md:w-1/3"
                    >
                      {isPendingProfile ? "Saving..." : "Save Profile"}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleSaveOpeningHours}
                      disabled={isPendingOpeningHours}
                      className="w-full md:w-1/3"
                    >
                      {isPendingOpeningHours
                        ? "Saving..."
                        : "Save Opening Hours"}
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="auth"
                    onClick={() => setIsEditing(true)}
                    className="w-full"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StoreProfile;
