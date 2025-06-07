import {
  registerShopSchema,
  loginShopSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resendOtpSchema,
  resetPasswordSchema,
} from "@/types/shop";

import * as z from "zod";
import {
  forgotPassword,
  loginShop,
  registerShop,
  resendOtp,
  resetPassword,
  verifyEmail,
} from "./api";
import { useMutation } from "@tanstack/react-query";

/**
 * Defines the common options structure for mutation hooks.
 */
interface MutationOptions<TData, TError> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}

/**
 * Custom React Query hook for registering a rider.
 * @param {MutationOptions<any, Error>} [options] - Optional configuration for the mutation.
 */
export function useShopRegisterMutation(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof registerShopSchema>) => {
      return await registerShop(payload);
    },
    onSuccess: (responseData) => {
      console.log("Rider registration successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Rider registration failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

/**
 * Custom React Query hook for logging in a rider.
 * @param {MutationOptions<any, Error>} [options] - Optional configuration for the mutation.
 */
export function useShopLoginMutation(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof loginShopSchema>) => {
      return await loginShop(payload);
    },
    onSuccess: (responseData) => {
      console.log("Rider login successful:", responseData);
      if (responseData.token) {
        localStorage.setItem("shopAuthToken", responseData.token);
      } else {
        console.log("token not stored");
      }
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Rider login failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

/**
 * Custom React Query hook for verifying a rider's email.
 * @param {MutationOptions<any, Error>} [options] - Optional configuration for the mutation.
 */
export function useVerifyEmailMutation(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof verifyEmailSchema>) => {
      return await verifyEmail(payload);
    },
    onSuccess: (responseData) => {
      console.log("Email verification successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Email verification failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

/**
 * Custom React Query hook for resending OTP.
 * @param {MutationOptions<any, Error>} [options] - Optional configuration for the mutation.
 */
export function useResendOtpMutation(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof resendOtpSchema>) => {
      return await resendOtp(payload);
    },
    onSuccess: (responseData) => {
      console.log("Resend OTP successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Resend OTP failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

/**
 * Custom React Query hook for initiating forgot password process.
 * @param {MutationOptions<any, Error>} [options] - Optional configuration for the mutation.
 */
export function useForgotPasswordMutation(
  options?: MutationOptions<any, Error>
) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof forgotPasswordSchema>) => {
      return await forgotPassword(payload);
    },
    onSuccess: (responseData) => {
      console.log("Forgot password request successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Forgot password request failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

/**
 * Custom React Query hook for resetting rider password.
 * @param {MutationOptions<any, Error>} [options] - Optional configuration for the mutation.
 */
export function useResetPasswordMutation(
  options?: MutationOptions<any, Error>
) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof resetPasswordSchema>) => {
      return await resetPassword(payload);
    },
    onSuccess: (responseData) => {
      console.log("Password reset successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Password reset failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}
