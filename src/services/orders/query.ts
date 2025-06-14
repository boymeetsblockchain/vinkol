import { GetOrdersParams } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import { getOrders, getSingleOrder, trackOrders } from "./api";

export const useGetOrders = (params: GetOrdersParams = {}) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => getOrders(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useTrackOrders = (
  trackingId: string,
  options: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["orders", trackingId],
    queryFn: () => trackOrders(trackingId),
    staleTime: 1000 * 60 * 5,
    enabled: options?.enabled,
  });
};

export const useGetSingleOrder = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getSingleOrder(id),
    staleTime: 1000 * 60 * 5,
  });
};
