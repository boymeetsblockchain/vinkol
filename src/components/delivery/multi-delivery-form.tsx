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
import { multiDeliverySchema } from "@/dto/delivery.form.schema";
import { Button } from "../button";
import Autocomplete from "react-google-autocomplete";
import { useGetMultiOrderQuoteMutation } from "@/services/orders/mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TermsCheckbox } from "../shared/terms";
import { useState } from "react";
import { X, Plus, User, Info, MapPin, Package, FileText } from "lucide-react";

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
    <section className="pt-8 w-full">
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              
              {/* Contact Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Your Information</h2>
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

              {/* Delivery Orders */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">Delivery Orders</h2>
                    <p className="text-gray-500 text-sm mt-1">Add one or more independent delivery orders.</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="border border-gray-100 rounded-xl p-5 sm:p-7 bg-gray-50/50 transition-all hover:border-blue-100 hover:shadow-sm relative"
                    >
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="absolute right-4 top-4 text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full p-1.5 shadow-sm border border-gray-100"
                        >
                          <X size={18} />
                        </button>
                      )}

                      <div className="mb-6 flex items-center gap-3 border-b border-gray-200/60 pb-4">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                          {index + 1}
                        </span>
                        <h3 className="text-lg font-bold text-gray-800">Order Details</h3>
                      </div>

                      <div className="space-y-8">
                        {/* Locations */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name={`orders.${index}.pickupLocation`}
                            render={({ field: locationField }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                                  <MapPin size={16} className="text-blue-500" />
                                  Pickup Address
                                </FormLabel>
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
                                    placeholder="Enter pickup address"
                                    className="flex h-12 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`orders.${index}.dropoffLocation`}
                            render={({ field: locationField }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                                  <MapPin size={16} className="text-green-500" />
                                  Dropoff Address
                                </FormLabel>
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
                                    placeholder="Enter dropoff address"
                                    className="flex h-12 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Receiver Contact */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                          <div className="md:col-span-2 mb-2">
                            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                              <User size={18} className="text-gray-400" />
                              Receiver Contact
                            </h4>
                          </div>
                          <FormField
                            control={form.control}
                            name={`orders.${index}.receiverContact.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-600">Receiver Name</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="text"
                                    placeholder="e.g. Jane Doe"
                                    className="h-12 bg-gray-50/50"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`orders.${index}.receiverContact.phone`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-600">Receiver Phone</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="tel"
                                    maxLength={11}
                                    minLength={11}
                                    placeholder="e.g. 08012345678"
                                    className="h-12 bg-gray-50/50"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Delivery Specs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                          <div className="md:col-span-2 mb-2">
                            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                              <Package size={18} className="text-gray-400" />
                              Delivery Specs
                            </h4>
                          </div>

                          <FormField
                            control={form.control}
                            name={`orders.${index}.state`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-600">State (Auto-detected)</FormLabel>
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
                            name={`orders.${index}.date`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-600">Delivery Date</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="date"
                                    className="h-12 bg-gray-50/50 block w-full"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`orders.${index}.vehicleRequest`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-600">Vehicle Type</FormLabel>
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
                            name={`orders.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-600">Description (Items)</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="text"
                                    placeholder="e.g., Electronics, Documents"
                                    className="h-12 bg-gray-50/50"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="md:col-span-2">
                            <FormField
                              control={form.control}
                              name={`orders.${index}.note`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-600">
                                    Additional Notes
                                  </FormLabel>
                                  <FormControl>
                                    <textarea
                                      {...field}
                                      rows={3}
                                      placeholder="e.g. fragile goods, specific delivery instructions"
                                      className="flex w-full rounded-md border border-input bg-gray-50/50 px-3 py-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
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
                  ))}

                  <button
                    type="button"
                    onClick={addOrder}
                    className="w-full flex items-center justify-center gap-2 mt-4 px-6 py-5 border-2 border-dashed border-blue-200 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-300 transition-colors bg-blue-50/30"
                  >
                    <Plus size={20} />
                    Add Another Order
                  </button>
                </div>
              </div>

              {/* Notice & Terms */}
              <div className="space-y-6 pt-4">
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-4 items-start">
                  <Info className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900 leading-relaxed">
                    <strong>Insurance Coverage:</strong> Vinkol will cover up to ₦50,000 of damage or stolen package per order. Please explicitly specify in the notes section if your goods are fragile.
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

export default MultiDeliveryForm;
