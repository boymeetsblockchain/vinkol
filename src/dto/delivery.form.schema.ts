// src/dto/delivery.form.schema.ts
import { z } from "zod";

export const deliverySchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters"),
  lastname: z.string().min(2, "Last name must be at least 2 characters"),
  phonenumber: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  pickup: z.string().min(1, "Pickup location is required"),
  pickupCoords: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  dropoff: z.string().min(1, "Dropoff location is required"),
  dropoffCoords: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  date: z.string().min(1, "Specify the date of delivery"),
  time: z.string().min(1, "Please Specify time "),

  priority: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "Please select a valid priority" }),
  }),

  vehicle: z.enum(["bike", "car", "truck", "bicycle"], {
    errorMap: () => ({ message: "Please select a valid vehicle type" }),
  }),
  note: z.string().optional(),
  type: z.enum(["express", "regular"], {
    errorMap: () => ({
      message: "Please a delivey Type",
    }),
  }),
  state: z.string(),
  orderType: z.enum(["Delivery", "Shopping"]),
});
