"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { deliverySchema } from "@/dto/delivery.form.schema";
import { Button } from "../button";
import Autocomplete from "react-google-autocomplete";
import { useGetQuoteMutation } from "@/services/orders/mutation";
import { toast } from "sonner"; // Assuming 'sonner' for toasts
import { useRouter } from "next/navigation";

// Helper to get current time in HH:MM format
const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
};

export const BookADeliveryForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof deliverySchema>>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      fullname: "",
      dropoff: "",
      pickup: "",
      date: "",
      time: getCurrentTime(),
      email: "",
      type: "regular",
      vehicle: "bike",
      priority: "low",
      note: "",
      state: "",
    },
  });

  const { mutate, isPending } = useGetQuoteMutation(); // isPending indicates mutation loading state

  const onSubmit = (data: z.infer<typeof deliverySchema>) => {
    mutate(
      {
        state: data.state,
        orderType: "Delivery", // Assuming fixed order type
        pickupLocation: data.pickupCoords
          ? {
              lat: String(data.pickupCoords.lat),
              lng: String(data.pickupCoords.lng),
            }
          : { lat: "", lng: "" }, // Ensure coordinates are strings for payload
        dropoffLocation: data.dropoffCoords
          ? {
              lat: String(data.dropoffCoords.lat),
              lng: String(data.dropoffCoords.lng),
            }
          : { lat: "", lng: "" }, // Ensure coordinates are strings for payload
        deliveryType: data.type,
        vehicleRequest: data.vehicle,
      },
      {
        onSuccess: (responseData) => {
          // Format date for display (e.g., "April 27, 2025")
          console.log(responseData);
          const dateObj = new Date(data.date);
          const formattedDate = dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          // Format time for display (e.g., "6:00 PM")
          const [hours, minutes] = data.time.split(":").map(Number);
          const timeObj = new Date();
          timeObj.setHours(hours, minutes, 0, 0);
          const formattedTime = timeObj.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });

          // Create URLSearchParams to build the query string safely
          const params = new URLSearchParams();
          params.append("state", data.state);
          params.append("pickupLocation", data.pickup); // Use the full address string
          params.append("dropoffLocation", data.dropoff); // Use the full address string
          params.append("date", formattedDate);
          params.append("time", formattedTime);
          params.append("deliveryType", data.type);
          params.append("vehicleRequest", data.vehicle);
          params.append("amount", String(responseData.data.price)); // <--- Access 'price' inside 'data'
          params.append("note", data.note || "");

          toast.success("Quote successfully retrieved!", {
            description: `Amount: ₦${
              responseData.data.price?.toLocaleString() || "N/A"
            }`, // <--- Access 'price' for toast
          });

          // Navigate to the quote page with the generated query string
          router.push(`/quote?${params.toString()}`);
        },
        onError: (error: any) => {
          console.error("Get Quote failed:", error);
          toast.error(
            error.message || "Failed to get quote. Please try again."
          );
        },
      }
    );
  };

  return (
    <section className="py-12 max-w-screen-xl mx-auto px-4">
      <div className="space-y-4 mb-6">
        <h1 className="text-4xl md:text-5xl font-bold">Book a Delivery</h1>
        <p className="font-medium text-gray-700 text-base">
          Fill in the form to book a rider for delivery.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Fullname Field */}
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Fullname"
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="email"
                    placeholder="Email"
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* State Field */}
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text" // Changed from 'state' to 'text' for standard input
                    placeholder="Select state"
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pickup Location with Autocomplete */}
          <FormField
            control={form.control}
            name="pickup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Location</FormLabel>
                <FormControl>
                  <Autocomplete
                    apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY}
                    onPlaceSelected={(place) => {
                      const lat = place.geometry?.location?.lat();
                      const lng = place.geometry?.location?.lng();
                      form.setValue(
                        "pickup",
                        place.formatted_address || place.name
                      );
                      form.setValue("pickupCoords", { lat, lng });
                    }}
                    options={{
                      types: ["address"],
                      componentRestrictions: { country: ["ng"] }, // Restrict to Nigeria
                      fields: [
                        "formatted_address",
                        "name",
                        "geometry.location",
                      ],
                    }}
                    placeholder="Pickup Location"
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                    defaultValue={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange} // Keep onChange for React Hook Form's internal tracking
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dropoff Location with Autocomplete */}
          <FormField
            control={form.control}
            name="dropoff"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dropoff Location</FormLabel>
                <FormControl>
                  <Autocomplete
                    apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY}
                    onPlaceSelected={(place) => {
                      const lat = place.geometry?.location?.lat();
                      const lng = place.geometry?.location?.lng();
                      form.setValue(
                        "dropoff",
                        place.formatted_address || place.name
                      );
                      form.setValue("dropoffCoords", { lat, lng });
                    }}
                    options={{
                      types: ["address"],
                      componentRestrictions: { country: ["ng"] }, // Restrict to Nigeria
                      fields: [
                        "formatted_address",
                        "name",
                        "geometry.location",
                      ],
                    }}
                    placeholder="Dropoff Location"
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                    defaultValue={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange} // Keep onChange for React Hook Form's internal tracking
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Field */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Date</FormLabel>
                <FormControl>
                  <input
                    type="date"
                    {...field}
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Time Field */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Time</FormLabel>
                <FormControl>
                  <input
                    type="time"
                    {...field}
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Priority Dropdown */}
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border border-blue-primary text-blue-primary py-4 px-3 rounded-md appearance-none bg-white pr-8"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type Dropdown */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Type</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border border-blue-primary text-blue-primary py-4 px-3 rounded-md appearance-none bg-white pr-8"
                  >
                    <option value="regular">Regular</option>
                    <option value="express">Express</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Vehicle Dropdown */}
          <FormField
            control={form.control}
            name="vehicle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Type</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border border-blue-primary text-blue-primary py-4 px-3 rounded-md appearance-none bg-white pr-8"
                  >
                    <option value="bike">Bike</option>
                    <option value="car">Car</option>
                    <option value="truck">Truck</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Note Textarea */}
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Note (e.g., fragile, specific instructions)
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      rows={4}
                      placeholder="Note (e.g. fragile goods, delivery instruction)"
                      className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:col-span-2">
            <p className="text-center my-2 text-red-600 text-sm font-medium">
              NOTE: Vinkol will cover up to ₦50,000 of damage or stolen package.
              Please specify in the note section if goods are fragile.
            </p>
          </div>

          <div className="md:col-span-2 flex justify-center">
            <Button
              type="submit"
              disabled={isPending} // Disable button while quote is being fetched
              className="rounded-md py-4 px-6 w-full md:w-1/3 text-lg"
            >
              {isPending ? "Getting Quote..." : "Get Quote"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
