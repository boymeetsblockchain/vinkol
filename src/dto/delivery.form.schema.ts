import * as z from "zod";

import { normalizePhone } from "@/lib/phone";

/**
 * A phone number the server will accept.
 *
 * The old rule was `min(11)` — Nigeria's local length — so a 10-digit
 * Canadian number was rejected in the browser, while the 11-digit value it
 * did accept violated the server's own E.164 requirement. This validates that
 * the input can be *read* as a number in either market and leaves the
 * canonical form to normalizePhone at submit time.
 */
const phoneField = (label = "Phone number") =>
  z
    .string()
    .min(1, `${label} is required`)
    .refine(
      (value) => normalizePhone(value, "NG") !== null || normalizePhone(value, "CA") !== null,
      { message: `${label} is not valid` },
    );

// src/dto/delivery.form.schema.ts

export const deliverySchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters"),
  lastname: z.string().min(2, "Last name must be at least 2 characters"),
  // Was min(2) with the message "Full name must be at least 2 characters" —
  // the name field's rule, copy-pasted, so this barely validated at all.
  phonenumber: phoneField("Phone number"),
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
  phonenumber: phoneField("Phone number"),
  email: z.string().email("Invalid email address"),
  pickup: z.string().min(1, "Pickup location is required"),
  pickupLocation: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  pickupContact: phoneField("Pickup contact phone"),
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
        contact: phoneField("Dropoff contact phone"),
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
  phonenumber: phoneField("Phone number"),
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
          phone: phoneField("Receiver phone"),
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
