"use client";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  useCreateGuestOrderMutation,
  useCreateOrderFromStore,
} from "@/services/orders/mutation";
import { getCartFromStorage, clearCart } from "@/config/storage";
import { useState, useEffect } from "react"; // Import useEffect

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

interface CartItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  quantity: number;
}

export const QuotePage = () => {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const pickupLocation = searchParams.get("pickupLocation");
  const dropoffLocation = searchParams.get("dropoffLocation");
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    getCartFromStorage()
  );

  // Initialize totalAmount and deliveryFee with default numerical values
  const [calculatedTotalAmount, setCalculatedTotalAmount] = useState(0);
  const [calculatedDeliveryFee, setCalculatedDeliveryFee] = useState(0);

  // Use useEffect to calculate and update amounts after initial render and when dependencies change
  useEffect(() => {
    const totalCartValue = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    setCalculatedTotalAmount(totalCartValue);

    // Ensure deliveryFee is a number, default to 0 if not present or invalid
    const feeFromParams = searchParams.get("deliveryFee");
    const parsedDeliveryFee = Number(feeFromParams || "0"); // Convert to number, default to 0
    setCalculatedDeliveryFee(parsedDeliveryFee);
  }, [cartItems, searchParams]); // Dependencies: cartItems (for totalAmount) and searchParams (for deliveryFee)

  const email = searchParams.get("email");

  const phone = searchParams.get("phonenumber");
  const firstname = searchParams.get("firstname");
  const lastname = searchParams.get("lastname");
  const store = searchParams.get("store");
  const key = process.env.NEXT_PUBLIC_PAYSTACK_KEY as string;

  const { mutate, isPending, isSuccess } = useCreateOrderFromStore();

  const handlePaymentSuccess = (response: any) => {
    // console.log("Paystack Success Response:", response);

    const transactionRef = response.reference;

    if (
      !state ||
      !store || // Assuming 'store' is a variable you're getting from somewhere
      !dropoffLocation ||
      calculatedDeliveryFee === undefined ||
      !email ||
      !firstname ||
      !lastname ||
      !phone
    ) {
      toast.error("Missing order details. Please go back and try again.");
      console.error("Missing data for order creation:", {
        state,
        pickupLocation, // Make sure pickupLocation is available if needed for the backend
        dropoffLocation,
        email,
        firstname,
        lastname,
        phone,
        calculatedDeliveryFee,
        store, // Include store in your console.error for debugging
      });
      return;
    }

    // --- NEW CODE START ---
    // Transform cartItems into the desired products format for the backend
    const formattedProducts = cartItems.map((item) => ({
      product: item.id, // Assuming item.id is the product ID expected by the backend
      quantity: item.quantity,
    }));
    // --- NEW CODE END ---

    mutate(
      {
        paystackReference: transactionRef,
        state,
        guest: {
          firstname,
          lastname,
          email,
          phone,
        },
        amount: calculatedTotalAmount,
        store: store,
        products: formattedProducts,
        deliveryFee: calculatedDeliveryFee,
        dropoffLocation: dropoffLocation,
        deliveryType: "regular",
        orderType: "Shopping",
      },
      {
        onSuccess: () => {
          toast.success("Order placed successfully!");
          clearCart();
          window.location.href = "/";
        },
        onError: (error) => {
          console.error("Order creation failed:", error);
          toast.error("Failed to create order. Please try again.");
        },
      }
    );
  };

  const serviceFee = Math.round(
    0.025 * (calculatedTotalAmount + calculatedDeliveryFee)
  );
  // Paystack amount must be in kobo (smallest currency unit), so multiply by 100
  const amountInKobo =
    (calculatedTotalAmount + calculatedDeliveryFee + serviceFee) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 border border-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-left">
          Quote
        </h1>
        <p>Here is a quote on what you filled</p>

        <div className="space-y-4 text-gray-800">
          <p className="text-lg font-semibold">
            <span className="font-normal">State:</span> {state || "N/A"}
          </p>

          <p className="text-lg font-semibold">
            <span className="font-normal">Drop-off Location:</span>{" "}
            {dropoffLocation || "N/A"}
          </p>
          <p className="text-lg font-semibold">
            <span className="font-normal">Item Total:</span> ₦
            {calculatedTotalAmount.toLocaleString()}
          </p>
          <p className="text-lg font-semibold">
            <span className="font-normal">Delivery Fee:</span> ₦
            {calculatedDeliveryFee.toLocaleString()}
          </p>
          <p className="text-lg font-semibold">
            <span className="font-normal">Service Fee:</span> ₦
            {serviceFee.toLocaleString()}
          </p>
          <p className="text-2xl font-bold ">
            <span className="font-semibold">Grand Total:</span>{" "}
            <span className="text-blue-primary text-2xl">
              ₦
              {(
                calculatedTotalAmount +
                calculatedDeliveryFee +
                serviceFee
              ).toLocaleString()}
            </span>
          </p>
        </div>

        <div className="mt-8 text-center">
          <DynamicPaystackButton
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-bold py-3 px-6 rounded-md transition-colors duration-200"
            text="Proceed To Payment"
            email={email || ""}
            amount={amountInKobo} // Pass the amount in kobo
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
