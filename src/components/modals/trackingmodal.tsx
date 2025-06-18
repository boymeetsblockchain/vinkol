import { useState } from "react";

// Define the structure of the user object within your order data
interface OrderUser {
  _id: string;
  email: string;
  name: string; // Assuming the user object also has a name
  // ... other user properties
}

// Define the structure of the main order/package data
interface OrderData {
  trackingId: string;
  user: OrderUser; // 'user' is an object
  pickupLocation: string;
  dropoffLocation: string;
  status: "Pending" | "On Route" | "Delivered" | string; // Adjust as per your actual statuses
  vehicleRequest?: string; // Optional if not always present
  // Assuming rider details might be directly nested or need another lookup
  // If rider is an object:
  rider?: {
    name: string;
    number: string;
    // ...
  };
  // Or if they are top-level properties on the order:
  riderName?: string;
  riderNumber?: string;
  // ... other order properties like createdAt, updatedAt, etc.
}

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: OrderData | null | undefined; // It can be null/undefined initially
}
export const TrackingModal = ({
  isOpen,
  onClose,
  data, // data is now OrderData | null | undefined
}: TrackingModalProps) => {
  if (!isOpen || !data) {
    // Ensure data exists before trying to destructure
    return null;
  }

  const {
    trackingId = "N/A",
    user, // user is now an object, not just "N/A"
    pickupLocation = "N/A",
    dropoffLocation = "N/A",
    status = "N/A",
    vehicleRequest = "N/A",
    // If rider details are directly on the order:
    riderName = "N/A",
    riderNumber = "N/A",
    // If rider is a nested object:
    // rider,
  } = data;

  // Access specific properties of the 'user' object
  const userName = user?.name || user?.email || "N/A"; // Prioritize name, then email

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white rounded-xl w-[90%] max-w-screen-sm p-6 space-y-6 shadow-lg h-auto overflow-y-auto">
        <h1 className="text-black font-bold text-center  md:text-2xl">
          Package Details
        </h1>
        <div className="space-y-4">
          <p className="text-gray-400 capitalize">
            package number: <span className="text-black">{trackingId}</span>{" "}
          </p>
          <p className="text-gray-400 capitalize">
            Owner <span className="text-black">{userName}</span>{" "}
            {/* MODIFIED HERE */}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex gap-x-3 h-32 ">
            <div className="flex flex-col items-center">
              <div className="bg-blue-primary h-6 w-6 rounded-full flex items-center justify-center">
                <div className="bg-white h-4 w-4 rounded-full" />
              </div>
              <div className="h-16 bg-gray-400 w-0.75"></div>
              <div className="bg-green-500 h-6 w-6 rounded-full flex items-center justify-center">
                <div className="bg-white h-4 w-4 rounded-full" />
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-gray-400">Pick-Up Location</h2>
                <p className="text-black text-xs md:text-sm">
                  {pickupLocation}
                </p>
              </div>
              <div>
                <h2 className="text-gray-400">Drop Off Location</h2>
                <p className="text-black text-xs md:text-sm">
                  {dropoffLocation}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-x-3 ">
            <div className="flex flex-col items-center">
              <div className="bg-blue-primary h-6 w-6 rounded-full flex items-center justify-center">
                <div className="bg-white h-4 w-4 rounded-full" />
              </div>
              <div className="h-16 bg-gray-400 w-0.75"></div>
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center ${
                  status === "Pending" ? "bg-gray-400" : "bg-blue-primary"
                }`}
              >
                <div className="bg-white h-4 w-4 rounded-full" />
              </div>
              <div className="h-16 bg-gray-400 w-0.75"></div>
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center ${
                  status === "Delivered" ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                <div className="bg-white h-4 w-4 rounded-full" />
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-gray-400">Rider on route to pick-up</h2>
                <p className="text-black text-xs md:text-sm text-right ">
                  {/* You'll need to get the time from your data if available, otherwise this will remain static */}
                  02:35PM
                </p>
              </div>
              <div>
                <h2 className="text-gray-400">Package with rider</h2>
              </div>
              <div>
                <h2 className="text-gray-400">Package Delivered</h2>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div className="space-y-4">
          <p className="text-gray-400 capitalize">
            Rider's Name <span className="text-black">{riderName}</span>{" "}
          </p>
          <p className="text-gray-400 capitalize">
            Rider's Number <span className="text-black">{riderNumber}</span>{" "}
          </p>
          <p className="text-gray-400 capitalize">
            Vehicle <span className="text-black">{vehicleRequest}</span>{" "}
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};
