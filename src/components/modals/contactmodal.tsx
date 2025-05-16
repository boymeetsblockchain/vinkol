"use client";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white rounded-xl w-[90%] max-w-screen-sm p-6 space-y-6 shadow-lg flex flex-col h-[80vh] max-h-[600px]">
        <div className="space-y-6 flex-grow overflow-y-auto">
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Contact Details
          </h1>

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
        </div>

        {/* Order Summary - sticks to bottom */}
        <div className="mt-auto">
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

          <button
            className="w-full bg-blue-primary hover:bg-blue-700 text-white py-3 px-4 rounded-md text-base font-medium transition-colors duration-200 mt-6"
            onClick={onClose}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};
