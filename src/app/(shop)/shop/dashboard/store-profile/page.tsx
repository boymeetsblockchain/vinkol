"use client";

import { useEffect, useRef, useState } from "react";
import { useGetStoreProfile } from "@/services/shops/query";
import { useUpdateOpeningHours, useUpdateStoreProfile } from "@/services/shops/mutation";
import { toast } from "sonner";
import { Camera, Clock, MapPin, Phone, Store, User, X, Plus, Check, Pencil } from "lucide-react";

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

type Interval = { open: string; close: string };
type DayEntry = { hours?: Interval[]; isClosed?: boolean };
type OpeningHoursState = Record<string, DayEntry>;

const defaultHours = (): OpeningHoursState =>
  DAYS.reduce((acc, d) => { acc[d] = { hours: [] }; return acc; }, {} as OpeningHoursState);

// ─── Field row (view mode) ────────────────────────────────────────────────────
const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mt-0.5">
      <Icon size={14} className="text-[var(--color-blue-primary)]" />
    </span>
    <div>
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
      <p className="text-sm text-gray-800 mt-0.5">{value || "Not provided"}</p>
    </div>
  </div>
);

// ─── Input ────────────────────────────────────────────────────────────────────
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
    {children}
  </div>
);

const inputCls = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition";

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const ProfileSkeleton = () => (
  <div className="p-5 md:p-8 animate-pulse">
    <div className="h-7 w-40 bg-gray-100 rounded mb-8" />
    <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-100" />
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-100 rounded" />
          <div className="h-4 w-48 bg-gray-100 rounded" />
        </div>
      </div>
      {[...Array(4)].map((_, i) => <div key={i} className="h-12 bg-gray-100 rounded-xl mb-3" />)}
    </div>
  </div>
);

