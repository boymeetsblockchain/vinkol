"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Header } from "@/components/shop/header";
import { useRouter } from "next/navigation";
import { useUpdateStoreProfile } from "@/services/shops/mutation";
import Autocomplete from "react-google-autocomplete";
import { toast } from "sonner";

function SetUpProfile() {
  const router = useRouter();
  const { mutate, isPending } = useUpdateStoreProfile();

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

  const handleSubmit = () => {
    // console.log(lat, lng);
    mutate(
      {
        name,
        bio,
        address,
        lga,
        lat,
        lng,
        state,
        phone,
        avatar: avatar || undefined,
      },
      {
        onSuccess: () => {
          router.push("/shop/complete");
        },
        onError: (error, variables) => {
          toast.error(error?.message);
        },
      }
    );
  };

  return (
    <section className="min-h-screen flex flex-col">
      <Header />
      <div className="flex items-center justify-center max-w-screen-xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Form Section */}
          <div className="w-full flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold ">Store Profile</h1>
              <h2 className="text-sm text-gray-600 mt-1">
                Complete details to complete profile
              </h2>
            </div>

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

                  // Optional: Extract city/state/LGA from address components
                  let foundLga = "";
                  let foundState = "";

                  for (const component of place.address_components) {
                    if (
                      component.types.includes("administrative_area_level_2")
                    ) {
                      // This is often the county or LGA
                      foundLga = component.long_name;
                    }
                    if (
                      component.types.includes("administrative_area_level_1")
                    ) {
                      // This is the state
                      foundState = component.long_name;
                    }
                  }
                  setLga(foundLga);
                  setState(foundState);
                }}
                options={{
                  types: ["address"], // Restrict to addresses
                  componentRestrictions: { country: "ng" }, // Restrict to Nigeria
                }}
                defaultValue={address} // Set default value to reflect current address state
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
                placeholder="Shop Address"
              />

              <div className="grid grid-cols-2 gap-10">
                <input
                  type="text"
                  placeholder="Local government"
                  value={lga}
                  onChange={(e) => setLga(e.target.value)}
                  className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
                />
              </div>
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              />
            </div>

            {/* Submit Button */}
            <Button
              variant="auth"
              className="w-full rounded-md mt-4"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>

          {/* Right: Image Section */}
          <div className="hidden md:block w-full h-full">
            <img
              src="/assets/riderauth.jpg"
              alt="Rider Auth Illustration"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SetUpProfile;
