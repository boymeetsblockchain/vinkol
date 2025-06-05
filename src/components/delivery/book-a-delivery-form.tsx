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
import { toast } from "sonner";

const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
};

export const BookADeliveryForm = () => {
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

  const pickupCoords = form.watch("pickupCoords");
  const dropoffCoords = form.watch("dropoffCoords");
  const { mutate, isPending } = useGetQuoteMutation();
  const onSubmit = (data: z.infer<typeof deliverySchema>) => {
    mutate(
      {
        state: data.state, // Assuming 'state' is part of your deliverySchema
        orderType: "Delivery",
        pickupLocation: data.pickupCoords
          ? {
              lat: String(data.pickupCoords.lat),
              lng: String(data.pickupCoords.lng),
            }
          : { lat: "", lng: "" },
        dropoffLocation: data.dropoffCoords
          ? {
              lat: String(data.dropoffCoords.lat),
              lng: String(data.dropoffCoords.lng),
            }
          : { lat: "", lng: "" },
        deliveryType: data.type, // Assuming 'type' is part of your deliverySchema
        vehicleRequest: data.vehicle,
      },
      {
        onSuccess: (responseData) => {
          // Renamed 'data' to 'responseData' to avoid conflict
          console.log(responseData);
          toast.success("Yay😇😇😇😇. ");
          // FIX: Stringify the responseData before storing it
          localStorage.setItem("quote-data", JSON.stringify(responseData));
          window.location.href = "quote";
        },
        onError: (error: any) => {
          console.error("Get Quote failed:", error);
          toast.error(error.message || "Failed to get Quote.");
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
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Full Name</FormLabel> Add a label for better UX */}
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

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
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

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <input
                    {...field}
                    type="state"
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
                {/* <FormLabel>Pickup Location</FormLabel> */}
                <FormControl>
                  <Autocomplete
                    apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY} // Corrected API key env variable
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
                    onChange={field.onChange}
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
                {/* <FormLabel>Dropoff Location</FormLabel> */}
                <FormControl>
                  <Autocomplete
                    apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY} // Corrected API key env variable
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
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Delivery Date</FormLabel> */}
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

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Delivery Time</FormLabel> */}
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
                <FormLabel>Priority</FormLabel> {/* Added label for clarity */}
                <FormControl>
                  <select
                    {...field}
                    className="w-full border border-blue-primary text-blue-primary py-4 px-3 rounded-md appearance-none bg-white pr-8" // Added appearance-none and pr for custom arrow if needed
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
          {/* Priority Dropdown */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel> {/* Added label for clarity */}
                <FormControl>
                  <select
                    {...field}
                    className="w-full border border-blue-primary text-blue-primary py-4 px-3 rounded-md appearance-none bg-white pr-8" // Added appearance-none and pr for custom arrow if needed
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
                <FormLabel>Vehicle Type</FormLabel>{" "}
                {/* Added label for clarity */}
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

          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Note</FormLabel> */}
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
              disabled={isPending}
              className="rounded-md py-4 px-6 w-full md:w-1/3 text-lg"
            >
              {isPending ? "Getting Quote" : " Get Quote"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
