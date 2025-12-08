"use client";

import { ShopHeader } from "@/components/shop-page/header";
import { CartModal } from "@/components/modals/cartmodal";
import { useState } from "react";
import { useGetStoreOrders } from "@/services/orders/query";
import { Button } from "@/components/button";
import { useConfirmOrderMutation } from "@/services/orders/mutation";
import { toast } from "sonner";
import { IOrder } from "@/types/order";

interface OrderItemCardProps {
  product: any;
}

const statusColors: Record<string, string> = {
  Pending: "bg-gray-600",
  Confirmed: "bg-blue-600",
  Shipped: "bg-yellow-600",
  Delivered: "bg-green-600",
  Cancelled: "bg-red-600",
};

const OrderItemCard: React.FC<OrderItemCardProps> = ({ product }) => {
  return (
    <li className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
      {product.image?.imageUrl && (
        <img
          src={product.image.imageUrl}
          alt={product.title}
          className="w-16 h-16 rounded-md object-cover shadow-sm"
        />
      )}

      <div className="flex-1">
        <p className="font-semibold text-gray-800">{product.title}</p>
        <p className="text-sm text-gray-500">{product.description}</p>
        <p className="text-sm text-gray-700 font-medium mt-1">
          ₦{product.price.toLocaleString()} × {product.quantity}
        </p>
      </div>
    </li>
  );
};

function ShopId() {
  const [openCartModal, setOpenCartModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading, refetch } = useGetStoreOrders({
    page: currentPage,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  const orders = data?.data.fetchedData || [];
  const totalPages = data?.data.no_of_pages || 1;
  const totalOrders = data?.data.total || 0;

  const { mutate: confirmOrderMutate, isPending } = useConfirmOrderMutation();

  const handleConfirmOrder = async (orderId: string) => {
    try {
      await confirmOrderMutate(orderId);
      refetch();
      toast.success("Order confirmed");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to confirm order"
      );
    }
  };

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center text-gray-500">
        <p className="animate-pulse text-lg">Loading orders…</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Store Orders</h1>

        {/* Filter Bar */}
        <div className="bg-white border rounded-lg p-4 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => handleStatusFilterChange(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="all">All</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              Showing <strong>{orders.length}</strong> of{" "}
              <strong>{totalOrders}</strong> orders
            </div>
          </div>
        </div>

        {/* Orders List */}
        {orders.length > 0 ? (
          <>
            <div className="space-y-6">
              {orders.map((order: IOrder) => (
                <div
                  key={order._id}
                  className="bg-white border rounded-xl p-6 shadow-sm"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        Order #{order.trackingId}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 text-xs rounded-full text-white capitalize ${
                        statusColors[order.status] || "bg-gray-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Order Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 mb-5">
                    <p>
                      <strong className="text-gray-900">Amount: </strong>₦
                      {order.amount.toLocaleString()}
                    </p>
                    <p>
                      <strong className="text-gray-900">Payment: </strong>
                      {order.paymentStatus}
                    </p>

                    <p>
                      <strong className="text-gray-900">Customer: </strong>
                      {order?.guest
                        ? `${order.guest.firstname} ${order.guest.lastname} (${order.guest.email})`
                        : `${order.user?.firstname} ${order.user?.lastname} (${order.user?.email})`}
                    </p>

                    <p>
                      <strong className="text-gray-900">Delivery: </strong>
                      {order.dropoffLocation}, {order.state}
                    </p>
                  </div>

                  {/* Products */}
                  <h3 className="font-medium text-gray-900 mb-2 text-md">
                    Products
                  </h3>
                  <ul className="space-y-4">
                    {order.products?.map((item) => (
                      <OrderItemCard key={item._id} product={item} />
                    )) || <p className="text-gray-500">No products</p>}
                  </ul>

                  {/* Action */}
                  {order.status === "Pending" && (
                    <Button
                      disabled={isPending}
                      onClick={() => handleConfirmOrder(order._id)}
                      className="mt-6 bg-green-600 hover:bg-green-700"
                    >
                      {isPending ? "Confirming..." : "Confirm Order"}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-md disabled:opacity-40"
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (num) => (
                      <button
                        key={num}
                        onClick={() => handlePageChange(num)}
                        className={`px-3 py-1 border rounded-md ${
                          num === currentPage
                            ? "bg-gray-200 font-medium"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {num}
                      </button>
                    )
                  )}

                  <button
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded-md disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 text-lg py-20">
            No orders found.
          </p>
        )}
      </div>

      {/* Cart Modal */}
      <CartModal
        isOpen={openCartModal}
        onClose={() => setOpenCartModal(false)}
        cartItems={[]}
        onRemoveItem={() => {}}
        onUpdateQuantity={() => {}}
        total={0}
      />
    </section>
  );
}

export default ShopId;
