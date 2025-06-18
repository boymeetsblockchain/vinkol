import { useMutation } from "@tanstack/react-query";
import {
  acceptOrder,
  changeOrderStatus,
  createGuestOrder,
  getQuote,
} from "./api";
import * as z from "zod";
import {
  createOrderSchema,
  getQuoteSchema,
  orderDataSchema,
  changeOrderStatusSchema,
} from "@/types/order";

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
    mutationFn: async (payload: z.infer<typeof orderDataSchema>) => {
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

export function useAcceptOrderMutation(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (id: string) => {
      return await acceptOrder(id);
    },
    onSuccess: (responseData) => {
      console.log("Accept Order successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Accept Order failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

interface ChangeOrderStatusPayload {
  status: "Delivered" | "Picked";
  orderOtp?: string;
}

export function useChangeOrderStatus(options?: MutationOptions<any, Error>) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation<
    any,
    Error,
    { id: string; data: ChangeOrderStatusPayload }
  >({
    mutationFn: async (mutationPayload): Promise<any> => {
      // Here, mutationPayload.id is the order ID, and mutationPayload.data is the actual body
      // that contains 'status' and 'orderOtp'.
      return await changeOrderStatus(mutationPayload.id, mutationPayload.data);
    },
    onSuccess: (responseData) => {
      console.log("Change Order Status successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Change Order Status failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });
  return { mutate, data, error, isPending, isSuccess, isError };
}
