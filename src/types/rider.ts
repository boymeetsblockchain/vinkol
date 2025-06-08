import * as z from "zod";

export const registerRiderSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const loginRiderSchema = z.object({
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

export const updateProfileSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  state: z.string().min(1, { message: "State is required" }),
  avatar: z.instanceof(File, { message: "Avatar must be a file" }).optional(),
});

export const submitKycSchema = z.object({
  idType: z.string().min(1, { message: "ID type is required" }),
  image: z.instanceof(File, { message: "Image must be a file" }),
});

export const submitVechicleSchema = z.object({
  vehicleType: z.string().min(1, { message: "ID type is required" }),
  image: z.instanceof(File, { message: "Image must be a file" }),
});
