import { GetOrdersParams } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import {
  getAvailableOrders,
  getOrders,
  getRiderOrders,
  getSingleOrder,
  getStoreOrders,
  trackOrders,
} from "./api";

export const useGetOrders = (params: GetOrdersParams = {}) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => getOrders(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetAvailableOrders = (params: GetOrdersParams = {}) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => getAvailableOrders(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetStoreOrders = (params?: {
  page?: number;
  status?: string;
  page_size?: number;
}) => {
  return useQuery({
    queryKey: ["store-orders", params],
    queryFn: () => getStoreOrders(params),
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

export const useGetRiderOrders = () => {
  return useQuery({
    queryKey: ["rider-orders"],
    queryFn: () => getRiderOrders(),
  });
};
