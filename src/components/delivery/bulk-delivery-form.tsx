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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bulkDeliverySchema } from "@/dto/delivery.form.schema";
import { Button } from "../button";
import Autocomplete from "react-google-autocomplete";
import { useGetBulkQuoteMutation } from "@/services/orders/mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TermsCheckbox } from "../shared/terms";
import { useState } from "react";
import { X, Plus, Package, MapPin, User, Info, Map, Clock } from "lucide-react";

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
    <section className="pt-8 w-full">
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-10"
            >
              {/* Contact Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">First Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="h-12 bg-gray-50/50" placeholder="Enter your first name" />
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
                        <FormLabel className="text-gray-700">Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="h-12 bg-gray-50/50" placeholder="Enter your last name" />
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
                        <FormLabel className="text-gray-700">Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" className="h-12 bg-gray-50/50" placeholder="Enter your email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phonenumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            maxLength={11}
                            minLength={11}
                            className="h-12 bg-gray-50/50"
                            placeholder="e.g. 08012345678"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Pickup Location */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Pickup Location & Schedule</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="pickup"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-gray-700">Pickup Location</FormLabel>
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
                            placeholder="Enter pickup address"
                            className="flex h-12 w-full rounded-md border border-input bg-gray-50/50 px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
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
                    name="pickupContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Pickup Contact Phone</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            maxLength={11}
                            minLength={11}
                            className="h-12 bg-gray-50/50"
                            placeholder="Contact phone at pickup"
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
                        <FormLabel className="text-gray-700">State (Auto-detected)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            readOnly
                            className="h-12 bg-gray-100 text-gray-500 cursor-not-allowed"
                            placeholder="e.g. Lagos"
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
                        <FormLabel className="text-gray-700">Delivery Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="h-12 bg-gray-50/50 block w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Dropoff Locations */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Map className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">Dropoff Locations</h2>
                    <p className="text-gray-500 text-sm mt-1">Add multiple dropoff locations for this delivery</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="border border-gray-100 rounded-xl p-5 bg-gray-50/50 transition-all hover:border-blue-100 hover:shadow-sm relative">
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="absolute right-4 top-4 text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full p-1 shadow-sm border border-gray-100"
                        >
                          <X size={16} />
                        </button>
                      )}
                      
                      <div className="mb-4 flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                          {index + 1}
                        </span>
                        <h3 className="text-sm font-semibold text-gray-700">Dropoff Point</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name={`dropoffs.${index}.address`}
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel className="text-gray-700">Dropoff Location</FormLabel>
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
                                  placeholder={`Enter Dropoff Location ${index + 1}`}
                                  className="flex h-12 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
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
                          name={`dropoffs.${index}.contact`}
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel className="text-gray-700">Contact Phone</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="tel"
                                  maxLength={11}
                                  minLength={11}
                                  className="h-12 bg-white"
                                  placeholder="Contact phone at dropoff"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addDropoff}
                    className="w-full flex items-center justify-center gap-2 mt-4 px-6 py-4 border-2 border-dashed border-blue-200 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-300 transition-colors bg-blue-50/30"
                  >
                    <Plus size={20} />
                    Add Another Dropoff
                  </button>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Delivery Details</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="vehicle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Vehicle Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-gray-50/50">
                              <SelectValue placeholder="Select vehicle type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="bike">Bike</SelectItem>
                            <SelectItem value="car">Car</SelectItem>
                            <SelectItem value="truck">Truck</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Description (Items)</FormLabel>
                        <FormControl>
                          <Input {...field} className="h-12 bg-gray-50/50" placeholder="e.g., Phones, Electronics, Documents" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-gray-700">Additional Notes</FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            rows={4}
                            placeholder="e.g., fragile goods, specific delivery instructions"
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-gray-50/50 px-3 py-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Notice & Terms */}
              <div className="space-y-6 pt-4">
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-4 items-start">
                  <Info className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900 leading-relaxed">
                    <strong>Insurance Coverage:</strong> Vinkol will cover up to ₦50,000 of damage or stolen package per dropoff. Please explicitly specify in the notes section if your goods are fragile.
                  </p>
                </div>

                <div className="px-2">
                  <TermsCheckbox
                    isBooking={true}
                    isChecked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full md:w-auto h-14 md:min-w-[240px] text-lg rounded-full px-8 mx-auto flex items-center justify-center transition-transform active:scale-[0.98]"
                >
                  {isPending ? "Getting Quote..." : "Get Quote"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};
