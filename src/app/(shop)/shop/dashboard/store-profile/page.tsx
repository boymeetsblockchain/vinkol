"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { Header } from "@/components/shop/header";
import { useRouter } from "next/navigation";
import { useGetStoreProfile } from "@/services/shops/query";
import { useUpdateStoreProfile } from "@/services/shops/mutation";
import { Skeleton } from "@/components/ui/skeleton";

function StoreProfile() {
  const router = useRouter();
  const { data: profile, isLoading, isError } = useGetStoreProfile();
  const { mutate: updateProfile, isPending } = useUpdateStoreProfile();
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
    }
  }, [profile]);

  const handleSubmit = () => {
    // Ensure avatar is undefined instead of null
    const submitData = { ...formData, avatar: formData.avatar ?? undefined };
    updateProfile(submitData, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  if (isLoading) {
    return (
      <section className="min-h-screen flex flex-col">
        <Header />
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
        <Header />
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
      <Header />
      <div className="flex items-center justify-center max-w-screen-xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
          {/* Left: Profile Section */}
          <div className="w-full flex flex-col gap-6">
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
                </>
              )}

              <div className="flex gap-4 mt-4">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="w-full"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="auth"
                      onClick={handleSubmit}
                      disabled={isPending}
                      className="w-full"
                    >
                      {isPending ? "Saving..." : "Save Changes"}
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

          {/* Right: Image Section */}
          <div className="hidden md:block w-full h-full">
            <img
              src="/assets/store-profile.jpg"
              alt="Store Profile Illustration"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default StoreProfile;
