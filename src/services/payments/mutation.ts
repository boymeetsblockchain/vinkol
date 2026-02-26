import { useMutation } from "@tanstack/react-query";
import { verifyPayment } from "./api";
import { toast } from "sonner";

interface MutationOptions<TData, TError> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}

/**
 * Hook to trigger payment verification on the server.
 * The mutation automatically shows toast notifications when the
 * request succeeds or fails, but callbacks may also be provided.
 */
export function useVerifyPaymentMutation(
  options?: MutationOptions<any, Error>,
) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (reference: string) => {
      return await verifyPayment(reference);
    },
    onSuccess: (resp) => {
      console.log("Payment verification succeeded", resp);
      options?.onSuccess?.(resp);
      if (resp?.message) {
        toast.success(resp.message);
      }
    },
    onError: (err: Error) => {
      console.error("Payment verification failed", err.message);
      options?.onError?.(err);
      toast.error(err.message);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}
