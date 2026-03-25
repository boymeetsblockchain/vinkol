"use client";
import { useState } from "react";

// Define the structure of the user object
interface OrderUser {
  _id: string;
  email: string;
}

// Define the structure of the rider object
interface Rider {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
}

// Define the main order/package structure
interface OrderData {
  trackingId: string;
  user: OrderUser;
  guest?: OrderUser;
  pickupLocation: string;
  dropoffLocation: string;
  status: string;
  vehicleRequest?: string;
  rider?: Rider;
}

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: OrderData | null | undefined;
}

export const TrackingModal = ({
  isOpen,
  onClose,
  data,
}: TrackingModalProps) => {
  if (!isOpen || !data) return null;

  const {
    trackingId = "Not Picked Yet",
    user,
    guest,
    pickupLocation = "Not Picked Yet",
    dropoffLocation = "Not Picked Yet",
    status = "Not Picked Yet",
    vehicleRequest = "N/A",
    rider,
  } = data;

  const userName = guest?.email || user?.email || "N/A";
  const riderName = rider
    ? `${rider.firstname || ""} ${rider.lastname || ""}`
    : "Not Picked Yet";
  const riderNumber = rider?.phone || "Not Picked Yet";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white rounded-xl w-[90%] max-w-screen-sm p-6 space-y-6 shadow-lg h-auto overflow-y-auto">
        <h1 className="text-black font-bold text-center md:text-2xl">
          Package Details
        </h1>

        <div className="space-y-4">
          <p className="text-gray-400 capitalize">
            Package Number: <span className="text-black">{trackingId}</span>
          </p>
          {/* <p className="text-gray-400">
            Owner: <span className="text-black">{userName}</span>
          </p> */}
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div className="flex gap-x-3 h-32">
            <div className="flex flex-col items-center">
              <div className="bg-blue-600 h-6 w-6 rounded-full flex items-center justify-center">
                <div className="bg-white h-4 w-4 rounded-full" />
              </div>
              <div className="h-16 bg-gray-400 w-0.5"></div>
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

          <div className="flex gap-x-3">
            <div className="flex flex-col items-center">
              <div className="bg-blue-600 h-6 w-6 rounded-full flex items-center justify-center">
                <div className="bg-white h-4 w-4 rounded-full" />
              </div>
              <div className="h-16 bg-gray-400 w-0.5"></div>
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center ${
                  ["Pending", "Confirmed"].includes(status)
                    ? "bg-gray-400"
                    : "bg-blue-600"
                }`}
              >
                <div className="bg-white h-4 w-4 rounded-full" />
              </div>
              <div className="h-16 bg-gray-400 w-0.5"></div>
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
              </div>
              <div>
                <h2 className="text-gray-400">Package with rider</h2>
              </div>
              <div>
                <h2 className="text-gray-400">Package Delivered</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {/* <p className="text-gray-400 capitalize">
            Rider's Name: <span className="text-black">{riderName}</span>
          </p>
          <p className="text-gray-400 capitalize">
            Rider's Number: <span className="text-black">{riderNumber}</span>
          </p> */}
          <p className="text-gray-400 capitalize">
            Vehicle: <span className="text-black">{vehicleRequest}</span>
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
