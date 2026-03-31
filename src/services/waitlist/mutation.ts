import { useMutation } from "@tanstack/react-query";
import { submitWaitlist } from "./api";
import { waitlistSchema } from "@/types/waitlist";
import * as z from "zod";
import { toast } from "sonner";

/**
 * Defines the common options structure for mutation hooks.
 */
interface MutationOptions<TData, TError> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}

export function useSubmitWaitlistMutation(
  options?: MutationOptions<any, Error>,
) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof waitlistSchema>) => {
      return await submitWaitlist(payload);
    },
    onSuccess: (responseData) => {
      console.log("Waitlist submission successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Waitlist submission failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}
