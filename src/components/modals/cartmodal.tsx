// components/modals/cartmodal.tsx
"use client";

import { useState } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Router } from "lucide-react";

interface CartItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  shopId?: string;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export const CartModal = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  subtotal,
  deliveryFee,
  total,
  shopId,
}: CartModalProps) => {
  const [openContactModal, setOpenContactModal] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCloseContactModal = () => {
    setOpenContactModal(false);
  };

  console.log(shopId);
  const router = useRouter();
  const handleProceed = () => {
    router.push(`/shops/checkout/${shopId}`);
  };
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <div className="bg-white rounded-xl w-[90%] max-w-screen-sm p-6 space-y-6 shadow-lg max-h-[90vh] overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close cart"
          >
            <FaTimes size={24} />
          </button>
          <h1 className="text-2xl font-bold text-center text-gray-900 mt-2">
            {" "}
            {/* Added mt-2 for spacing */}
            Cart Details
          </h1>
          <div className="space-y-4">
            {/* Product Items */}
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                {" "}
                {/* Increased padding */}
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="bg-blue-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between bg-[#FAFAFA] items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <img
                        src={item.imageUrl}
                        className="h-16 w-16 object-cover rounded-md bg-white p-1 border border-gray-200"
                        alt={item.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/assets/placeholder.png";
                        }}
                      />
                      <div className="space-y-2">
                        <p className="text-blue-primary font-medium">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded border">
                            <button
                              className="px-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                              onClick={() =>
                                onUpdateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="font-medium w-6 text-center">
                              {" "}
                              {/* Fixed width */}
                              {item.quantity}
                            </span>
                            <button
                              className="px-1 text-gray-500 hover:text-gray-700"
                              onClick={() =>
                                onUpdateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="text-red-500 hover:text-red-700 p-1 transition-colors"
                            onClick={() => onRemoveItem(item.id)}
                            aria-label="Remove item"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-gray-600">{formatPrice(item.price)}</p>
                      <h2 className="text-blue-primary font-bold text-lg">
                        {formatPrice(item.price * item.quantity)}
                      </h2>
                    </div>
                  </div>
                ))}

                {/* Order Summary */}
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-medium">{formatPrice(subtotal)}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Delivery fee</p>
                    <p className="font-medium">{formatPrice(deliveryFee)}</p>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <p className="font-bold text-gray-900">Total</p>
                    <p className="font-bold text-blue-primary text-lg">
                      {formatPrice(total)}
                    </p>
                  </div>
                </div>

                <button
                  className="w-full bg-blue-primary hover:bg-blue-700 text-white py-3 px-4 rounded-md text-base font-medium transition-colors duration-200 mt-4 disabled:opacity-50"
                  onClick={handleProceed}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
