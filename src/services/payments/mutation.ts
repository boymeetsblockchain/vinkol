import { useMutation } from "@tanstack/react-query";
import { verifyPayment } from "./api";
import { toast } from "sonner";
import { ApiError } from "@/lib/interfaces/error";

interface MutationOptions<TData, TError> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  /** For callers that render the outcome themselves, so a toast is noise. */
  silent?: boolean;
}

/** Whether a 400 means "not yet" rather than "no". */
export const isPendingPayment = (error: unknown): boolean =>
  error instanceof ApiError && error.data?.status === "pending";

const MAX_RETRIES = 5;

/**
 * Hook to trigger payment verification on the server.
 *
 * Retries while the server reports the payment as still pending: Stripe's
 * PaymentIntent lookup is a search index that lags by up to a minute, so a
 * customer who beats their own webhook back to the success page would
 * otherwise be told their completed payment failed.
 */
export function useVerifyPaymentMutation(
  options?: MutationOptions<any, Error>,
) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (reference: string) => {
      return await verifyPayment(reference);
    },
    retry: (failureCount, err) =>
      failureCount < MAX_RETRIES && isPendingPayment(err),
    // 1s, 2s, 4s, 8s, 16s — about half a minute in total, which covers the
    // lag without leaving the customer watching a spinner indefinitely.
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 16000),
    onSuccess: (resp) => {
      options?.onSuccess?.(resp);
      if (resp?.message && !options?.silent) {
        toast.success(resp.message);
      }
    },
    onError: (err: Error) => {
      console.error("Payment verification failed", err.message);
      options?.onError?.(err);
      if (!options?.silent) toast.error(err.message);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}
