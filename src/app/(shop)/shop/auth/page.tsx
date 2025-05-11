"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/button";

function Profile() {
  const router = useRouter();
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

            {/* Profile Image */}
            <div className="flex justify-center">
              <img
                src="/assets/riderprofile.jpg"
                alt="Rider Profile"
                className="h-36 w-36 rounded-full border border-gray-300 object-cover"
              />
            </div>

            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              />
              <p className="text-xs text-gray-500">
                Ensure name matches your government-issued ID.
              </p>
            </div>

            {/* State Select */}
            <div className="flex flex-col gap-2">
              <select className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700">
                <option value="">Select your state</option>
                <option value="lagos">Lagos</option>
                <option value="abuja">Abuja</option>
                <option value="kano">Kano</option>
                {/* Add more states here */}
              </select>
            </div>

            {/* Submit Button */}
            <Button
              variant="auth"
              className="w-full rounded-md mt-4"
              onClick={() => router.push("/rider/number")}
            >
              Submit
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

export default Profile;
