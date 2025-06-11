"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Header } from "@/components/shop/header";
import { useRouter } from "next/navigation";
import { useUpdateStoreProfile } from "@/services/shops/mutation";

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

  const handleSubmit = () => {
    mutate(
      {
        name,
        bio,
        address,
        lga,
        state,
        phone,
        avatar: avatar || undefined,
      },
      {
        onSuccess: () => {
          router.push("/shop/account");
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
            <div className="flex justify-center flex-col items-center gap-2">
              <img
                src={avatar ? URL.createObjectURL(avatar) : ""}
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
            </div>

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
              <input
                type="text"
                placeholder="Shop Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
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
