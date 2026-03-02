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

export const bulkDeliverySchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters"),
  lastname: z.string().min(2, "Last name must be at least 2 characters"),
  phonenumber: z
    .string()
    .min(11, "Phone number must be at least 11 characters"),
  email: z.string().email("Invalid email address"),
  pickup: z.string().min(1, "Pickup location is required"),
  pickupLocation: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  pickupContact: z
    .string()
    .min(11, "Pickup contact phone must be at least 11 digits"),
  dropoffs: z
    .array(
      z.object({
        address: z.string().min(1, "Dropoff address is required"),
        location: z
          .object({
            lat: z.number(),
            lng: z.number(),
          })
          .optional(),
        contact: z
          .string()
          .min(11, "Dropoff contact phone must be at least 11 digits"),
      }),
    )
    .min(1, "At least one dropoff location is required"),
  date: z.string().min(1, "Specify the date of delivery"),
  vehicle: z.enum(["bike", "car", "truck"], {
    errorMap: () => ({ message: "Please select a valid vehicle type" }),
  }),
  description: z.string().min(1, "Description is required"),
  note: z.string().optional(),
  state: z.string(),
});

// for orders where each has its own pickup/dropoff/etc
export const multiDeliverySchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters"),
  lastname: z.string().min(2, "Last name must be at least 2 characters"),
  phonenumber: z
    .string()
    .min(11, "Phone number must be at least 11 characters"),
  email: z.string().email("Invalid email address"),
  orders: z
    .array(
      z.object({
        pickupLocation: z
          .object({
            lat: z.number(),
            lng: z.number(),
          })
          .optional(),
        dropoffLocation: z
          .object({
            lat: z.number(),
            lng: z.number(),
          })
          .optional(),
        receiverContact: z.object({
          name: z.string().min(2, "Receiver name required"),
          phone: z.string().min(11, "Receiver phone required"),
        }),
        state: z.string().min(1, "State is required"),
        note: z.string().optional(),
        description: z.string().min(1, "Description is required"),
        vehicleRequest: z.enum(["bike", "car", "truck"], {
          errorMap: () => ({ message: "Please select a valid vehicle type" }),
        }),
        date: z.string().min(1, "Specify date"),
      }),
    )
    .min(1, "At least one order is required"),
});
