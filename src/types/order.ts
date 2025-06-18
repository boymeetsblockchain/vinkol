import * as z from "zod";

export const getQuoteSchema = z.object({
  state: z.string(),
  orderType: z.string().default("Delivery"),

  dropoffLocation: z.object({
    lat: z.union([z.string(), z.number()]).transform(String),
    lng: z.union([z.string(), z.number()]).transform(String),
  }),

  pickupLocation: z.object({
    lat: z.union([z.string(), z.number()]).transform(String),
    lng: z.union([z.string(), z.number()]).transform(String),
  }),

  deliveryType: z.enum(["regular", "express"]),
  vehicleRequest: z.enum(["truck", "car", "bike"]),
});

export const createOrderSchema = z.object({
  paystackReference: z.string(),
  orderType: z.enum(["Delivery", "Shopping"]),
  state: z.string(),
  date: z.string(),
  time: z.string(),
  pickupLocation: z.string(),
  dropoffLocation: z.string(),
  amount: z.number(),
  deliveryType: z.enum(["regular", "express"]),
  vehicleRequest: z.enum(["truck", "car", "bike"]),
  guest: z.object({
    email: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    phone: z.string(),
  }),
});

export const orderDataSchema = z.object({
  paystackReference: z.string().min(1, "Paystack reference is required"),
  orderType: z.enum(["Delivery", "Shopping"], {
    errorMap: () => ({ message: "Invalid order type" }),
  }),
  state: z.string().min(1, "State is required"),
  date: z.string().min(1, "Date is required"), // Consider using z.date() if you're working with Date objects
  time: z.string().min(1, "Time is required"),
  pickupLocation: z.string().min(1, "Pickup location is required"),
  dropoffLocation: z.string().min(1, "Dropoff location is required"),
  deliveryFee: z.number().positive("Amount must be a positive number"), // Use .positive() for amounts
  deliveryType: z.enum(["regular", "express"], {
    errorMap: () => ({ message: "Invalid delivery type" }),
  }),
  vehicleRequest: z.enum(["truck", "car", "bike"], {
    errorMap: () => ({ message: "Invalid vehicle type" }),
  }),
  guest: z.object({
    email: z.string().email("Invalid email address"),
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"), // Adjust min length as per your requirement
  }),
});

// note to self you can infer like this
export type OrderData = z.infer<typeof orderDataSchema>;

export type GetOrdersParams = {
  state?: string;
  search?: string;
  deliveryType?: string;
  trackingId?: string;
  orderType?: string;
  vehicleRequest?: string;
  status?: string;
};

export const changeOrderStatusSchema = z.object({
  status: z.union([z.literal("Delivered"), z.literal("Picked")]),
  orderOtp: z.string().optional(),
});
