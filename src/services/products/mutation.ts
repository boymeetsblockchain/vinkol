import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { createProductSchema, updateProductSchema } from "@/types/product";
import { createProduct, updateProduct, deleteSingleProduct } from "./api";

interface MutationOptions<TData, TError> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}

export function useCreateProductMutation(
  options?: MutationOptions<any, Error>
) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: z.infer<typeof createProductSchema>) => {
      return await createProduct(payload);
    },
    onSuccess: (responseData) => {
      console.log("Product creation successful:", responseData); // Changed log message
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Product creation failed:", errorData.message); // Changed log message
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

export function useUpdateProductMutation(
  options?: MutationOptions<any, Error>
) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: {
      id: string;
      data: z.infer<typeof updateProductSchema>;
    }) => {
      return await updateProduct(payload.id, payload.data);
    },
    onSuccess: (responseData) => {
      console.log("Product update successful:", responseData); // Changed log message
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Product update failed:", errorData.message); // Changed log message
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}

export function useDeleteProductMutation(
  options?: MutationOptions<any, Error>
) {
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (id: string) => {
      // The payload for delete is typically just the ID
      return await deleteSingleProduct(id);
    },
    onSuccess: (responseData) => {
      console.log("Product deletion successful:", responseData);
      options?.onSuccess?.(responseData);
    },
    onError: (errorData: Error) => {
      console.error("Product deletion failed:", errorData.message);
      options?.onError?.(errorData);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
}
