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
import { TermsCheckbox } from "../shared/terms";
import { useState } from "react";
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
      firstname: "",
      lastname: "",
      phonenumber: "",
      orderType: "Delivery",
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

  const { mutate, isPending } = useGetQuoteMutation();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const onSubmit = (data: z.infer<typeof deliverySchema>) => {
    if (!isChecked) {
      toast.error("Please accept terms and conditions");
      return;
    }
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
          params.append("firstname", data.firstname);
          params.append("lastname", data.lastname);
          params.append("phonenumber", data.phonenumber);
          params.append("email", data.email);
          params.append("state", data.state);
          params.append("pickupLocation", data.pickup);
          params.append("dropoffLocation", data.dropoff);
          params.append("date", formattedDate);
          params.append("time", formattedTime);
          params.append("deliveryType", data.type);
          params.append("vehicleRequest", data.vehicle);
          params.append("orderType", data.orderType); // Pass orderType to the quote page
          params.append("amount", String(responseData.data.price || 0)); // Ensure 'price' is accessed correctly
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
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="First Name"
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Last Name"
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

          {/* Email Field */}
          <FormField
            control={form.control}
            name="phonenumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="number"
                    placeholder="Phone Number"
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
                  <select
                    {...field}
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                  >
                    <option value="">Select your state</option>
                    <option value="abia">Abia</option>
                    <option value="adamawa">Adamawa</option>
                    <option value="akwa-ibom">Akwa Ibom</option>
                    <option value="anambra">Anambra</option>
                    <option value="bauchi">Bauchi</option>
                    <option value="bayelsa">Bayelsa</option>
                    <option value="benue">Benue</option>
                    <option value="borno">Borno</option>
                    <option value="cross-river">Cross River</option>
                    <option value="delta">Delta</option>
                    <option value="ebonyi">Ebonyi</option>
                    <option value="edo">Edo</option>
                    <option value="ekiti">Ekiti</option>
                    <option value="enugu">Enugu</option>
                    <option value="gombe">Gombe</option>
                    <option value="imo">Imo</option>
                    <option value="jigawa">Jigawa</option>
                    <option value="kaduna">Kaduna</option>
                    <option value="kano">Kano</option>
                    <option value="katsina">Katsina</option>
                    <option value="kebbi">Kebbi</option>
                    <option value="kogi">Kogi</option>
                    <option value="kwara">Kwara</option>
                    <option value="lagos">Lagos</option>
                    <option value="nasarawa">Nasarawa</option>
                    <option value="niger">Niger</option>
                    <option value="ogun">Ogun</option>
                    <option value="ondo">Ondo</option>
                    <option value="osun">Osun</option>
                    <option value="oyo">Oyo</option>
                    <option value="plateau">Plateau</option>
                    <option value="rivers">Rivers</option>
                    <option value="sokoto">Sokoto</option>
                    <option value="taraba">Taraba</option>
                    <option value="yobe">Yobe</option>
                    <option value="zamfara">Zamfara</option>
                    <option value="abuja">
                      Federal Capital Territory (Abuja)
                    </option>
                  </select>
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
                      types: ["geocode", "establishment"],
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
                      types: ["geocode", "establishment"],
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

          {/* Type Dropdown */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Type</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border border-blue-primary text-blue-primary py-4 px-3 rounded-md appearance-none bg-white pr-8"
                  >
                    <option value="Delivery ">Delivery</option>
                    <option value="shopping">Shopping </option>
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

          <TermsCheckbox
            isChecked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />

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
