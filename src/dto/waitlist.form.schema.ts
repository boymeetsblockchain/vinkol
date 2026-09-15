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

export const waitlistSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: phoneField("Phone number"),
    stateOfResidence: z.string().min(1, "State of residence is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.enum(["male", "female"], {
      errorMap: () => ({ message: "Please select a valid gender" }),
    }),
    vehicleType: z.enum(["Motorcycle", "Bicycle"], {
      errorMap: () => ({ message: "Please select a valid vehicle type" }),
    }),
    isStudent: z.boolean(),
    university: z.string().optional(),
    department: z.string().optional(),
    experienceYears: z.number().min(0, "Experience years must be 0 or more"),
    address: z.string().min(1, "Address is required"),
    hasGuarantor: z.boolean(),
    guarantor: z
      .object({
        name: z.string().min(1, "Guarantor name is required"),
        phone: phoneField("Guarantor phone"),
      })
      .optional(),
    purpose: z.string().min(1, "Purpose is required"),
  })
  .refine(
    (data) => {
      if (data.isStudent) {
        return data.university && data.department;
      }
      return true;
    },
    {
      message: "University and department are required for students",
      path: ["university"],
    },
  )
  .refine(
    (data) => {
      if (data.hasGuarantor) {
        return data.guarantor;
      }
      return true;
    },
    {
      message: "Guarantor details are required",
      path: ["guarantor"],
    },
  );
