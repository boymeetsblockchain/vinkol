"use client";
import {
  localityLabel,
  placesCountry,
  regionFieldLabel,
  resolveLocalityFromPlace,
  resolveRegionFromPlace,
} from "@/lib/markets";
import { useMarket } from "@/lib/markets/useMarket";
import { normalizePhone, phonePlaceholder } from "@/lib/phone";
import { completedSteps, pathAfter } from "@/lib/onboarding/steps";
import { OnboardingShell } from "@/components/onboarding/shell";
import { useGetStoreProfile } from "@/services/shops/query";
import { useBank } from "@/services/banks/query";

import { useState } from "react";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { useUpdateStoreProfile } from "@/services/shops/mutation";
import Autocomplete from "react-google-autocomplete";
import { toast } from "sonner";

function SetUpProfile() {
  const router = useRouter();
  const { mutate, isPending } = useUpdateStoreProfile();
  const { data: profileData } = useGetStoreProfile();
  const { data: bank } = useBank("store");
  const profile = profileData?.data;
  // The store's own country, not the visitor's cookie: a Canadian store editing
  // its profile needs City and Province whichever market the browser remembers.
  const market = useMarket(profile?.country);

  // Local state for form inputs
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [lga, setLga] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [tags, setTags] = useState("");

  const [failure, setFailure] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFailure("");

    if (name.trim().length < 2) {
      setFailure("Please enter your shop's name.");
      return;
    }
    if (!tags) {
      setFailure("Please choose the category that best fits your shop.");
      return;
    }
    // The address has to come from the suggestions: typing into the box leaves
    // no coordinates, and a delivery cannot be priced without them.
    if (!address || !lat || !lng) {
      setFailure("Please pick your shop address from the suggestions.");
      return;
    }
    if (!normalizePhone(phone, market.country)) {
      setFailure("Please enter a valid phone number.");
      return;
    }

    // Blank fields are omitted rather than sent as "". Every string field on
    // the server is optional but rejects an empty value, so a blank bio used to
    // fail the whole request with a 400 and no redirect.
    const payload = Object.fromEntries(
      Object.entries({
        name: name.trim(),
        bio: bio.trim(),
        address,
        lga: lga.trim(),
        lat,
        lng,
        state: state.trim(),
        phone: normalizePhone(phone, market.country) ?? "",
        tags,
      }).filter(([, value]) => value !== ""),
    ) as Record<string, string>;

    mutate(
      { ...payload, avatar: avatar || undefined } as never,
      {
        onSuccess: () => {
          router.push(pathAfter("store", "profile", profile, !!bank));
        },
        onError: (error) => {
          const message =
            error?.message || "Could not save your profile. Please try again.";
          setFailure(message);
          toast.error(message);
        },
      },
    );
  };

  return (
    <OnboardingShell
      role="store"
      stepKey="profile"
      profile={profile}
      title="Store profile"
      description="How your shop appears to customers, and where we collect their orders from."
      completed={completedSteps("store", profile, !!bank)}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Profile Image Upload */}
            <label className="flex justify-center flex-col items-center gap-2">
              <img
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : "/assets/placeholder.png"
                } // Added a fallback placeholder image
                alt="Store Profile"
                className="h-36 w-36 rounded-md object-cover"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) setAvatar(e.target.files[0]);
                }}
              />
            </label>

            {/* Input Fields */}
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Shop Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              />
              <textarea
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              ></textarea>
              <select
                required
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                name="tags"
                id="tags"
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              >
                <option value="" className="text-blue-primary">
                  --Select store tag--
                </option>
                <option value="food">Food</option>
                <option value="fashion">Clothing and Fashion</option>
                <option value="electronics">Gadget and Electronics</option>
                <option value="bakery">Bakery and Catering</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="beauty">Beauty and Cosmetics</option>
                <option value="supermarket">Supermarkets and Groceries</option>
              </select>

              {/* Google Autocomplete for Address */}
              <Autocomplete
                apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY} // Make sure you have this env variable set
                onPlaceSelected={(place) => {
                  // Set the full address
                  setAddress(place.formatted_address || "");

                  // Extract Lat and Lng
                  if (place.geometry?.location) {
                    setLat(place.geometry.location.lat().toString());
                    setLng(place.geometry.location.lng().toString());
                  }

                  const components = place.address_components ?? [];

                  // Nigeria's LGA and Canada's city come from different Google
                  // components, so this is not one field read two ways.
                  setLga(resolveLocalityFromPlace(components, market.country));

                  // Google's long_name gives "Lagos State" and "Ontario";
                  // store search matches the exact stored value, so the
                  // canonical one is what has to be saved.
                  const region = resolveRegionFromPlace(
                    components,
                    market.country,
                  );
                  setState(region?.value ?? "");
                }}
                options={{
                  types: ["address"], // Restrict to addresses
                  componentRestrictions: {
                    country: [placesCountry(market.country)],
                  },
                  fields: [
                    "formatted_address",
                    "name",
                    "geometry.location",
                    "address_components",
                  ],
                }}
                defaultValue={address} // Set default value to reflect current address state
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
                placeholder="Shop Address"
              />

              <div className="grid grid-cols-2 gap-10">
                <input
                  type="text"
                  placeholder={localityLabel(market.country)}
                  value={lga}
                  onChange={(e) => setLga(e.target.value)}
                  className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
                />
                {/* Prefilled from the address but editable: Google does not
                    always return a locality, and a locked empty field would
                    leave the merchant unable to finish. */}
                <input
                  type="text"
                  placeholder={regionFieldLabel(market.country)}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
                />
              </div>
              <input
                type="tel"
                placeholder={phonePlaceholder(market.country)}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              />
            </div>

        {failure && (
          <p
            role="alert"
            className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700"
          >
            {failure}
          </p>
        )}

        <Button
          variant="auth"
          className="w-full rounded-md mt-2"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Save and continue"}
        </Button>
      </form>
    </OnboardingShell>
  );
}

export default SetUpProfile;
