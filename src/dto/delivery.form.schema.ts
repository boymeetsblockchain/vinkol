import { z } from "zod";

export const deliverySchema = z.object({
  fullname: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  pickup: z.string().min(1, "Pickup location is required"),
  dropoff: z.string().min(1, "Dropoff location is required"),
  date: z.string().min(1, "Specify the date of delivery"),
  time: z.string().min(1, "Please Specify time "),
  priority: z.enum(["low", "medium", "high"]),
  vehicle: z.string().min(1, "Vehicle type is required"),
  note: z.string().optional(),
});
