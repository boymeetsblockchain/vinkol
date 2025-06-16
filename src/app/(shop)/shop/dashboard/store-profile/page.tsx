"use client";
import { useGetStoreProfile } from "@/services/shops/query";
import { updateStoreProfile } from "@/services/shops/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/button";
import { Header } from "@/components/shop/header";

type ProfileFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  lga: string;
  bio: string;
  avatar?: FileList;
};

function ProfilePage() {
  const { data: profileData, isLoading, refetch } = useGetStoreProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<ProfileFormData>();

  useEffect(() => {
    if (profileData?.data) {
      reset({
        name: profileData.data.name,
        email: profileData.data.email,
        phone: profileData.data.phone,
        address: profileData.data.address,
        state: profileData.data.state,
        lga: profileData.data.lga,
        bio: profileData.data.bio,
      });
    }
  }, [profileData, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      // Prepare payload with all required fields
      const updatedFields: {
        name: string;
        phone: string;
        address: string;
        state: string;
        lga: string;
        bio: string;
        avatar?: File;
      } = {
        name: data.name,
        phone: data.phone,
        address: data.address,
        state: data.state,
        lga: data.lga,
        bio: data.bio,
      };

      // Handle avatar upload if changed
      if (data.avatar && data.avatar.length > 0) {
        updatedFields.avatar = data.avatar[0];
      }

      await updateStoreProfile(updatedFields);
      await refetch();
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!profileData?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Failed to load profile data</p>
      </div>
    );
  }

  const avatarFiles = watch("avatar");
  const avatarUrl =
    avatarFiles && avatarFiles.length > 0
      ? URL.createObjectURL(avatarFiles[0])
      : profileData.data.avatar?.imageUrl || "/assets/default-avatar.png";

  return (
    <section className="min-h-screen flex flex-col bg-white">
      <Header />

      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Store Profile</h1>
            {!isEditing ? (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left Column - Avatar */}
                  <div className="w-full md:w-1/3 flex flex-col items-center">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 mb-4">
                      <img
                        src={avatarUrl}
                        alt="Store Avatar"
                        className="object-cover rounded-full w-32 h-32"
                      />
                    </div>
                    {isEditing && (
                      <label className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Change Photo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          {...register("avatar")}
                        />
                      </label>
                    )}
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-500">
                        Store ID: {profileData.data._id}
                      </p>
                    </div>
                  </div>

                  {/* Right Column - Profile Info */}
                  <div className="w-full md:w-2/3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Store Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            className={`w-full px-3 py-2 border rounded-md ${
                              errors.name ? "border-red-500" : "border-gray-300"
                            }`}
                            {...register("name", {
                              required: "Store name is required",
                            })}
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-md">
                            {profileData.data.name}
                          </p>
                        )}
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <p className="px-3 py-2 bg-gray-50 rounded-md">
                          {profileData.data.email}
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          {profileData.data.isEmailVerified
                            ? "✓ Verified"
                            : "Not verified"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            className={`w-full px-3 py-2 border rounded-md ${
                              errors.phone
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            {...register("phone", {
                              required: "Phone number is required",
                              pattern: {
                                value: /^\+?[0-9]{10,15}$/,
                                message: "Invalid phone number",
                              },
                            })}
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-md">
                            {profileData.data.phone}
                          </p>
                        )}
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            {...register("address")}
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-md">
                            {profileData.data.address}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            {...register("state")}
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-md">
                            {profileData.data.state}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          LGA
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            {...register("lga")}
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-md">
                            {profileData.data.lga}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio/Description
                      </label>
                      {isEditing ? (
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          {...register("bio")}
                        />
                      ) : (
                        <p className="px-3 py-2 bg-gray-50 rounded-md whitespace-pre-line">
                          {profileData.data.bio || "No description provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
