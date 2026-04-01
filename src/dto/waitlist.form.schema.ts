import { z } from "zod";

export const waitlistSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(11, "Phone number must be at least 11 characters"),
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
        phone: z
          .string()
          .min(11, "Guarantor phone must be at least 11 characters"),
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
