import {
  registerShopSchema,
  loginShopSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resendOtpSchema,
  resetPasswordSchema,
  updateStoreProfileSchema,
  validateBankSchema,
  createStoreBankSchema,
} from "@/types/shop";

import * as z from "zod";
import {
  forgotPassword,
  loginShop,
  registerShop,
  resendOtp,
  resetPassword,
  updateStoreProfile,
  validateBank,
  verifyEmail,
  createStoreBank,
  withdraw,
  submitStoreId,
  submitBusinessDoc,
  requestITSupport,
  updateOpeningHours,
} from "./api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

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
      // console.log("Store registration successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Store registration failed:", errorData.message);
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
      // console.log("Rider login successful:", responseData);
      if (responseData.token) {
        localStorage.setItem("accessToken", responseData.token);
      } else {
        console.log("token not stored");
      }
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Store login failed:", errorData.message);
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
      // console.log("Email verification successful:", responseData);
      options?.onSuccess?.(responseData);
      localStorage.setItem("accessToken", responseData.token);
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
      // console.log("Resend OTP successful:", responseData);
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
      // console.log("Forgot password request successful:", responseData);
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
      // console.log("Password reset successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Password reset failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

export function useUpdateStoreProfile(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof updateStoreProfileSchema>) => {
      return await updateStoreProfile(payload);
    },
    onSuccess: (responseData) => {
      // console.log("Update Store Profile successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Update Store Profile  failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

export function useValidateBankDetials(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof validateBankSchema>) => {
      return await validateBank(payload);
    },
    onSuccess: (responseData) => {
      // console.log("Update Store Profile successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Update Store Profile  failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

export function useCreateStoreBank(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof createStoreBankSchema>) => {
      return await createStoreBank(payload);
    },
    onSuccess: (responseData) => {
      // console.log("Update Store Profile successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Update Store Profile  failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}
export function useWithDraw(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (amount: string) => {
      // The payload for delete is typically just the ID
      return await withdraw(amount);
    },
    onSuccess: (responseData) => {
      console.log("Message ", responseData);
      options?.onSuccess?.(responseData);
      toast.success(responseData?.data?.message || "WithDrawal successful");
    },
    onError: (errorData: Error) => {
      toast.error("WithDrawal failed");
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

export function useSubmitStoreIdMutation(
  options?: MutationOptions<any, Error>
) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: any) => {
      // Implement the KYC submission logic here
      console.log("Submitting KYC with payload:", payload);
      return await submitStoreId(payload); // Assuming submitKyc is defined in your API file
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

export function useSubmitBusinessDoc(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: any) => {
      // Implement the KYC submission logic here
      console.log("Submitting business document with payload:", payload);
      return await submitBusinessDoc(payload);
    },
    onSuccess: (responseData) => {
      console.log("business document submission successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("business document submission failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

export function useRequestITSupport(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: any) => {
      // Implement the KYC submission logic here
      console.log("Requesting IT support", payload);
      return await requestITSupport(payload);
    },
    onSuccess: (responseData) => {
      console.log("IT support requested:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Error requesting IT support: ", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

export function useUpdateOpeningHours(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: any) => {
      return await updateOpeningHours(payload);
    },
    onSuccess: (responseData) => {
      // console.log("Update Opening Hours successful:", responseData);
      options?.onSuccess?.(responseData);
      // toast.success(responseData?.message || "Opening hours updated");
    },
    onError: (errorData: Error) => {
      console.error("Update Opening Hours failed:", errorData.message);
      toast.error("Failed to update opening hours");
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}
