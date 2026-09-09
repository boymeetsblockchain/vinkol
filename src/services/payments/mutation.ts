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

/** 1s, 2s, 4s, 8s, 16s — half a minute, which covers the gateway's own lag. */
const RETRY_DELAYS = [1000, 2000, 4000, 8000, 16000];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Verify, waiting out a payment that has not finished settling.
 *
 * Stripe's PaymentIntent lookup is a search index that lags behind the payment
 * itself, so a customer who arrives back before their own webhook would
 * otherwise be told a completed payment had failed.
 *
 * Written as a loop rather than with react-query's `retry`, because the
 * retry has to happen only for one specific server status and the sequence
 * needs to be verifiable.
 */
const verifyUntilSettled = async (reference: string) => {
  for (let attempt = 0; ; attempt++) {
    try {
      return await verifyPayment(reference);
    } catch (error) {
      if (attempt >= RETRY_DELAYS.length || !isPendingPayment(error)) throw error;
      await wait(RETRY_DELAYS[attempt]);
    }
  }
};

/** Hook to trigger payment verification on the server. */
export function useVerifyPaymentMutation(
  options?: MutationOptions<any, Error>,
) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: verifyUntilSettled,
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
