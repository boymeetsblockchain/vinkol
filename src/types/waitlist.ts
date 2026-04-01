import * as z from "zod";

export const waitlistSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  stateOfResidence: z.string(),
  dateOfBirth: z.string(),
  gender: z.string(),
  isStudent: z.boolean(),
  university: z.string().optional(),
  department: z.string().optional(),
  experienceYears: z.number(),
  address: z.string(),
  hasGuarantor: z.boolean(),
  guarantor: z
    .object({
      name: z.string(),
      phone: z.string(),
    })
    .optional(),
  purpose: z.string(),
});
