import { useMutation } from "@tanstack/react-query";
import { createGuestOrder, getQuote } from "./api";
import * as z from "zod";
import { createOrderSchema, getQuoteSchema } from "@/types/order";
import { error } from "console";

/**
 * Defines the common options structure for mutation hooks.
 */
interface MutationOptions<TData, TError> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}

export function useGetQuoteMutation(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof getQuoteSchema>) => {
      return await getQuote(payload);
    },
    onSuccess: (responseData) => {
      console.log("Get Quote successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Get Quote failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}
export function useCreateGuestOrderMutation(
  options?: MutationOptions<any, Error>
) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof createOrderSchema>) => {
      return await createGuestOrder(payload);
    },
    onSuccess: (responseData) => {
      console.log("Get Quote successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Get Quote failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}
