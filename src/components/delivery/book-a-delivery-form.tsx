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
} from "@/components/ui/form";
import { deliverySchema } from "@/dto/delivery.form.schema";
import { Button } from "../button";

const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().slice(0, 5); // "HH:mm"
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
      vehicle: "",
      priority: "low",
      note: "",
    },
  });

  const onSubmit = (data: z.infer<typeof deliverySchema>) => {
    console.log("Form data", data);
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
            name="pickup"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Pickup Location"
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
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
              <FormItem>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Dropoff Location"
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
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

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Priority (e.g. low, medium, high)"
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vehicle"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Vehicle Type"
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                  />
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
              className="rounded-md py-4 px-6 w-full md:w-1/3 text-lg"
            >
              Get Quote
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
