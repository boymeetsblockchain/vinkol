"use client";

import { useSearchParams } from "next/navigation";

export const QuotePage = () => {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const pickupLocation = searchParams.get("pickupLocation");
  const dropoffLocation = searchParams.get("dropoffLocation");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const deliveryType = searchParams.get("deliveryType");
  const vehicleRequest = searchParams.get("vehicleRequest");
  const amount = searchParams.get("amount");
  const note = searchParams.get("note");

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white  rounded-lg p-8 border border-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-left">
          Quote
        </h1>
        <p>Here is a quote on what you filled</p>

        <div className="space-y-4 text-gray-800">
          <p className="text-lg font-semibold">
            <span className="font-normal">State:</span> {state || "N/A"}
          </p>
          <p className="text-lg font-semibold">
            <span className="font-normal">Pick-up Location:</span>{" "}
            {pickupLocation || "N/A"}
          </p>
          <p className="text-lg font-semibold">
            <span className="font-normal">Drop-off Location:</span>{" "}
            {dropoffLocation || "N/A"}
          </p>
          <p className="text-lg font-semibold">
            <span className="font-normal">Date:</span> {date || "N/A"}
          </p>
          <p className="text-lg font-semibold">
            <span className="font-normal">Time:</span> {time || "N/A"}
          </p>
          <p className="text-lg font-semibold">
            <span className="font-normal">Delivery Type:</span>{" "}
            {deliveryType
              ? deliveryType.charAt(0).toUpperCase() + deliveryType.slice(1)
              : "N/A"}
          </p>
          <p className="text-lg font-semibold">
            <span className="font-normal">Vehicle Request:</span>{" "}
            {vehicleRequest
              ? vehicleRequest.charAt(0).toUpperCase() + vehicleRequest.slice(1)
              : "N/A"}
          </p>
          <p className="text-2xl font-bold ">
            <span className="font-semibold">Estimated Amount:</span>{" "}
            <span className="text-blue-primary text-2xl">
              {amount ? `₦${parseFloat(amount).toLocaleString()}` : "N/A"}
            </span>
          </p>
          <p className="text-lg font-semibold">
            <span className="font-normal">Note:</span>{" "}
            {note || "No special notes."}
          </p>
        </div>

        <div className="mt-8 text-center">
          {/* Example of adding buttons for next actions */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200">
            Proceed to Payment
          </button>
        </div>
        <div className="md:col-span-2">
          <p className="text-center my-2 text-red-600 text-sm font-medium">
            NOTE: Vinkol will cover up to ₦50,000 of damage or stolen package.
            Please specify in the note section if goods are fragile.
          </p>
        </div>
      </div>
    </div>
  );
};
