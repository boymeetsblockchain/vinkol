"use client";

import { useState } from "react";
import { useGetStoreOrders } from "@/services/orders/query";
import { useConfirmOrderMutation } from "@/services/orders/mutation";
import { toast } from "sonner";
import { IOrder } from "@/types/order";
import { CheckCircle, ChevronLeft, ChevronRight, Package, MapPin, User, CreditCard } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  Pending:   { bg: "bg-amber-50",  text: "text-amber-700",  dot: "bg-amber-400" },
  Confirmed: { bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-500"  },
  Shipped:   { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500"},
  Delivered: { bg: "bg-green-50",  text: "text-green-700",  dot: "bg-green-500" },
  Cancelled: { bg: "bg-red-50",    text: "text-red-600",    dot: "bg-red-500"   },
};

const STATUS_FILTERS = ["All", "Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];

const SkeletonOrder = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse space-y-4">
    <div className="flex justify-between">
      <div className="space-y-2">
        <div className="h-5 w-40 bg-gray-100 rounded" />
        <div className="h-3 w-28 bg-gray-100 rounded" />
      </div>
      <div className="h-7 w-20 bg-gray-100 rounded-full" />
    </div>
    <div className="grid grid-cols-2 gap-3">
      {[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-gray-100 rounded-xl" />)}
    </div>
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 bg-gray-100 rounded-lg" />
      <div className="space-y-2 flex-1">
        <div className="h-4 w-1/2 bg-gray-100 rounded" />
        <div className="h-3 w-1/3 bg-gray-100 rounded" />
      </div>
    </div>
  </div>
);

function OrderCard({ order, onConfirm, isConfirming }: { order: IOrder; onConfirm: (id: string) => void; isConfirming: boolean }) {
  const s = STATUS_STYLES[order.status] || { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-400" };
  const customerName = order?.guest
    ? `${order.guest.firstname} ${order.guest.lastname}`
    : `${order.user?.firstname ?? ""} ${order.user?.lastname ?? ""}`.trim();
  const customerEmail = order?.guest?.email ?? order.user?.email ?? "";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Card header */}
      <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-50">
        <div>
          <p className="font-bold text-gray-900 text-base">Order #{order.trackingId}</p>
          <p className="text-xs text-gray-400 mt-0.5">{new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          {order.status}
        </span>
      </div>

      {/* Info grid */}
      <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3 py-2.5">
          <CreditCard size={15} className="text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">Amount</p>
            <p className="text-sm font-bold text-gray-900">₦{order.amount.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3 py-2.5">
          <CheckCircle size={15} className={`flex-shrink-0 ${order.paymentStatus === "Successful" ? "text-green-500" : "text-amber-400"}`} />
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">Payment</p>
            <p className={`text-sm font-semibold ${order.paymentStatus === "Successful" ? "text-green-700" : "text-amber-700"}`}>{order.paymentStatus}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3 py-2.5">
          <User size={15} className="text-gray-400 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">Customer</p>
            <p className="text-sm font-semibold text-gray-900 truncate">{customerName}</p>
            <p className="text-xs text-gray-400 truncate">{customerEmail}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3 py-2.5">
          <MapPin size={15} className="text-gray-400 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">Delivery</p>
            <p className="text-sm text-gray-700 break-words">{order.dropoffLocation}, {order.state}</p>
          </div>
        </div>
      </div>

      {/* Products */}
      {order.products && order.products.length > 0 && (
        <div className="px-6 pb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Products</p>
          <div className="space-y-2.5">
            {order.products.map((item: any) => (
              <div key={item._id} className="flex items-center gap-3">
                {item.image?.imageUrl ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <img src={item.image.imageUrl} alt={item.title} className="w-11 h-11 rounded-lg object-cover border border-gray-100 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity" />
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl border-none bg-transparent shadow-none p-0 flex justify-center items-center">
                      <DialogTitle className="sr-only">Product Image</DialogTitle>
                      <img src={item.image.imageUrl} alt={item.title} className="max-w-full max-h-[85vh] rounded-xl object-contain" />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Package size={16} className="text-gray-300" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
                  <p className="text-xs text-gray-500">₦{item.price.toLocaleString()} × {item.quantity}</p>
                </div>
                <p className="text-sm font-bold text-gray-900 flex-shrink-0">₦{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirm action */}
      {order.status === "Pending" && (
        <div className="px-6 pb-5">
          <button
            disabled={isConfirming}
            onClick={() => onConfirm(order._id)}
            className="w-full py-2.5 rounded-xl bg-[var(--color-blue-primary)] text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2"
          >
            <CheckCircle size={15} />
            {isConfirming ? "Confirming…" : "Confirm Order"}
          </button>
        </div>
      )}
    </div>
  );
}

function ShopId() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");

  const { data, isLoading, refetch } = useGetStoreOrders({
    page: currentPage,
    status: statusFilter !== "All" ? statusFilter : undefined,
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
      toast.error(error.response?.data?.message || error.message || "Failed to confirm order");
    }
  };

  return (
    <div className="p-5 md:p-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          {!isLoading && (
            <p className="text-sm text-gray-400 mt-0.5">{totalOrders} total orders</p>
          )}
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap mb-6">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
              statusFilter === s
                ? "bg-[var(--color-blue-primary)] text-white border-[var(--color-blue-primary)]"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <SkeletonOrder key={i} />)}
        </div>
      )}

      {/* Orders */}
      {!isLoading && orders.length > 0 && (
        <>
          <div className="space-y-4">
            {orders.map((order: IOrder) => (
              <OrderCard key={order._id} order={order} onConfirm={handleConfirmOrder} isConfirming={isPending} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition ${
                    num === currentPage
                      ? "bg-[var(--color-blue-primary)] text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}

      {/* Empty */}
      {!isLoading && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
            <Package size={28} className="text-[var(--color-blue-primary)]" />
          </div>
          <h3 className="font-semibold text-gray-800 text-lg">No orders yet</h3>
          <p className="text-gray-400 text-sm mt-1">Orders placed by customers will appear here.</p>
        </div>
      )}
    </div>
  );
}

export default ShopId;
