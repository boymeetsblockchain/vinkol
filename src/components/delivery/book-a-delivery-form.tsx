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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deliverySchema } from "@/dto/delivery.form.schema";
import { Button } from "../button";
import Autocomplete from "react-google-autocomplete";
import { useGetQuoteMutation } from "@/services/orders/mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TermsCheckbox } from "../shared/terms";
import { useState } from "react";
import { Package, MapPin, User, Clock, Info } from "lucide-react";

// Helper to get current time in HH:MM format
const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
};

const getStateFromAddressComponents = (addressComponents: any[]) => {
  if (!addressComponents) return null;

  const stateComponent = addressComponents.find((component) =>
    component.types.includes("administrative_area_level_1"),
  );

  return stateComponent ? stateComponent.long_name.toLowerCase() : null;
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
        deliveryType: data.type,
        vehicleRequest: data.vehicle,
      },
      {
        onSuccess: (responseData) => {
          const dateObj = new Date(data.date);
          const formattedDate = dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          const [hours, minutes] = data.time.split(":").map(Number);
          const timeObj = new Date();
          timeObj.setHours(hours, minutes, 0, 0);
          const formattedTime = timeObj.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });

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
          params.append("orderType", data.orderType);
          params.append("amount", String(responseData.data.price || 0));
          params.append("note", data.note || "");

          toast.success("Quote successfully retrieved!", {
            description: `Amount: ₦${
              responseData.data.price?.toLocaleString() || "N/A"
            }`,
          });

          router.push(`/quote?${params.toString()}`);
        },
        onError: (error: any) => {
          console.error("Get Quote failed:", error);
          toast.error(
            error.message || "Failed to get quote. Please try again.",
          );
        },
      },
    );
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

              {/* Delivery Locations */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Location Details</h2>
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
                              form.setValue("pickupCoords", { lat, lng });

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
                    name="dropoff"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-gray-700">Dropoff Location</FormLabel>
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
                                "dropoff",
                                place.formatted_address || place.name,
                              );
                              form.setValue("dropoffCoords", { lat, lng });

                              if (state && !form.getValues("state")) {
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
                            placeholder="Enter dropoff address"
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
                </div>
              </div>

              {/* Delivery Schedule & Type */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Schedule & Type</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Delivery Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} className="h-12 bg-gray-50/50 block w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Delivery Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-gray-50/50">
                              <SelectValue placeholder="Select delivery type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="regular">Regular</SelectItem>
                            <SelectItem value="express">Express</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="orderType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Order Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-gray-50/50">
                              <SelectValue placeholder="Select order type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Delivery">Delivery</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Vehicle & Additional Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Vehicle & Package Details</h2>
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
                            <SelectItem value="bicycle">Bicycle</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
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

              {/* Notice & Terms */}
              <div className="space-y-6 pt-4">
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-4 items-start">
                  <Info className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900 leading-relaxed">
                    <strong>Insurance Coverage:</strong> Vinkol will cover up to ₦50,000 of damage or stolen package. Please explicitly specify in the notes section if your goods are fragile.
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
