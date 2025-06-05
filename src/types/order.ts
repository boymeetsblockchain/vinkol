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
