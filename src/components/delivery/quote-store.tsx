"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateOrderFromStore } from "@/services/orders/mutation";
import { getCartFromStorage, clearCart } from "@/config/storage";
import { useState, useEffect } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const router = useRouter();
  const [paymentSource, setPaymentSource] = useState<"Paystack" | "Globus">(
    "Paystack",
  );
  const state = searchParams.get("state");
  const pickupLocation = searchParams.get("pickupLocation");
  const dropoffLocation = searchParams.get("dropoffLocation");
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    getCartFromStorage(),
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

  const { mutate, isPending, isSuccess } = useCreateOrderFromStore({
    onSuccess: (res) => {
      const url = res.data?.authorization_url;
      if (url) {
        router.push(url);
      } else {
        toast.success("Order created successfully.");
        clearCart();
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
      !state ||
      !store ||
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
        pickupLocation,
        dropoffLocation,
        email,
        firstname,
        lastname,
        phone,
        calculatedDeliveryFee,
        store,
      });
      return;
    }

    // Transform cartItems into the desired products format for the backend
    const formattedProducts = cartItems.map((item) => ({
      product: item.id,
      quantity: item.quantity,
    }));

    const url = new URL(`/order/success`, window.location.origin).toString();

    mutate({
      orderType: "Shopping",
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
      paymentSource: paymentSource,
      callbackUrl: url,
    });
  };

  const serviceFee = Math.round(
    0.025 * (calculatedTotalAmount + calculatedDeliveryFee),
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 border border-gray-100">
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
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentSource"
                    value="Globus"
                    checked={paymentSource === "Globus"}
                    onChange={() => setPaymentSource("Globus")}
                    className="mr-3 w-4 h-4"
                  />
                  <span className="font-medium">Globus</span>
                </label>
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
