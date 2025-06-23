"use client";

import { useGetQuoteMutation } from "@/services/orders/mutation";

interface CartItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  quantity: number;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  total: number;
}

export const ContactModal = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  total,
}: ContactModalProps) => {
  if (!isOpen) return null;

  console.log(cartItems);

  const { mutate, isPending } = useGetQuoteMutation();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-xl w-[90%] max-w-md p-6 space-y-4">
        <h2 className="text-xl font-bold">Contact Information</h2>

        {/* Display order summary */}
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Your Order:</h3>
          <ul className="space-y-2 max-h-40 overflow-y-auto">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-medium">
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Contact form would go here */}
        <form className="space-y-4">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full py-3 px-4 focus:outline-none border border-[#A5A4A0] rounded-md placeholder:text-gray-400 text-base"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="w-full py-3 px-4 focus:outline-none border border-[#A5A4A0] rounded-md placeholder:text-gray-400 text-base"
              />
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Delivery Address
              </h3>
              <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-md border border-gray-200">
                <svg
                  className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-gray-700">
                  19, Fastima Lekki Phase One, Lagos State
                </p>
              </div>
            </div>
          </div>
        </form>

        <button
          onClick={onClose}
          className="w-full bg-blue-primary text-white py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Helper function (same as in CartModal)
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(price);
};
