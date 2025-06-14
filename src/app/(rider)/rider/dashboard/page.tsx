"use client";

import { Button } from "@/components/button";
import { useGetOrders } from "@/services/orders/query";
import { formatDistanceToNow } from "date-fns";

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
    // Added for orders with registered users
    _id: string;
    email: string;
  };
  pickupLocation: string;
  dropoffLocation: string;
  state: string;
  status: "Pending" | "Delivered" | "Picked" | string;
  date?: string;
  time?: string;
  deliveryType: string;
  vehicleRequest: string;
  orderType: string;
  amount: number;
  paystackReference: string;
  paymentStatus: string;
  products: any[]; // Adjust if you have a specific product type
  createdAt: string; // The creation date from the API
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

function Orders() {
  const { data, isPending } = useGetOrders();

  // Filter for accepted orders based on your definition of "accepted"
  // For this example, let's assume 'Delivered' or 'Picked' status means accepted.
  // You might have a specific 'accepted' status from your backend.
  const acceptedOrders =
    data?.data?.filter(
      (order: OrderData) =>
        order.status === "Delivered" || order.status === "Picked"
    ) || [];

  return (
    <section className="py-6 px-4">
      <div className="bg-blue-primary w-full rounded-md p-4 text-sm text-white mb-6 shadow-md">
        You currently have{" "}
        <span className="font-bold">{acceptedOrders.length}</span> accepted
        orders{" "}
        <span className="font-bold text-base underline cursor-pointer">
          CLICK HERE TO SEE DETAILS
        </span>
      </div>

      <div className="flex flex-col space-y-6">
        {isPending ? (
          <p className="text-center text-gray-600">Loading orders...</p>
        ) : (
          data?.data?.map((order: OrderData) => {
            // Calculate time ago
            const timeAgo = formatDistanceToNow(new Date(order.createdAt), {
              addSuffix: true,
            });

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
                  <p className="bg-blue-primary text-white text-xs px-3 py-1 rounded-full">
                    {timeAgo}
                  </p>
                </div>

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
                      new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span>{" "}
                    {order.time ||
                      new Date(order.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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

                <p className="text-sm font-semibold text-gray-700">
                  Amount:{" "}
                  <span className="text-blue-primary">
                    ₦{order.amount.toLocaleString()}
                  </span>
                </p>
                {/* Assuming 'note' is not directly in your API data,
                    you might need to add it to your backend or remove this line. */}
                {/* <p className="text-sm italic text-gray-600">Note: {order.note}</p> */}

                <div className="flex justify-end gap-3 pt-4">
                  {order.status === "Pending" && (
                    <>
                      <Button variant="secondary">Decline</Button>
                      <Button>Accept</Button>
                    </>
                  )}
                  {/* You can add more status-based buttons here */}
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
