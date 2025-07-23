// src/app/(rider)/rider/dashboard/history/page.tsx (your component file)

"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { useGetRiderOrders } from "@/services/orders/query";
import { useChangeOrderStatus } from "@/services/orders/mutation";
import { formatDistanceToNow, isValid } from "date-fns";
import { toast } from "sonner";

// Define an interface for your order data
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
  status: "Pending" | "Accepted" | "Delivered" | "Picked" | string;
  date?: string;
  time?: string;
  deliveryType: string;
  vehicleRequest: string;
  orderType: string;
  amount: number;
  paystackReference: string;
  paymentStatus: string;
  products: any[];
  createdAt: string;
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
  totalAmount?: number;
  note?: string;
}

function OrderHistory() {
  const { data, isLoading, isError, refetch } = useGetRiderOrders();
  // Using mutateAsync from useChangeOrderStatus for better async control
  const { mutateAsync: changeStatusMutate } = useChangeOrderStatus();

  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [otpInput, setOtpInput] = useState("");
  const [changingStatusOrderId, setChangingStatusOrderId] = useState<
    string | null
  >(null);

  const activeOrdersCount =
    data?.data?.filter(
      (order: OrderData) =>
        order.status === "Accepted" || order.status === "Picked"
    ).length || 0;

  const historyOrders =
    data?.data?.filter((order: OrderData) => order.status !== "Pending") || [];

  const handleChangeStatus = async (
    orderId: string,
    newStatus: "Picked" | "Delivered",
    otp?: string
  ) => {
    setChangingStatusOrderId(orderId);
    try {
      // Define the payload structure that matches what useChangeOrderStatus expects
      // This is { status: "..." } or { status: "...", orderOtp: "..." }
      const requestData: { status: "Picked" | "Delivered"; orderOtp?: string } =
        {
          status: newStatus,
        };

      if (newStatus === "Delivered" && otp) {
        requestData.orderOtp = otp;
      }

      // Pass the orderId and the requestData as a single object to mutateAsync
      await changeStatusMutate({ id: orderId, data: requestData });

      toast.success(`Order status updated to ${newStatus}!`);
      refetch();
      if (newStatus === "Delivered") {
        setOtpModalOpen(false);
        setOtpInput("");
        setCurrentOrderId(null);
      }
    } catch (error: any) {
      console.error(`Failed to change order status to ${newStatus}:`, error);
      toast.error(
        `Failed to update status: ${
          error.response?.data?.message || error.message || "Unknown error"
        }`
      );
    } finally {
      setChangingStatusOrderId(null);
    }
  };

  const handleOpenOtpModal = (orderId: string) => {
    setCurrentOrderId(orderId);
    setOtpModalOpen(true);
  };

  const handleOtpSubmit = () => {
    if (currentOrderId && otpInput) {
      handleChangeStatus(currentOrderId, "Delivered", otpInput);
    } else {
      toast.error("Please enter the OTP.");
    }
  };

  if (isLoading) {
    return (
      <section className="py-6 px-4 text-center text-gray-600">
        Loading order history...
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-6 px-4 text-center text-red-600">
        Error loading orders. Please try again later.
      </section>
    );
  }

  return (
    <section className="py-6 px-4">
      <div className="bg-blue-primary w-full rounded-md p-4 text-sm text-white mb-6 shadow-md">
        You currently have{" "}
        <span className="font-bold">{activeOrdersCount}</span> accepted orders{" "}
      </div>

      <div className="flex flex-col space-y-6">
        {historyOrders.length === 0 ? (
          <p className="text-center text-gray-600">
            No past orders to display.
          </p>
        ) : (
          historyOrders.map((order: OrderData) => {
            const orderDate = new Date(order.createdAt);
            const timeAgo = isValid(orderDate)
              ? formatDistanceToNow(orderDate, { addSuffix: true })
              : "N/A";

            const customerName = order.guest
              ? `${order.guest.firstname} ${order.guest.lastname}`
              : order.user?.email || "N/A Customer";

            const isButtonLoading = changingStatusOrderId === order._id;

            return (
              <div
                key={order._id}
                className="w-full bg-white rounded-xl shadow-md border p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-lg font-semibold text-gray-800">
                    {customerName}
                  </h1>
                  <p
                    className={`text-white text-xs px-3 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : order.status === "Picked"
                        ? "bg-yellow-500"
                        : "bg-blue-primary"
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

                <p className="text-sm font-semibold text-gray-700">
                  Amount:{" "}
                  <span className="text-blue-primary">
                    ₦
                    {(order.totalAmount || order.amount).toLocaleString(
                      "en-NG",
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                    )}
                  </span>
                </p>

                {order.note && (
                  <p className="text-sm italic text-gray-600">
                    Note: {order.note}
                  </p>
                )}

                <div className="flex justify-end gap-3 pt-4">
                  {order.status === "Accepted" && (
                    <Button
                      variant="auth"
                      onClick={() => handleChangeStatus(order._id, "Picked")}
                      disabled={isButtonLoading}
                    >
                      {isButtonLoading ? "Picking Up..." : "Mark as Picked"}
                    </Button>
                  )}
                  {order.status === "Picked" && (
                    <Button
                      variant="auth"
                      onClick={() => handleOpenOtpModal(order._id)}
                      disabled={isButtonLoading}
                    >
                      {isButtonLoading ? "Delivering..." : "Mark as Delivered"}
                    </Button>
                  )}
                  {order.status === "Delivered" && (
                    <Button disabled>Completed</Button>
                  )}
                  <Button variant="secondary">View Details</Button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* OTP Modal */}
      {otpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Enter OTP to Complete Delivery
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Please ask the customer for the One-Time Password (OTP) to confirm
              delivery.
            </p>
            <input
              type="text"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              placeholder="Enter OTP"
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-primary"
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setOtpModalOpen(false);
                  setOtpInput("");
                  setCurrentOrderId(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleOtpSubmit}
                disabled={!otpInput || changingStatusOrderId === currentOrderId}
              >
                {changingStatusOrderId === currentOrderId
                  ? "Submitting..."
                  : "Submit OTP"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default OrderHistory;
