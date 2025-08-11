"use client";
import { ShopHeader } from "@/components/shop-page/header";
import { CartModal } from "@/components/modals/cartmodal";
import { useState } from "react";
import { useGetStoreOrders } from "@/services/orders/query";
import { Button } from "@/components/button";
import { useConfirmOrderMutation } from "@/services/orders/mutation";
import { toast } from "sonner";

interface Guest {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  role: string;
  _id: string;
}

interface OrderProduct {
  product: string; // This is the product ID
  quantity: number;
  _id: string; // The _id for this specific order item entry
}

interface Order {
  _id: string;
  guest?: Guest;
  user?: Guest;
  dropoffLocation: string;
  state: string;
  status: string;
  deliveryType: string;
  orderType: string;
  amount: number;
  paystackReference: string;
  paymentStatus: string;
  products: OrderProduct[];
  store: string; // Store ID
  createdAt: string;
  trackingId: string;
}

interface OrderItemCardProps {
  product: any;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({ product }) => {
  return (
    <li className="flex items-center space-x-4 border-b pb-2 mb-2 last:border-b-0 last:pb-0 last:mb-0">
      {product.image?.imageUrl && (
        <img
          src={product.image.imageUrl}
          alt={product.title}
          className="w-16 h-16 object-cover rounded-md flex-shrink-0"
        />
      )}
      <div className="flex-grow">
        <p className="font-semibold text-base">{product.title}</p>
        <p className="text-gray-700 text-sm">{product.description}</p>
        <p className="text-gray-600 text-sm">
          ₦{product.price.toLocaleString()} x {product.quantity}
        </p>
      </div>
      {/* <Button className="">Available for Pickup</Button> */}
    </li>
  );
};

function ShopId() {
  const [openCartModal, setOpenCartModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { data, isLoading, refetch } = useGetStoreOrders({
    page: currentPage,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  const orders: Order[] | undefined = data?.data.fetchedData;
  const totalPages = data?.data.no_of_pages || 1;
  const totalOrders = data?.data.total || 0;

  const {
    mutate: confirmOrderMutate,
    isPending,
    isSuccess,
    isError,
  } = useConfirmOrderMutation();

  const handleConfirmOrder = async (orderId: string) => {
    try {
      await confirmOrderMutate(orderId);
      refetch();
    } catch (error: any) {
      console.error("Failed to accept order:", error);
      toast.error(
        `Failed to confirm order: ${
          error.response?.data?.message || error.message || "Unknown error"
        }`
      );
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page when changing filters
  };

  if (isLoading) {
    return (
      <section className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p>Loading orders...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Orders</h1>

        {/* Filter Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Filter by status:</span>
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="border rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="text-sm text-gray-600">
            Showing {orders?.length || 0} of {totalOrders} orders
          </div>
        </div>

        {orders && orders.length > 0 ? (
          <>
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-lg p-6 shadow-sm bg-gray-50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <p>
                      <strong className="font-semibold">Order ID:</strong>{" "}
                      {order.trackingId}
                    </p>
                    <p>
                      <strong className="font-semibold">Status:</strong>{" "}
                      {order.status}
                    </p>
                    <p>
                      <strong className="font-semibold">Amount:</strong> ₦
                      {order.amount.toLocaleString()}
                    </p>
                    <p>
                      <strong className="font-semibold">Payment Status:</strong>{" "}
                      {order.paymentStatus}
                    </p>
                    <p>
                      <strong className="font-semibold">Customer:</strong>{" "}
                      {order?.guest
                        ? `${order?.guest?.firstname} ${order?.guest?.lastname} (${order?.guest?.email})`
                        : `${order?.user?.firstname} ${order?.user?.lastname} (${order?.user?.email})`}
                    </p>
                    <p>
                      <strong className="font-semibold">
                        Delivery Location:
                      </strong>{" "}
                      {order.dropoffLocation}, {order.state}
                    </p>
                    <p>
                      <strong className="font-semibold">Order Date:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold text-md mb-2">Products:</h3>
                    <ul className="list-none p-0 m-0">
                      {order.products.map((item) => (
                        <OrderItemCard key={item._id} product={item} />
                      ))}
                    </ul>

                    {order.status == "Pending" ? (
                      <Button
                        disabled={isPending}
                        onClick={() => handleConfirmOrder(order._id)}
                        className="mt-6 bg-green-600"
                      >
                        Confirm Order
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1 rounded border ${
                          currentPage === pageNum
                            ? "bg-gray-200 font-medium"
                            : ""
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>
      <CartModal
        isOpen={openCartModal}
        onClose={() => setOpenCartModal(false)}
        cartItems={[]}
        onRemoveItem={function (id: string): void {
          throw new Error("Function not implemented.");
        }}
        onUpdateQuantity={function (id: string, quantity: number): void {
          throw new Error("Function not implemented.");
        }}
        total={0}
      />
    </section>
  );
}

export default ShopId;
