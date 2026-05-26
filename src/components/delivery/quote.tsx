"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateGuestOrderMutation } from "@/services/orders/mutation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const QuotePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentSource, setPaymentSource] = useState<"Paystack" | "Globus">(
    "Paystack",
  );

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

  const { mutate, isPending, isSuccess } = useCreateGuestOrderMutation({
    onSuccess: (res) => {
      const url = res.data?.authorization_url;
      if (url) {
        router.push(url);
      } else {
        toast.success("Order created successfully.");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    },
    onError: (err) => {
      console.error("Create order error", err);
      toast.error(err.message);
    },
  });

  const handleProceedToPayment = () => {
    // Check if all required data from searchParams is available before mutating
    if (
      !orderType ||
      !state ||
      !time ||
      !pickupLocation ||
      !dropoffLocation ||
      !date ||
      !amount ||
      !deliveryType ||
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

    const url = new URL(`/order/success`, window.location.origin).toString();

    // Trigger the mutation to create the order in your backend
    mutate({
      orderType: "Delivery",
      state: state,
      date: date,
      time: time,
      pickupLocation: pickupLocation,
      dropoffLocation: dropoffLocation,
      deliveryFee: Number(amount),
      deliveryType: deliveryType as "regular" | "express",
      vehicleRequest: vehicleRequest as "truck" | "car" | "bike",
      paymentSource: paymentSource,
      callbackUrl: url,
      guest: {
        email: email,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
      },
      note: note || "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 border border-gray-100 min-h-[400px]">
        {isPending ? (
          <div className="flex flex-col gap-4 items-center justify-center py-6">
            <Loader2
              size={96}
              strokeWidth={1}
              className="text-blue-primary animate-spin"
            />
            <p>Creating order...</p>
          </div>
        ) : isSuccess ? (
          <div className="flex flex-col gap-4 items-center justify-center py-6">
            <CheckCircle2
              size={96}
              strokeWidth={1}
              className="text-green-600"
            />
            <p>Please wait...</p>
          </div>
        ) : (
          <>
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
                  ? vehicleRequest.charAt(0).toUpperCase() +
                    vehicleRequest.slice(1)
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

            {/* Payment Source Selection */}
            <div className="mt-8 rounded-lg border bg-gray-50 p-6">
              <h3 className="text-lg font-semibold mb-4">Payment Source</h3>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentSource"
                    value="Paystack"
                    checked={paymentSource === "Paystack"}
                    onChange={() => setPaymentSource("Paystack")}
                    className="mr-3 w-4 h-4"
                  />
                  <span className="font-medium">Paystack</span>
                </label>
                {/* <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentSource"
                    value="Globus"
                    checked={paymentSource === "Globus"}
                    onChange={() => setPaymentSource("Globus")}
                    className="mr-3 w-4 h-4"
                  />
                  <span className="font-medium">Globus</span>
                </label> */}
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button
                onClick={handleProceedToPayment}
                disabled={isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors duration-200 text-lg"
              >
                {isPending ? "Processing..." : "Proceed To Payment"}
              </Button>
            </div>

            <div className="md:col-span-2">
              <p className="text-center my-2 text-red-600 text-sm font-medium">
                NOTE: Vinkol will cover up to ₦50,000 of damage or stolen
                package. Please specify in the note section if goods are
                fragile.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
