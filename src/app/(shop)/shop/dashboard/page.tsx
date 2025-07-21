"use client";
import { ShopHeader } from "@/components/shop-page/header";
import { CartModal } from "@/components/modals/cartmodal";
import { useState } from "react";
import { useGetStoreOrders } from "@/services/orders/query";
import { useGetSingleProductQuery } from "@/services/products/query";
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
  guest: Guest;
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
  productId: string;
  quantity: number;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({
  productId,
  quantity,
}) => {
  const { data: product, isLoading: isLoadingProduct } =
    useGetSingleProductQuery(productId);

  if (isLoadingProduct) {
    return <li className="text-gray-500">Loading product details...</li>;
  }

  if (!product) {
    return (
      <li className="text-red-500">
        Product details not found for ID: {productId}.
      </li>
    );
  }

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
          ₦{product.price.toLocaleString()} x {quantity}
        </p>
      </div>
      {/* <Button className="">Available for Pickup</Button> */}
    </li>
  );
};

function ShopId() {
  const [openCartModal, setOpenCartModal] = useState<boolean>(false);
  const { data, isLoading, refetch } = useGetStoreOrders();

  const orders: Order[] | undefined = data?.data;

  const {
    mutate: confirmOrderMutate,
    isPending,
    isSuccess,
    isError,
  } = useConfirmOrderMutation();

  const handleConfirmOrder = async (orderId: string) => {
    try {
      // await the mutation call

      await confirmOrderMutate(orderId);

      refetch(); // Re-fetch orders to update the UI
    } catch (error: any) {
      console.error("Failed to accept order:", error);
      toast.error(
        `Failed to confirm order: ${
          error.response?.data?.message || error.message || "Unknown error"
        }`
      );
    }
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
      {/* <ShopHeader isLogo={true} /> */}

      <div className="container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Orders</h1>
        {orders && orders.length > 0 ? (
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
                    {order?.guest?.firstname} {order?.guest?.lastname} (
                    {order?.guest?.email})
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
                      <OrderItemCard
                        key={item._id}
                        productId={item.product}
                        quantity={item.quantity}
                      />
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
