"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { ContactModal } from "./contactmodal";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const productArray = [
  {
    name: "Strawberry",
    image: "/assets/strawberry.png",
    price: "₦23,000",
    desc: "Organic Strawberry 1 pack of 6pcs",
  },
];

export const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const [openContactModal, setOpenContactModal] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleProceed = () => {
    onClose(); // Close cart modal first
    setTimeout(() => {
      setOpenContactModal(true); // Then open contact modal
    }, 300); // Small delay for smooth transition
  };

  const handleCloseContactModal = () => {
    setOpenContactModal(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <div className="bg-white rounded-xl w-[90%] max-w-screen-sm p-6 space-y-6 shadow-lg max-h-[90vh] overflow-y-auto">
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Cart Details
          </h1>

          <div className="space-y-4">
            {/* Product Items */}
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex justify-between bg-[#FAFAFA] items-start p-3 rounded-lg"
              >
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src="/assets/strawberry.png"
                    className="h-16 w-16 object-cover rounded-md bg-white p-1"
                    alt="Strawberries"
                  />
                  <div className="space-y-2">
                    <p className="text-blue-primary font-medium">
                      Organic Strawberry 1 pack of 6pcs
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-white px-2 py-1 rounded border">
                        <button className="px-1 text-gray-500 hover:text-gray-700">
                          -
                        </button>
                        <span className="font-medium">3</span>
                        <button className="px-1 text-gray-500 hover:text-gray-700">
                          +
                        </button>
                      </div>
                      <button className="text-red-500 hover:text-red-700 p-1">
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-gray-600">₦23,000/pc</p>
                  <h2 className="text-blue-primary font-bold text-lg">
                    ₦69,000
                  </h2>
                </div>
              </div>
            ))}

            {/* Order Summary */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium">₦260,000</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Delivery fee</p>
                <p className="font-medium">₦60,000</p>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <p className="font-bold text-gray-900">Total</p>
                <p className="font-bold text-blue-primary text-lg">₦320,000</p>
              </div>
            </div>

            {/* Proceed Button */}
            <button
              className="w-full bg-blue-primary hover:bg-blue-700 text-white py-3 px-4 rounded-md text-base font-medium transition-colors duration-200 mt-4"
              onClick={handleProceed}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={openContactModal}
        onClose={handleCloseContactModal}
      />
    </>
  );
};
