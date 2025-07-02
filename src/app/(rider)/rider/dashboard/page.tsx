"use client";

import { useState } from "react"; // Import useState
import { Button } from "@/components/button";
import { useGetAvailableOrders, useGetOrders } from "@/services/orders/query";
import { formatDistanceToNow, isValid } from "date-fns"; // Import isValid
import { useAcceptOrderMutation } from "@/services/orders/mutation";
import { toast } from "sonner"; // Import toast for notifications

// Define an interface for your order data for better type safety
interface OrderData {
  _id: string;
  guest?: {
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    role: string;
    _id: string;
  };
  user?: {
    _id: string;
    email: string;
  };
  pickupLocation: string;
  dropoffLocation: string;
  state: string;
  status: "Pending" | "Delivered" | "Picked" | "Accepted" | string; // Added "Accepted"
  date?: string;
  time?: string;
  deliveryType: string;
  vehicleRequest: string;
  orderType: string;
  amount: number;
  deliveryFee: number;
  paystackReference: string;
  paymentStatus: string;
  products: any[];
  createdAt: string; // Assuming createdAt is always a string and present
  trackingId: string;
  rider?: {
    _id: string;
    email: string;
    firstname: string;
    avatar?: {
      imageUrl: string;
      cloudinaryId: string;
    };
    lastname: string;
    phone: string;
  };
}

interface AcceptOrderResponse {
  message: string;
}
function Orders() {
  const { data, isPending, refetch } = useGetAvailableOrders();
  const {
    mutate: acceptOrderMutate,
    isSuccess,
    isError,
  } = useAcceptOrderMutation(); // Use mutateAsync for await

  // State to track which order is currently being accepted
  const [acceptingOrderId, setAcceptingOrderId] = useState<string | null>(null);

  // console.log(data);

  // Filter accepted orders for the counter display
  const acceptedOrders =
    data?.data?.fetchedData?.filter(
      (order: OrderData) =>
        order.status === "Delivered" ||
        order.status === "Picked" ||
        order.status === "Accepted" // Include "Accepted" status in the count
    ) || [];

  // Function to handle accepting an order
  const handleAcceptOrder = async (orderId: string) => {
    setAcceptingOrderId(orderId); // Set the ID of the order being accepted
    try {
      // await the mutation call

      await acceptOrderMutate(orderId);

      refetch(); // Re-fetch orders to update the UI
    } catch (error: any) {
      console.error("Failed to accept order:", error);
      toast.error(
        `Failed to accept order: ${
          error.response?.data?.message || error.message || "Unknown error"
        }`
      );
    } finally {
      setAcceptingOrderId(null); // Reset the accepting state regardless of success or failure
    }
  };

  return (
    <section className="py-6 px-4">
      <div className="bg-blue-primary w-full rounded-md p-4 text-sm text-white mb-6 shadow-md">
        You currently have{" "}
        <span className="font-bold">{acceptedOrders?.length}</span> accepted
        orders{" "}
        <span className="font-bold text-base underline cursor-pointer">
          CLICK HERE TO SEE DETAILS
        </span>
      </div>

      <div className="flex flex-col space-y-6">
        {isPending ? (
          <p className="text-center text-gray-600">Loading orders...</p>
        ) : (
          data?.data?.fetchedData?.map((order: OrderData) => {
            // Check if the current order's ID matches the one being accepted
            const isThisOrderBeingAccepted = acceptingOrderId === order._id;

            // Date parsing with validation
            const orderDate = new Date(order.createdAt);
            const timeAgo = isValid(orderDate)
              ? formatDistanceToNow(orderDate, { addSuffix: true })
              : "N/A"; // Fallback if date is invalid

            return (
              <div
                key={order._id} // Use unique _id from API for key
                className="w-full bg-white rounded-xl shadow-md border p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-lg font-semibold text-gray-800">
                    {order.guest
                      ? `${order.guest.firstname} ${order.guest.lastname}`
                      : order.user?.email || "N/A Customer"}
                  </h1>
                  <p
                    className={`text-white text-xs px-3 py-1 rounded-full ${
                      order.status === "Pending"
                        ? "bg-gray-500" // Example color for Pending
                        : order.status === "Accepted"
                        ? "bg-blue-primary" // Example color for Accepted
                        : order.status === "Picked"
                        ? "bg-yellow-500" // Example color for Picked
                        : "bg-green-500" // Example color for Delivered
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">
                    Order Placed:
                  </span>{" "}
                  {timeAgo}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">State:</span>{" "}
                  {order.state}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">
                    Pick-up Location:
                  </span>{" "}
                  {order.pickupLocation}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">
                    Drop-off Location:
                  </span>{" "}
                  {order.dropoffLocation}
                </p>
                <div className="flex gap-4 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {order.date ||
                      (isValid(orderDate)
                        ? orderDate.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A")}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span>{" "}
                    {order.time ||
                      (isValid(orderDate)
                        ? orderDate.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A")}
                  </p>
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Delivery Type:</span>{" "}
                    {order.deliveryType}
                  </p>
                  <p>
                    <span className="font-medium">Vehicle Request:</span>{" "}
                    {order.vehicleRequest}
                  </p>
                </div>

                {order && typeof order.deliveryFee === "number" ? (
                  <p className="text-sm font-semibold text-gray-700">
                    Amount:{" "}
                    <span className="text-blue-primary">
                      ₦
                      {order.deliveryFee.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                ) : (
                  <p className="text-sm font-semibold text-gray-700">
                    Amount: <span className="text-blue-primary">₦0.00</span>{" "}
                    {/* Fallback for missing/invalid amount */}
                  </p>
                )}
                <div className="flex justify-end gap-3 pt-4">
                  {order.status === "Pending" && (
                    <>
                      <Button
                        variant="secondary"
                        disabled={isThisOrderBeingAccepted}
                      >
                        Decline
                      </Button>
                      <Button
                        onClick={() => handleAcceptOrder(order._id)}
                        disabled={isThisOrderBeingAccepted} // Disable only this button
                      >
                        {isThisOrderBeingAccepted ? "Accepting..." : "Accept"}
                      </Button>
                    </>
                  )}
                  {order.status === "Accepted" && (
                    <Button disabled>Order Accepted</Button> // Button for accepted orders
                  )}
                  {order.status === "Picked" && (
                    <Button disabled>Picked Up</Button>
                  )}
                  {order.status === "Delivered" && (
                    <Button disabled>Delivered</Button>
                  )}
                </div>
              </div>
            );
          })
        )}
        {!isPending && (!data || data.data.length === 0) && (
          <p className="text-center text-gray-600">No orders to display.</p>
        )}
      </div>
    </section>
  );
}

export default Orders;
