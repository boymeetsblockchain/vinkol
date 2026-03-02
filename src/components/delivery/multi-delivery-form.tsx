"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { multiDeliverySchema } from "@/dto/delivery.form.schema";
import { Button } from "../button";
import Autocomplete from "react-google-autocomplete";
import { useGetMultiOrderQuoteMutation } from "@/services/orders/mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TermsCheckbox } from "../shared/terms";
import { useState } from "react";
import { X, Plus } from "lucide-react";

const getStateFromAddressComponents = (addressComponents: any[]) => {
  if (!addressComponents) return null;

  const stateComponent = addressComponents.find((component) =>
    component.types.includes("administrative_area_level_1"),
  );

  return stateComponent ? stateComponent.long_name.toLowerCase() : null;
};

export const MultiDeliveryForm = ({
  handleSetQuote,
}: {
  handleSetQuote: (data: any) => void;
}) => {
  const form = useForm<z.infer<typeof multiDeliverySchema>>({
    resolver: zodResolver(multiDeliverySchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phonenumber: "",
      email: "",
      orders: [
        {
          pickupLocation: undefined,
          dropoffLocation: undefined,
          receiverContact: { name: "", phone: "" },
          state: "",
          note: "",
          description: "",
          vehicleRequest: "bike",
          date: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "orders",
  });

  const { mutate, isPending } = useGetMultiOrderQuoteMutation();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const onSubmit = (data: z.infer<typeof multiDeliverySchema>) => {
    if (!isChecked) {
      toast.error("Please accept terms and conditions");
      return;
    }

    // Format the payload to match API expectations
    const multiOrderPayload = {
      orders: data.orders.map((order) => ({
        pickupLocation: {
          lat: String(order.pickupLocation?.lat || ""),
          lng: String(order.pickupLocation?.lng || ""),
        },
        dropoffLocation: {
          lat: String(order.dropoffLocation?.lat || ""),
          lng: String(order.dropoffLocation?.lng || ""),
        },
        receiverContact: {
          name: order.receiverContact.name,
          phone: order.receiverContact.phone,
        },
        state: order.state,
        note: order.note || "",
        description: order.description,
        vehicleRequest: order.vehicleRequest,
        // Convert ISO date (YYYY-MM-DD) to DD-MM-YYYY
        date: order.date
          ? (() => {
              const [year, month, day] = order.date.split("-");
              return `${day}-${month}-${year}`;
            })()
          : "",
      })),
      guest: {
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phonenumber,
      },
    };

    mutate(multiOrderPayload, {
      onSuccess: (responseData) => {
        handleSetQuote(responseData.data);
      },
      onError: (error: any) => {
        console.error("Get Multi-Order Quote failed:", error);
        toast.error(error.message || "Failed to get quote. Please try again.");
      },
    });
  };

  const addOrder = () => {
    append({
      pickupLocation: undefined,
      dropoffLocation: undefined,
      receiverContact: { name: "", phone: "" },
      state: "",
      note: "",
      description: "",
      vehicleRequest: "bike",
      date: "",
    });
  };

  return (
    <section className="py-12 max-w-screen-xl mx-auto px-4">
      <div className="space-y-4 mb-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Book Multi-Deliveries
        </h1>
        <p className="font-medium text-gray-700 text-base">
          Create multiple delivery orders with different pickup and dropoff
          locations. Each order can have its own vehicle type and delivery date.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Guest Information Section */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-2xl font-bold mb-6">Your Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
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

              {/* Last Name */}
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

              {/* Email */}
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

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phonenumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="tel"
                        maxLength={11}
                        minLength={11}
                        placeholder="Phone Number"
                        className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Orders Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Delivery Orders</h2>
            <p className="text-gray-600 text-sm">
              Add one or more delivery orders. Each order has its own pickup
              location, dropoff location, and delivery details.
            </p>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border border-gray-200 rounded-lg p-6 bg-gray-50"
              >
                {/* Order Header with Delete Button */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Order {index + 1}</h3>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <X size={24} />
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Pickup Information */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3">
                      Pickup Location
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Pickup Location Autocomplete */}
                      <FormField
                        control={form.control}
                        name={`orders.${index}.pickupLocation`}
                        render={({ field: locationField }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Pickup Address</FormLabel>
                            <FormControl>
                              <Autocomplete
                                apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY}
                                onPlaceSelected={(place) => {
                                  const lat = place.geometry?.location?.lat();
                                  const lng = place.geometry?.location?.lng();
                                  const state = getStateFromAddressComponents(
                                    place.address_components,
                                  );

                                  form.setValue(
                                    `orders.${index}.pickupLocation`,
                                    { lat, lng },
                                  );

                                  if (state) {
                                    form.setValue(
                                      `orders.${index}.state`,
                                      state,
                                    );
                                  }
                                }}
                                options={{
                                  types: ["geocode", "establishment"],
                                  componentRestrictions: { country: ["ng"] },
                                  fields: [
                                    "formatted_address",
                                    "name",
                                    "geometry.location",
                                    "address_components",
                                  ],
                                }}
                                placeholder="Pickup Address"
                                className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Dropoff Information */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3">
                      Dropoff Location
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Dropoff Location Autocomplete */}
                      <FormField
                        control={form.control}
                        name={`orders.${index}.dropoffLocation`}
                        render={({ field: locationField }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Dropoff Address</FormLabel>
                            <FormControl>
                              <Autocomplete
                                apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY}
                                onPlaceSelected={(place) => {
                                  const lat = place.geometry?.location?.lat();
                                  const lng = place.geometry?.location?.lng();

                                  form.setValue(
                                    `orders.${index}.dropoffLocation`,
                                    { lat, lng },
                                  );
                                }}
                                options={{
                                  types: ["geocode", "establishment"],
                                  componentRestrictions: { country: ["ng"] },
                                  fields: [
                                    "formatted_address",
                                    "name",
                                    "geometry.location",
                                    "address_components",
                                  ],
                                }}
                                placeholder="Dropoff Address"
                                className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Receiver Information */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3">
                      Receiver Contact
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Receiver Name */}
                      <FormField
                        control={form.control}
                        name={`orders.${index}.receiverContact.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Receiver Name</FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                type="text"
                                placeholder="Receiver Name"
                                className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Receiver Phone */}
                      <FormField
                        control={form.control}
                        name={`orders.${index}.receiverContact.phone`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Receiver Phone</FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                type="tel"
                                maxLength={11}
                                minLength={11}
                                placeholder="Phone Number"
                                className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Delivery Details */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3">
                      Delivery Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* State */}
                      <FormField
                        control={form.control}
                        name={`orders.${index}.state`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                readOnly
                                className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md bg-gray-100"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Vehicle Type */}
                      <FormField
                        control={form.control}
                        name={`orders.${index}.vehicleRequest`}
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

                      {/* Date */}
                      <FormField
                        control={form.control}
                        name={`orders.${index}.date`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Date</FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                type="date"
                                className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Description */}
                      <FormField
                        control={form.control}
                        name={`orders.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (Items)</FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                type="text"
                                placeholder="e.g., Electronics, Documents"
                                className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Note */}
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name={`orders.${index}.note`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Note (e.g., fragile, instructions)
                              </FormLabel>
                              <FormControl>
                                <textarea
                                  {...field}
                                  rows={3}
                                  placeholder="Any special instructions or notes"
                                  className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Order Button */}
            <button
              type="button"
              onClick={addOrder}
              className="flex items-center gap-2 px-6 py-3 border-2 border-blue-primary text-blue-primary rounded-md font-semibold hover:bg-blue-50 transition"
            >
              <Plus size={20} />
              Add Another Order
            </button>
          </div>

          {/* Terms and Conditions */}
          <TermsCheckbox
            isBooking={true}
            isChecked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />

          {/* Insurance Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <p className="text-center text-sm font-medium text-gray-700">
              NOTE: Vinkol will cover up to ₦50,000 of damage or stolen package
              per order. Please specify in the note section if goods are
              fragile.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isPending}
              className="rounded-md py-4 px-8 w-full md:w-1/3 text-lg"
            >
              {isPending ? "Getting Quote..." : "Get Quote"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default MultiDeliveryForm;
