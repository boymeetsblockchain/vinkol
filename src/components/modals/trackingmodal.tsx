import { useState } from "react";

type PackageData = {
  number: string;
  pickuplocation: string;
  dropOffLocation: string;
  status: "on route" | "with rider" | "delivered";
  riderName?: string;
  riderNumber?: string;
  vechicle?: string;
};

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any; // Or your specific order data type
}

export const TrackingModal = ({
  isOpen,
  onClose,
  data,
}: TrackingModalProps) => {
  if (!isOpen) {
    return null;
  }

  // Destructure data for easier access, providing fallbacks for potentially missing data
  const {
    trackingId = "N/A",
    user = "N/A",
    pickupLocation = "N/A",
    dropoffLocation = "N/A",
    status = "N/A",
    vehicleRequest = "N/A",
    // Assuming rider details are not directly in the initial fetch,
    // you might need to fetch them separately or they'll be undefined.
    // For now, using placeholders.
    riderName = "N/A",
    riderNumber = "N/A",
  } = data;

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
            Owner <span className="text-black">{user}</span>{" "}
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
