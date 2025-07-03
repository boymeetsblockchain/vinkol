import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import {
  forgotPasswordSchema,
  loginRiderSchema,
  registerRiderSchema,
  resendOtpSchema,
  resetPasswordSchema,
  sendSmsOtpSchema,
  updateProfileSchema,
  verifyEmailSchema,
  verifyPhoneSchema,
  contactFormSchema,
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
  registerShopper,
  sendSmsOtp,
  verifySmsOtp,
  contactMessage,
  subscribe,
  withdraw,
  createUserBank,
} from "./api"; // Assuming 'api' is the file containing all the API functions
import { toast } from "sonner";
import { createStoreBankSchema } from "@/types/shop";

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

export function useShopperRegisterMutation(
  options?: MutationOptions<any, Error>
) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof registerRiderSchema>) => {
      return await registerShopper(payload);
    },
    onSuccess: (responseData) => {
      console.log("Shopper registration successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Shopper registration failed:", errorData.message);
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
      if (responseData?.data?.role != "RIDER") {
        throw new Error("User role does not match RIDER!");
      }
      if (responseData.token) {
        localStorage.setItem("accessToken", responseData.token);
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
export function useShopperLoginMutation(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof loginRiderSchema>) => {
      return await loginRider(payload);
    },
    onSuccess: (responseData) => {
      console.log("Shopper login successful:", responseData);
      if (responseData?.data?.role != "PERSONAL-SHOPPER") {
        throw new Error("User role does not match PERSONAL-SHOPPER!");
      }
      if (responseData.token) {
        localStorage.setItem("accessToken", responseData.token);
      } else {
        console.log("token not stored");
      }
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Shopper login failed:", errorData.message);
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
      if (responseData.token) {
        localStorage.setItem("accessToken", responseData.token);
      } else {
        console.log("token not stored");
      }
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
      // throw new Error(errorData.message);
      console.error("Profile update failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

export function useCreateUserBank(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof createStoreBankSchema>) => {
      return await createUserBank(payload);
    },
    onSuccess: (responseData) => {
      console.log("Update User Bank successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Update User Bank  failed:", errorData.message);
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

export function useSendSmsOtp(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof sendSmsOtpSchema>) => {
      return await sendSmsOtp(payload);
    },
    onSuccess: (responseData) => {
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Send otp failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

export function useVerifyPhoneNumber(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof verifyPhoneSchema>) => {
      return await verifySmsOtp(payload);
    },
    onSuccess: (responseData) => {
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

export function useSendContactMessageMutation(
  options?: MutationOptions<any, Error>
) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (data: z.infer<typeof contactFormSchema>) => {
      // The payload for delete is typically just the ID
      return await contactMessage(data);
    },
    onSuccess: (responseData) => {
      console.log("Message ", responseData);
      options?.onSuccess?.(responseData);
      toast.success(
        responseData?.data?.message || "Message sent successfully!"
      );
    },
    onError: (errorData: Error) => {
      toast.error("Message sent  failed");
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

export function useSubscribe(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (email: string) => {
      // The payload for delete is typically just the ID
      return await subscribe(email);
    },
    onSuccess: (responseData) => {
      console.log("Message ", responseData);
      options?.onSuccess?.(responseData);
      toast.success(
        responseData?.data?.message || "Message sent successfully!"
      );
    },
    onError: (errorData: Error) => {
      toast.error("Message sent  failed");
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
