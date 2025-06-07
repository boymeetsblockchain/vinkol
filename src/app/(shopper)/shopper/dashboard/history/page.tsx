"use client";

import { Button } from "@/components/button";

const deliveries = [
  {
    note: "Fragile product handle with care",
    status: "Pending",
    responseOptions: ["Decline", "Accept"],
    customer: "Victor Osato",
    timeAgo: "1 mins ago",
    locationNote: "Outside Lagos",
    pickUpLocation: "19, Fatisima Street, Mushin Lagos State",
    dropOffLocation: "4, Fatisima Street, Surulere Benin State",
    date: "April 27, 2025",
    time: "6:00pm",
    deliveryType: "Regular",
    vehicleRequest: "Truck",
    price: "₦23,000",
  },
  {
    note: "Handle with care - electronics",
    status: "Pending",
    responseOptions: ["Decline", "Accept"],
    customer: "Blessing Ighodalo",
    timeAgo: "5 mins ago",
    locationNote: "Inside Abuja",
    pickUpLocation: "12, Unity Road, Garki, Abuja",
    dropOffLocation: "21, Agbani Road, Enugu",
    date: "April 28, 2025",
    time: "3:00pm",
    deliveryType: "Express",
    vehicleRequest: "Van",
    price: "₦18,500",
  },
  {
    note: "Perishable goods - deliver fast",
    status: "Pending",
    responseOptions: ["Decline", "Accept"],
    customer: "Chinedu Eze",
    timeAgo: "10 mins ago",
    locationNote: "Outside Port Harcourt",
    pickUpLocation: "45, Elelenwo Street, PH",
    dropOffLocation: "88, Ugbowo Road, Benin",
    date: "April 29, 2025",
    time: "9:00am",
    deliveryType: "Regular",
    vehicleRequest: "Bike",
    price: "₦7,000",
  },
  {
    note: "Glassware - extremely fragile",
    status: "Pending",
    responseOptions: ["Decline", "Accept"],
    customer: "Aisha Bello",
    timeAgo: "20 mins ago",
    locationNote: "Inside Kano",
    pickUpLocation: "16, Gidan Makama Road, Kano",
    dropOffLocation: "34, Wuse II, Abuja",
    date: "April 30, 2025",
    time: "2:30pm",
    deliveryType: "Regular",
    vehicleRequest: "Truck",
    price: "₦20,000",
  },
  {
    note: "Heavy equipment - secure properly",
    status: "Pending",
    responseOptions: ["Decline", "Accept"],
    customer: "Emeka Uche",
    timeAgo: "25 mins ago",
    locationNote: "Outside Owerri",
    pickUpLocation: "5, Ikenegbu Layout, Owerri",
    dropOffLocation: "22, Abak Road, Uyo",
    date: "May 1, 2025",
    time: "11:00am",
    deliveryType: "Bulk",
    vehicleRequest: "Trailer",
    price: "₦50,000",
  },
  {
    note: "Medical supplies - urgent delivery",
    status: "Pending",
    responseOptions: ["Decline", "Accept"],
    customer: "Grace Adeyemi",
    timeAgo: "30 mins ago",
    locationNote: "Inside Ibadan",
    pickUpLocation: "101, Ring Road, Ibadan",
    dropOffLocation: "17, Marina, Lagos Island",
    date: "May 2, 2025",
    time: "8:00am",
    deliveryType: "Express",
    vehicleRequest: "Van",
    price: "₦15,000",
  },
];
function Orders() {
  return (
    <section className="py-6 px-4">
      <div className="bg-blue-primary w-full rounded-md p-4 text-sm text-white mb-6 shadow-md">
        You currently have{" "}
        <span className="font-bold">{deliveries.length}</span> accepted orders{" "}
        <span className="font-bold text-base underline cursor-pointer">
          CLICK HERE TO SEE DETAILS
        </span>
      </div>

      <div className="flex flex-col space-y-6">
        {deliveries.map((data, index) => (
          <div
            key={index}
            className="w-full bg-white rounded-xl shadow-md border p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold text-gray-800">
                {data.customer}
              </h1>
            </div>

            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">State:</span>{" "}
              {data.locationNote}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">
                Pick-up Location:
              </span>{" "}
              {data.pickUpLocation}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">
                Drop-off Location:
              </span>{" "}
              {data.dropOffLocation}
            </p>
            <div className="flex gap-4 text-sm text-gray-600">
              <p>
                <span className="font-medium">Date:</span> {data.date}
              </p>
              <p>
                <span className="font-medium">Time:</span> {data.time}
              </p>
            </div>

            <div className="flex gap-4 text-sm text-gray-600">
              <p>
                <span className="font-medium">Delivery Type:</span>{" "}
                {data.deliveryType}
              </p>
              <p>
                <span className="font-medium">Vehicle Request:</span>{" "}
                {data.vehicleRequest}
              </p>
            </div>

            <p className="text-sm font-semibold text-gray-700">
              Amount: <span className="text-blue-primary">{data.price}</span>
            </p>
            <p className="text-sm italic text-gray-600">Note: {data.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Orders;
