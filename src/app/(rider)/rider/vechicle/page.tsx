"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/button";
import { useSubmitVechicle } from "@/services/rider/mutation";

function SubmitVehicle() {
  const router = useRouter();

  const [vehicleType, setVehicleType] = useState<string>("");
  const [idImage, setIdImage] = useState<File | null>(null);

  const { mutate: submitVehicle, isPending } = useSubmitVechicle();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("vehicleType", vehicleType);
    if (idImage) {
      formData.append("image", idImage);
    }

    console.log("Submitting Vehicle with formData:", formData.values());
    submitVehicle(formData, {
      onSuccess: () => {
        toast.success("Vehicle submitted successfully!");
        router.push("/rider/verify-phonenumber");
      },
      onError: (error: any) => {
        console.error("Vehicle submission failed:", error);
        toast.error(error.message || "Failed to submit Vehicle.");
      },
    });
  };

  return (
    <section className="max-w-screen-2xl w-full px-4 md:px-20 py-10 mx-auto">
      {/* Logo */}
      <div className="mb-8">
        <img src="/logo.png" alt="Vinkol Logo" className="w-28 h-12" />
      </div>

      {/* Content Grid */}
      <div className="flex items-center h-full justify-center max-w-screen-xl mx-auto w-full">
        <div className="grid grid-cols-1 w-full h-full md:grid-cols-2 gap-12">
          {/* Left: Form Section */}
          <div className="w-full flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold ">Submit Vehicle</h1>{" "}
              {/* Corrected spelling */}
              <p className="text-sm text-gray-600 mt-1">Submit the following</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Vehicle Type Select */} {/* Corrected spelling */}
              <div className="flex flex-col gap-2">
                <label htmlFor="vehicleType" className="text-sm text-gray-700">
                  {" "}
                  {/* Corrected spelling */}
                  Select Vehicle Type {/* Corrected spelling */}
                </label>
                <select
                  id="vehicleType"
                  className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 focus:outline-none"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  disabled={isPending}
                  required
                >
                  <option value="">Select Vehicle Type</option>{" "}
                  <option value="car">Car</option>
                  <option value="truck">Truck</option>
                  <option value="bike">Bike</option>
                </select>
              </div>
              {/* ID Image Upload */}
              <div className="flex flex-col gap-2">
                <label htmlFor="idImage" className="text-sm text-gray-700">
                  Upload Vehicle Image
                </label>
                <input
                  id="idImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setIdImage(e.target.files ? e.target.files[0] : null)
                  }
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  disabled={isPending}
                  required
                />
                {idImage && (
                  <p className="text-xs text-gray-500">
                    Selected file: {idImage.name}
                  </p>
                )}
              </div>
              {/* Submit Button */}
              <Button
                variant="auth"
                className="w-full rounded-md mt-4"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit Vehicle"}{" "}
                {/* Corrected spelling */}
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

export default SubmitVehicle;
