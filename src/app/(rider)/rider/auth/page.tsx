"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/button";
import { useUpdateProfileMutation } from "@/services/rider/mutation";
import Link from "next/link";

function Profile() {
  const router = useRouter();
  const authToken =
    typeof window !== "undefined"
      ? localStorage.getItem("riderAuthToken")
      : null;

  const [firstName, setFirstName] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [selectedState, setSelectedState] = useState<string>("");

  const { mutate: updateProfile, isPending } = useUpdateProfileMutation();

  /**
   * Handles the form submission for profile update.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!selectedState) {
      toast.error("Please select your state.");
      return;
    }
    if (!avatar) {
      toast.error("Please upload an avatar.");
      return;
    }

    updateProfile(
      {
        firstname: firstName,
        state: selectedState,
        avatar,
      },
      {
        onSuccess: () => {
          router.push("/rider/verify-phonenumber");
        },
        onError: (error: any) => {
          console.error("Profile update failed:", error);
          toast.error(error.message || "Failed to update profile.");
        },
      }
    );
  };

  return (
    <section className="max-w-screen-2xl w-full px-4 md:px-20 py-10 mx-auto">
      <div className="mb-8">
        <Link href={"/"}>
          {" "}
          <img src="/logo.png" alt="Vinkol Logo" className="w-28 h-12" />
        </Link>
      </div>
      <div className="flex items-center justify-center max-w-screen-xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="w-full flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold ">Profile</h1>
              <h2 className="text-sm text-gray-600 mt-1">
                Complete the form to finish setting up your profile.
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="avatar" className="text-sm text-gray-700">
                  Upload Avatar (image should be less than 2MB)
                </label>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setAvatar(e.target.files ? e.target.files[0] : null)
                  }
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  disabled={isPending}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isPending}
                  required
                />
                <p className="text-xs text-gray-500">
                  Ensure name matches your government-issued ID.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <select
                  className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  disabled={isPending}
                  required
                >
                  <option value="">Select your state</option>
                  <option value="abia">Abia</option>
                  <option value="adamawa">Adamawa</option>
                  <option value="akwa-ibom">Akwa Ibom</option>
                  <option value="anambra">Anambra</option>
                  <option value="bauchi">Bauchi</option>
                  <option value="bayelsa">Bayelsa</option>
                  <option value="benue">Benue</option>
                  <option value="borno">Borno</option>
                  <option value="cross-river">Cross River</option>
                  <option value="delta">Delta</option>
                  <option value="ebonyi">Ebonyi</option>
                  <option value="edo">Edo</option>
                  <option value="ekiti">Ekiti</option>
                  <option value="enugu">Enugu</option>
                  <option value="gombe">Gombe</option>
                  <option value="imo">Imo</option>
                  <option value="jigawa">Jigawa</option>
                  <option value="kaduna">Kaduna</option>
                  <option value="kano">Kano</option>
                  <option value="katsina">Katsina</option>
                  <option value="kebbi">Kebbi</option>
                  <option value="kogi">Kogi</option>
                  <option value="kwara">Kwara</option>
                  <option value="lagos">Lagos</option>
                  <option value="nasarawa">Nasarawa</option>
                  <option value="niger">Niger</option>
                  <option value="ogun">Ogun</option>
                  <option value="ondo">Ondo</option>
                  <option value="osun">Osun</option>
                  <option value="oyo">Oyo</option>
                  <option value="plateau">Plateau</option>
                  <option value="rivers">Rivers</option>
                  <option value="sokoto">Sokoto</option>
                  <option value="taraba">Taraba</option>
                  <option value="yobe">Yobe</option>
                  <option value="zamfara">Zamfara</option>
                  <option value="abuja">
                    Federal Capital Territory (Abuja)
                  </option>
                </select>
              </div>
              <Button
                variant="auth"
                className="w-full rounded-md mt-4"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
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
