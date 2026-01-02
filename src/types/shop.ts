import * as z from "zod";

export const registerShopSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const loginShopSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const verifyEmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  otp: z.string().length(6, { message: "OTP must be 6 digits long" }),
});

export const resendOtpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  resetToken: z.string().min(1, { message: "Reset token is required" }),
});

export const updateStoreProfileSchema = z.object({
  name: z.string().min(1, { message: "Store name is required" }),
  bio: z.string().min(1, { message: "Bio is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  lga: z.string().min(1, { message: "LGA is required" }),
  state: z.string().min(1, { message: "State is required" }),
  lat: z.union([z.string(), z.number()]).transform(String),
  lng: z.union([z.string(), z.number()]).transform(String),
  tags: z.string(),
  phone: z
    .string()
    .min(10, { message: "Phone number is too short" })
    .max(15, { message: "Phone number is too long" }),
  avatar: z.instanceof(File, { message: "Avatar must be a file" }).optional(),
});

export const validateBankSchema = z.object({
  accountNumber: z
    .string()
    .length(10, { message: "Account number must be 10 digits" })
    .regex(/^\d+$/, { message: "Account number must contain only digits" }),

  bankCode: z
    .string()
    .length(10, { message: "Bank Code must be 3 digits" })
    .regex(/^\d+$/, { message: "Bank code must contain only digits" }),
});

export const createStoreBankSchema = z.object({
  accountNumber: z
    .string()
    .length(10, { message: "Account number must be 10 digits" })
    .regex(/^\d+$/, { message: "Account number must contain only digits" }),

  bankCode: z
    .string()
    .min(3, { message: "Bank code is required" })
    .regex(/^\d+$/, { message: "Bank code must contain only digits" }),

  accountName: z.string().min(1, { message: "Account name is required" }),

  bankName: z.string().min(1, { message: "Bank name is required" }),
});
