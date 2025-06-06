"use client";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useCreateGuestOrderMutation } from "@/services/orders/mutation";

const DynamicPaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  {
    ssr: false,
    loading: () => (
      <button className="bg-gray-400 text-white font-bold py-3 px-6 rounded-md cursor-not-allowed">
        Loading Payment...
      </button>
    ),
  }
);

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
  const email = searchParams.get("email");
  const orderType = searchParams.get("orderType");
  const phone = searchParams.get("phonenumber");
  const firstname = searchParams.get("firstname");
  const lastname = searchParams.get("lastname");
  const key = process.env.NEXT_PUBLIC_PAYSTACK_KEY as string;

  const { mutate, isPending, isSuccess } = useCreateGuestOrderMutation();

  const handlePaymentSuccess = (response: any) => {
    console.log("Paystack Success Response:", response);
    console.log(date);
    const transactionRef = response.reference;

    // Check if all required data from searchParams is available before mutating
    if (
      !orderType ||
      !state ||
      !time ||
      !pickupLocation ||
      !dropoffLocation ||
      !date ||
      !amount ||
      !deliveryType || // Added deliveryType
      !vehicleRequest ||
      !email ||
      !firstname ||
      !lastname ||
      !phone
    ) {
      toast.error("Missing order details. Please go back and try again.");
      console.error("Missing data for order creation:", {
        orderType,
        state,
        time,
        pickupLocation,
        dropoffLocation,
        date,
        amount,
        deliveryType,
        vehicleRequest,
        email,
        firstname,
        lastname,
        phone,
      });
      return;
    }

    // Trigger the mutation to create the order in your backend
    mutate({
      paystackReference: transactionRef,
      orderType:
        orderType === "Delivery" || orderType === "Shopping"
          ? orderType
          : "Delivery",
      state: state,
      date: date,
      time: time,
      pickupLocation: pickupLocation,
      dropoffLocation: dropoffLocation,
      amount: Number(amount), // Convert amount to a number
      deliveryType: deliveryType as "regular" | "express",
      vehicleRequest: vehicleRequest as "truck" | "car" | "bike",
      guest: {
        email: email,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
      },
    });
  };

  // Handle payment window close
  const handlePaymentClose = () => {
    toast.info("Payment cancelled or window closed.");
    console.log("Payment window closed.");
  };

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
          <DynamicPaystackButton
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-bold py-3 px-6 rounded-md transition-colors duration-200"
            text="Proceed To Payment"
            email={email || ""}
            amount={amount ? Number(amount) * 100 : 0}
            publicKey={key}
            onSuccess={handlePaymentSuccess}
          />
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
