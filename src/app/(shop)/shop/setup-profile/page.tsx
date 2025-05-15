"use client";
import { Button } from "@/components/button";
import { Header } from "@/components/shop/header";

import { useRouter } from "next/navigation";

function SetUpProfile() {
  const router = useRouter();
  return (
    <section className="min-h-screen flex flex-col">
      <Header />
      <div className="flex items-center justify-center max-w-screen-xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Form Section */}
          <div className="w-full flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold ">Store Profile</h1>
              <h2 className="text-sm text-gray-600 mt-1">
                Complete details to complete profile
              </h2>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center">
              <img
                src="/assets/shop1.png"
                alt="Rider Profile"
                className="h-36 w-36 rounded-md object-cover"
              />
            </div>

            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Shop Name"
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              />
              <textarea
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
                placeholder="Bio"
              ></textarea>
              <input
                type="text"
                placeholder="Shop Address"
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              />
              <div className="grid grid-cols-2 gap-10">
                <input
                  type="text"
                  placeholder="Local government"
                  className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
                />
                <input
                  type="text"
                  placeholder="State"
                  className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
                />
              </div>
              <input
                type="number"
                placeholder="Phone number"
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              />
            </div>

            {/* Submit Button */}
            <Button
              variant="auth"
              className="w-full rounded-md mt-4"
              onClick={() => router.push("/shop/account")}
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
export default SetUpProfile;
