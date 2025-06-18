"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/button";
import { useUpdateProfileMutation } from "@/services/rider/mutation";
import { useUserProfile } from "@/services/rider/query";
import { toast } from "sonner"; // Assuming you have react-toastify for notifications

function SettingsPage() {
  const { data, isPending, refetch } = useUserProfile();
  const updateProfileMutation = useUpdateProfileMutation();

  const [firstNameInput, setFirstNameInput] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [avatarFile, setAvatarFile] = useState(null); // To hold the new avatar file

  // Update state when user profile data loads
  useEffect(() => {
    if (data?.data) {
      setFirstNameInput(data.data.firstname || "");
      setSelectedState(data.data.state || "");
    }
  }, [data]);

  // If data is not available after loading (e.g., error or no user)
  if (isPending) {
    return <div>Loading profile...</div>; // Or a more sophisticated loading spinner
  }

  if (!data?.data) {
    return null; // Or render a placeholder/error message
  }

  // Destructure data for cleaner access
  const { email, avatar, firstname, state } = data.data;

  const handleSaveProfile = async () => {
    try {
      const payload: { firstname: string; state: string; avatar?: File } = {
        firstname: firstNameInput,
        state: selectedState,
      };
      if (avatarFile) {
        payload.avatar = avatarFile; // Add the new avatar file if selected
      }

      updateProfileMutation.mutate(payload);
      toast.success("Profile updated successfully!");
      refetch(); // Re-fetch user profile to show updated data
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleAvatarChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setAvatarFile(event.target.files[0]);
      // Optionally, you can also display a preview of the new image here
    }
  };

  return (
    <div className="flex items-center justify-center max-w-screen-xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Form Section */}
        <div className="w-full flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold ">Profile</h1>
          </div>

          {/* Profile Image */}
          <div className="flex flex-col items-center gap-2">
            <img
              src={
                avatarFile ? URL.createObjectURL(avatarFile) : avatar.imageUrl
              }
              alt="Rider Profile"
              className="h-36 w-36 rounded-full border border-gray-300 object-cover"
            />
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer text-blue-primary hover:underline"
            >
              Change Profile Picture
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          {/* Name Input */}
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              value={firstNameInput}
              onChange={(e) => setFirstNameInput(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Ensure name matches your government-issued ID.
            </p>
          </div>

          {/* State Select */}
          <div className="flex flex-col gap-2">
            <select
              className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">Select your state</option>
              <option value="lagos">Lagos</option>
              <option value="abuja">Abuja</option>
              <option value="kano">Kano</option>
              {/* Add more states here */}
            </select>
          </div>

          <Button
            variant="auth"
            onClick={handleSaveProfile}
            disabled={updateProfileMutation.isPending}
          >
            {updateProfileMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default SettingsPage;