function StoreProfile() {
  const { data: profile, isLoading, isError } = useGetStoreProfile();
  const { mutate: updateProfile, isPending: isPendingProfile } = useUpdateStoreProfile();
  const { mutate: updateOpeningHoursMutate, isPending: isPendingHours } = useUpdateOpeningHours();
  const [isEditing, setIsEditing] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "", bio: "", address: "", lga: "", state: "", phone: "",
    avatar: null as File | null, lat: "", lng: "",
  });
  const [openingHours, setOpeningHours] = useState<OpeningHoursState>(defaultHours);

  useEffect(() => {
    if (profile?.data) {
      setFormData({
        name: profile.data.name || "", bio: profile.data.bio || "",
        address: profile.data.address || "", lga: profile.data.lga || "",
        state: profile.data.state || "", phone: profile.data.phone || "",
        avatar: null, lat: profile.data.lat || "", lng: profile.data.lng || "",
      });
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

  const set = (key: string, val: any) => setFormData((f) => ({ ...f, [key]: val }));

  function toggleClosed(day: string) {
    setOpeningHours((s) => ({
      ...s,
      [day]: { ...s[day], isClosed: !s[day]?.isClosed, hours: !s[day]?.isClosed ? [] : s[day]?.hours || [] },
    }));
  }
  function addInterval(day: string) {
    setOpeningHours((s) => {
      if ((s[day]?.hours || []).length >= 1) return s;
      return { ...s, [day]: { ...s[day], hours: [{ open: "09:00", close: "17:00" }], isClosed: false } };
    });
  }
  function updateInterval(day: string, field: keyof Interval, value: string) {
    setOpeningHours((s) => {
      const existing = (s[day]?.hours || [])[0] || { open: "09:00", close: "17:00" };
      return { ...s, [day]: { ...s[day], hours: [{ ...existing, [field]: value }] } };
    });
  }
  function removeInterval(day: string) {
    setOpeningHours((s) => ({ ...s, [day]: { ...s[day], hours: [] } }));
  }

  const handleSaveProfile = () => {
    updateProfile({ ...formData, avatar: formData.avatar ?? undefined } as any, {
      onSuccess: () => { toast.success("Profile updated!"); setIsEditing(false); },
      onError: (err: any) => toast.error(err?.message || "Failed to update profile"),
    });
  };
  const handleSaveHours = () => {
    updateOpeningHoursMutate({ openingHours }, {
      onSuccess: () => { toast.success("Opening hours saved!"); setIsEditing(false); },
      onError: (err: any) => toast.error(err?.message || "Failed to save hours"),
    });
  };

  if (isLoading) return <ProfileSkeleton />;
  if (isError) return (
    <div className="p-8 text-center text-red-500 text-sm">Failed to load profile. Please try again.</div>
  );

  const avatarSrc = formData.avatar
    ? URL.createObjectURL(formData.avatar)
    : profile?.data?.avatar?.imageUrl || "/assets/placeholder.png";

  return (
    <div className="p-5 md:p-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pr-12 md:pr-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Store Profile</h1>
          <p className="text-sm text-gray-500 mt-1.5 font-medium">{isEditing ? "Edit your store details" : "Your store information"}</p>
        </div>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden mb-6">
        {/* Avatar + name banner */}
        <div className="bg-[var(--color-blue-primary)] px-6 pt-6 pb-8 relative overflow-hidden">
          {/* Top row: Avatar & Edit button */}
          <div className="flex justify-between items-start gap-4 z-10 relative">
            <div className="relative flex-shrink-0">
              <img
                src={avatarSrc}
                alt="Store avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl bg-white"
              />
              {isEditing && (
                <button
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center border-2 border-white shadow-md hover:scale-105 transition-transform"
                >
                  <Camera size={14} className="text-white" />
                </button>
              )}
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => { if (e.target.files?.[0]) set("avatar", e.target.files[0]); }} />
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md text-sm font-semibold transition-all border border-white/20 shadow-sm"
              >
                <Pencil size={14} /> Edit Profile
              </button>
            )}
          </div>
          
          <div className="mt-4 z-10 relative">
            <h2 className="font-extrabold text-white text-2xl drop-shadow-sm mb-1">{profile?.data?.name || "Your Store"}</h2>
            <p className="text-blue-50 text-sm md:text-[15px] font-medium opacity-90 max-w-lg">{profile?.data?.bio || "No bio yet"}</p>
          </div>
        </div>

        {/* Info / Edit fields */}
        <div className="px-6 py-6">
          {isEditing ? (
            <div className="space-y-5 max-w-3xl">
              <Field label="Store Name">
                <input type="text" value={formData.name} onChange={(e) => set("name", e.target.value)} placeholder="Store name" className={inputCls} />
              </Field>
              <Field label="Bio">
                <textarea value={formData.bio} onChange={(e) => set("bio", e.target.value)} placeholder="Describe your store…" rows={3} className={inputCls + " resize-none"} />
              </Field>
              <Field label="Address">
                <input type="text" value={formData.address} onChange={(e) => set("address", e.target.value)} placeholder="Full address" className={inputCls} />
              </Field>
              <div className="grid grid-cols-2 gap-5">
                <Field label="LGA">
                  <input type="text" value={formData.lga} onChange={(e) => set("lga", e.target.value)} placeholder="Local govt" className={inputCls} />
                </Field>
                <Field label="State">
                  <input type="text" value={formData.state} onChange={(e) => set("state", e.target.value)} placeholder="State" className={inputCls} />
                </Field>
              </div>
              <Field label="Phone">
                <input type="tel" value={formData.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+234…" className={inputCls} />
              </Field>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-2">
              <InfoRow icon={Store}   label="Store Name" value={profile?.data?.name} />
              <InfoRow icon={User}    label="Bio"        value={profile?.data?.bio} />
              <InfoRow icon={MapPin}  label="Address"    value={[profile?.data?.address, profile?.data?.lga, profile?.data?.state].filter(Boolean).join(", ")} />
              <InfoRow icon={Phone}   label="Phone"      value={profile?.data?.phone} />
            </div>
          )}
        </div>

        {/* Save buttons */}
        {isEditing && (
          <div className="px-6 pb-5 flex gap-3">
            <button onClick={() => setIsEditing(false)} className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition text-sm flex items-center justify-center gap-1.5">
              <X size={14} /> Cancel
            </button>
            <button onClick={handleSaveProfile} disabled={isPendingProfile} className="flex-1 py-3 rounded-xl bg-[var(--color-blue-primary)] text-white font-semibold hover:opacity-90 disabled:opacity-50 transition text-sm flex items-center justify-center gap-1.5">
              <Check size={14} /> {isPendingProfile ? "Saving…" : "Save Profile"}
            </button>
          </div>
        )}
      </div>

      {/* Opening hours card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-50">
          <Clock size={16} className="text-[var(--color-blue-primary)]" />
          <h2 className="font-bold text-gray-900">Opening Hours</h2>
        </div>

        <div className="px-6 py-4 space-y-2">
          {DAYS.map((d) => {
            const profileEntry = profile?.data?.openingHours?.[d];
            const editEntry = openingHours[d] || { hours: [] };

            return (
              <div key={d} className={`flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 ${isEditing ? "flex-wrap gap-2" : ""}`}>
                <span className="w-28 capitalize text-sm font-medium text-gray-700">{d}</span>

                {isEditing ? (
                  <div className="flex items-center gap-2 flex-wrap">
                    {editEntry.isClosed ? (
                      <span className="text-xs text-red-500 font-medium">Closed</span>
                    ) : (editEntry.hours || [])[0] ? (
                      <div className="flex items-center gap-1.5">
                        <input type="time" value={(editEntry.hours || [])[0].open}
                          onChange={(e) => updateInterval(d, "open", e.target.value)}
                          className="border border-gray-200 rounded-lg px-2 py-1 text-xs bg-gray-50" />
                        <span className="text-gray-400 text-xs">–</span>
                        <input type="time" value={(editEntry.hours || [])[0].close}
                          onChange={(e) => updateInterval(d, "close", e.target.value)}
                          className="border border-gray-200 rounded-lg px-2 py-1 text-xs bg-gray-50" />
                        <button onClick={() => removeInterval(d)} className="text-gray-400 hover:text-red-500 transition"><X size={13} /></button>
                      </div>
                    ) : (
                      <button onClick={() => addInterval(d)} className="flex items-center gap-1 text-xs text-[var(--color-blue-primary)] hover:opacity-80 transition">
                        <Plus size={12} /> Add hours
                      </button>
                    )}
                    <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                      <input type="checkbox" checked={!!editEntry.isClosed} onChange={() => toggleClosed(d)} className="rounded" />
                      Closed
                    </label>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">
                    {!profileEntry ? "Not set"
                      : profileEntry.isClosed ? <span className="text-red-500 text-xs font-medium">Closed</span>
                      : profileEntry.hours?.[0] ? `${profileEntry.hours[0].open} – ${profileEntry.hours[0].close}`
                      : "Not set"}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {isEditing && (
          <div className="px-6 pb-5 flex gap-3">
            <button onClick={() => setIsEditing(false)} className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition text-sm flex items-center justify-center gap-1.5">
              <X size={14} /> Cancel
            </button>
            <button onClick={handleSaveHours} disabled={isPendingHours} className="flex-1 py-3 rounded-xl bg-[var(--color-blue-primary)] text-white font-semibold hover:opacity-90 disabled:opacity-50 transition text-sm flex items-center justify-center gap-1.5">
              <Check size={14} /> {isPendingHours ? "Saving…" : "Save Hours"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoreProfile;
