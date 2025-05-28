import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import {
  forgotPasswordSchema,
  loginRiderSchema,
  registerRiderSchema,
  resendOtpSchema,
  resetPasswordSchema,
  updateProfileSchema,
  verifyEmailSchema,
} from "@/types/rider";
import {
  registerRider,
  loginRider,
  verifyEmail,
  resendOtp,
  forgotPassword,
  resetPassword,
  updateProfile,
  submitKyc,
  submitVehicle,
} from "./api"; // Assuming 'api' is the file containing all the API functions

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
export function useRiderRegisterMutation(
  options?: MutationOptions<any, Error>
) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof registerRiderSchema>) => {
      return await registerRider(payload);
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
export function useRiderLoginMutation(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof loginRiderSchema>) => {
      return await loginRider(payload);
    },
    onSuccess: (responseData) => {
      console.log("Rider login successful:", responseData);
      if (responseData.token) {
        localStorage.setItem("riderAuthToken", responseData.token);
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

/**
 * Custom React Query hook for updating rider profile.
 * @param {MutationOptions<any, Error>} [options] - Optional configuration for the mutation.
 */
export function useUpdateProfileMutation(
  options?: MutationOptions<any, Error>
) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof updateProfileSchema>) => {
      return await updateProfile(payload);
    },
    onSuccess: (responseData) => {
      console.log("Profile update successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Profile update failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

export function useSubmitKycMutation(options?: MutationOptions<any, Error>) {
  // Placeholder for KYC submission mutation
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: any) => {
      // Implement the KYC submission logic here
      console.log("Submitting KYC with payload:", payload);
      return await submitKyc(payload); // Assuming submitKyc is defined in your API file
    },
    onSuccess: (responseData) => {
      console.log("KYC submission successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("KYC submission failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

export function useSubmitVechicle(options?: MutationOptions<any, Error>) {
  // Placeholder for KYC submission mutation
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: any) => {
      // Implement the KYC submission logic here
      console.log("Submitting vehicle with payload:", payload);
      return await submitVehicle(payload); // Assuming submitKyc is defined in your API file
    },
    onSuccess: (responseData) => {
      console.log("vehicle submission successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("vehicle submission failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}
