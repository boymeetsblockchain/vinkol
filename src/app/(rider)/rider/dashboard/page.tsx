"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/button";
import { useGetAvailableOrders } from "@/services/orders/query";
import { formatDistanceToNow, isValid } from "date-fns";
import { useAcceptOrderMutation } from "@/services/orders/mutation";
import { toast } from "sonner";
import { useUserProfile } from "@/services/rider/query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";

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
  status: "Pending" | "Delivered" | "Picked" | "Accepted" | string;
  date?: string;
  time?: string;
  deliveryType: string;
  vehicleRequest: string;
  orderType: string;
  deliveryFee: number;
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
}

const ITEMS_PER_PAGE = 5;

function Orders() {
  const { data: userProfile } = useUserProfile();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deliveryTypeFilter, setDeliveryTypeFilter] = useState<string>("all");

  const { data, isPending, refetch } = useGetAvailableOrders({
    state: userProfile?.data?.state,
  });

  const { mutate: acceptOrderMutate } = useAcceptOrderMutation();
  const [acceptingOrderId, setAcceptingOrderId] = useState<string | null>(null);

  // Filter and search logic
  const filteredOrders = (data?.data?.fetchedData || []).filter(
    (order: OrderData) => {
      // Status filter
      if (statusFilter !== "all" && order.status !== statusFilter) {
        return false;
      }

      // Delivery type filter
      if (
        deliveryTypeFilter !== "all" &&
        order.deliveryType !== deliveryTypeFilter
      ) {
        return false;
      }

      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          order.guest?.firstname?.toLowerCase().includes(searchLower) ||
          order.guest?.lastname?.toLowerCase().includes(searchLower) ||
          order.trackingId?.toLowerCase().includes(searchLower) ||
          order.pickupLocation?.toLowerCase().includes(searchLower) ||
          order.dropoffLocation?.toLowerCase().includes(searchLower)
        );
      }

      return true;
    }
  );
  console.log(data);
  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, deliveryTypeFilter, searchTerm]);

  const handleAcceptOrder = async (orderId: string) => {
    setAcceptingOrderId(orderId);
    try {
      await acceptOrderMutate(orderId);
      refetch();
      toast.success("Order accepted successfully!");
    } catch (error: any) {
      console.error("Failed to accept order:", error);
      toast.error(
        `Failed to accept order: ${
          error.response?.data?.message || error.message || "Unknown error"
        }`
      );
    } finally {
      setAcceptingOrderId(null);
    }
  };

  const acceptedOrders = filteredOrders.filter(
    (order: OrderData) =>
      order.status === "Delivered" ||
      order.status === "Picked" ||
      order.status === "Accepted"
  );

  return (
    <section className="py-6 px-4">
      <div className="bg-blue-primary w-full rounded-md p-4 text-sm text-white mb-6 shadow-md">
        You currently have{" "}
        <span className="font-bold">{acceptedOrders?.length}</span> accepted
        orders
      </div>

      {/* Filter and Search Controls */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <Select onValueChange={(value: any) => setStatusFilter(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Accepted">Accepted</SelectItem>
              <SelectItem value="Picked">Picked</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-1">
          <Select onValueChange={(value: any) => setDeliveryTypeFilter(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by delivery type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="regular">Regular</SelectItem>
              <SelectItem value="express">Express</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <Input
            type="text"
            placeholder="Search by name, tracking ID, or location..."
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="flex flex-col space-y-6">
        {isPending ? (
          <p className="text-center text-gray-600">Loading orders...</p>
        ) : paginatedOrders.length > 0 ? (
          paginatedOrders.map((order: OrderData) => {
            const isThisOrderBeingAccepted = acceptingOrderId === order._id;
            const orderDate = new Date(order.createdAt);
            const timeAgo = isValid(orderDate)
              ? formatDistanceToNow(orderDate, { addSuffix: true })
              : "N/A";

            return (
              <div
                key={order._id}
                className="w-full bg-white rounded-xl shadow-md border p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-lg font-semibold text-gray-800">
                      {order.guest
                        ? `${order.guest.firstname} ${order.guest.lastname}`
                        : order.user?.email || "N/A Customer"}
                    </h1>
                    <p className="text-xs text-gray-500">
                      Tracking: {order.trackingId}
                    </p>
                  </div>
                  <p
                    className={`text-white text-xs px-3 py-1 rounded-full ${
                      order.status === "Pending"
                        ? "bg-gray-500"
                        : order.status === "Accepted"
                        ? "bg-blue-primary"
                        : order.status === "Picked"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {order.status}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        Order Placed:
                      </span>{" "}
                      {timeAgo}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        State:
                      </span>{" "}
                      {order.state}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        Pick-up:
                      </span>{" "}
                      {order.pickupLocation}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        Drop-off:
                      </span>{" "}
                      {order.dropoffLocation}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        Delivery Type:
                      </span>{" "}
                      {order.deliveryType}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        Vehicle:
                      </span>{" "}
                      {order.vehicleRequest}
                    </p>
                  </div>
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
                    Amount: <span className="text-blue-primary">₦0.00</span>
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
                        disabled={isThisOrderBeingAccepted}
                      >
                        {isThisOrderBeingAccepted ? "Accepting..." : "Accept"}
                      </Button>
                    </>
                  )}
                  {order.status === "Accepted" && (
                    <Button disabled>Order Accepted</Button>
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
        ) : (
          <p className="text-center text-gray-600">
            No orders match your filters.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e: any) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (currentPage < totalPages)
                      setCurrentPage(currentPage + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
}

export default Orders;
