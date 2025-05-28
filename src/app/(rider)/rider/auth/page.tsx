"use client";
import { useRouter } from "next/navigation";
import { useState } from "react"; // Import useState
import { toast } from "sonner"; // Import toast for notifications

import { Button } from "@/components/button"; // Ensure this path is correct

// Assuming your useUpdateProfileMutation is correctly defined in this path
import { useUpdateProfileMutation } from "@/services/rider/mutation";

function Profile() {
  const router = useRouter();
  const authToken =
    typeof window !== "undefined"
      ? localStorage.getItem("riderAuthToken")
      : null; // Safely access localStorage
  console.log("Auth Token:", authToken); // This is good for debugging

  // State for form inputs
  const [firstName, setFirstName] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");

  // Initialize the mutation hook
  const {
    mutate: updateProfile,
    isPending, // isPending indicates if the mutation is currently running
  } = useUpdateProfileMutation();

  /**
   * Handles the form submission for profile update.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default browser form submission

    // Basic client-side validation
    if (!firstName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!selectedState) {
      toast.error("Please select your state.");
      return;
    }

    // Call the mutation
    updateProfile(
      { firstName, state: selectedState }, // Payload for the mutation
      {
        onSuccess: () => {
          // The useUpdateProfileMutation hook itself already shows a success toast.
          // You might add more logic here if needed, or remove the toast from the hook if you prefer to handle it fully here.
          router.push("/rider/complete");
        },
        onError: (error) => {
          // The useUpdateProfileMutation hook itself already shows an error toast.
          // You might add more specific error handling here if needed.
          console.error("Profile update failed:", error);
          // toast.error(error.message || "Failed to update profile."); // Only if not handled in the mutation hook
        },
      }
    );
  };

  return (
    <section className="max-w-screen-2xl w-full px-4 md:px-20 py-10 mx-auto">
      {/* Logo */}
      <div className="mb-8">
        <img src="/logo.png" alt="Vinkol Logo" className="w-28 h-12" />
      </div>

      {/* Content Grid */}
      <div className="flex items-center justify-center max-w-screen-xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Form Section */}
          <div className="w-full flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold ">Profile</h1>
              <h2 className="text-sm text-gray-600 mt-1">
                Complete the form to finish setting up your profile.
              </h2>
            </div>

            {/* Profile Image - Consider adding an input for file upload here */}
            <div className="flex justify-center">
              <img
                src="/assets/riderprofile.jpg"
                alt="Rider Profile"
                className="h-36 w-36 rounded-full border border-gray-300 object-cover"
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isPending} // Disable input while submitting
                  required
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
                  disabled={isPending} // Disable select while submitting
                  required
                >
                  <option value="">Select your state</option>
                  <option value="lagos">Lagos</option>
                  <option value="abuja">Abuja</option>
                  <option value="kano">Kano</option>
                  {/* Add more states here as needed */}
                </select>
              </div>

              {/* Submit Button */}
              <Button
                variant="auth"
                className="w-full rounded-md mt-4"
                type="submit" // Set type to "submit" to trigger onSubmit
                disabled={isPending} // Disable button when mutation is pending
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </form>
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

export default Profile;
