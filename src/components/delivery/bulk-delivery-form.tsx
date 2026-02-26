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
import { bulkDeliverySchema } from "@/dto/delivery.form.schema";
import { Button } from "../button";
import Autocomplete from "react-google-autocomplete";
import { useGetBulkQuoteMutation } from "@/services/orders/mutation";
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

export const BulkDeliveryForm = ({
  handleSetQuote,
}: {
  handleSetQuote: (data: any) => void;
}) => {
  const form = useForm<z.infer<typeof bulkDeliverySchema>>({
    resolver: zodResolver(bulkDeliverySchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phonenumber: "",
      email: "",
      pickup: "",
      pickupContact: "",
      pickupLocation: undefined,
      dropoffs: [{ address: "", contact: "", location: undefined }],
      date: "",
      vehicle: "bike",
      description: "",
      note: "",
      state: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "dropoffs",
  });

  const { mutate, isPending } = useGetBulkQuoteMutation();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const onSubmit = (data: z.infer<typeof bulkDeliverySchema>) => {
    if (!isChecked) {
      toast.error("Please accept terms and conditions");
      return;
    }

    // convert ISO date (YYYY-MM-DD) to DD-MM-YYYY as required by the API
    const [year, month, day] = data.date.split("-");
    const formattedApiDate = `${day}-${month}-${year}`;

    const bulkQuotePayload = {
      state: data.state,
      orderType: "Delivery",
      pickup: {
        location: {
          lat: data.pickupLocation?.lat || 0,
          lng: data.pickupLocation?.lng || 0,
        },
        pickupContact: data.pickupContact,
      },
      dropoffs: data.dropoffs.map((dropoff) => ({
        location: {
          lat: dropoff.location?.lat || 0,
          lng: dropoff.location?.lng || 0,
        },
        dropoffContact: dropoff.contact,
      })),
      deliveryType: "bulk",
      vehicleRequest: data.vehicle,
      guest: {
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phonenumber,
      },
      date: formattedApiDate,
      description: data.description,
      note: data.note || "",
    };

    mutate(bulkQuotePayload, {
      onSuccess: (responseData) => {
        handleSetQuote(responseData.data);
      },
      onError: (error: any) => {
        console.error("Get Bulk Quote failed:", error);
        toast.error(
          error.message || "Failed to get bulk quote. Please try again.",
        );
      },
    });
  };

  const addDropoff = () => {
    append({ address: "", contact: "", location: undefined });
  };

  return (
    <section className="py-12 max-w-screen-xl mx-auto px-4">
      <div className="space-y-4 mb-6">
        <h1 className="text-4xl md:text-5xl font-bold">Book a Bulk Delivery</h1>
        <p className="font-medium text-gray-700 text-base">
          Fill in the form to book a rider for multiple deliveries from one
          pickup location.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Personal Information Section */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          </div>

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

          {/* State Field - Auto-populated */}
          <FormField
            control={form.control}
            name="state"
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

          {/* Pickup Section */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 mt-6">Pickup Location</h2>
          </div>

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
                      const state = getStateFromAddressComponents(
                        place.address_components,
                      );

                      form.setValue(
                        "pickup",
                        place.formatted_address || place.name,
                      );
                      form.setValue("pickupLocation", { lat, lng });

                      if (state) {
                        form.setValue("state", state);
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

          {/* Pickup Contact Phone */}
          <FormField
            control={form.control}
            name="pickupContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Contact Phone</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="tel"
                    maxLength={11}
                    minLength={11}
                    placeholder="Contact phone at pickup"
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dropoffs Section */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 mt-6">Dropoff Locations</h2>
            <p className="text-gray-600 text-sm mb-4">
              Add multiple dropoff locations for this delivery
            </p>
          </div>

          {/* Dropoff Fields */}
          {fields.map((field, index) => (
            <div key={field.id} className="md:col-span-2">
              <div className="border border-gray-200 rounded-md p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Dropoff {index + 1}</h3>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Dropoff Location */}
                  <FormField
                    control={form.control}
                    name={`dropoffs.${index}.address`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dropoff Location {index + 1}</FormLabel>
                        <FormControl>
                          <Autocomplete
                            apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY}
                            onPlaceSelected={(place) => {
                              const lat = place.geometry?.location?.lat();
                              const lng = place.geometry?.location?.lng();

                              form.setValue(
                                `dropoffs.${index}.address`,
                                place.formatted_address || place.name,
                              );
                              form.setValue(`dropoffs.${index}.location`, {
                                lat,
                                lng,
                              });
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
                            placeholder={`Dropoff Location ${index + 1}`}
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

                  {/* Dropoff Contact */}
                  <FormField
                    control={form.control}
                    name={`dropoffs.${index}.contact`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            type="tel"
                            maxLength={11}
                            minLength={11}
                            placeholder="Contact phone at dropoff"
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
          ))}

          {/* Add Dropoff Button */}
          <div className="md:col-span-2">
            <button
              type="button"
              onClick={addDropoff}
              className="flex items-center gap-2 mt-4 px-6 py-3 border-2 border-blue-primary text-blue-primary rounded-md font-semibold hover:bg-blue-50 transition"
            >
              <Plus size={20} />
              Add Dropoff Location
            </button>
          </div>

          {/* Additional Information Section */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 mt-6">Delivery Details</h2>
          </div>

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

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Items)</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="e.g., Phones, Electronics, Documents"
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                  />
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
            isBooking={true}
            isChecked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />

          <div className="md:col-span-2">
            <p className="text-center my-2 text-red-600 text-sm font-medium">
              NOTE: Vinkol will cover up to ₦50,000 of damage or stolen package
              per dropoff. Please specify in the note section if goods are
              fragile.
            </p>
          </div>

          <div className="md:col-span-2 flex justify-center">
            <Button
              type="submit"
              disabled={isPending}
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
