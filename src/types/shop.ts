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
  firstName: z.string().min(1, { message: "First name is required" }),
  state: z.string().min(1, { message: "State is required" }),
  avatar: z.instanceof(File, { message: "Avatar must be a file" }).optional(),
});
