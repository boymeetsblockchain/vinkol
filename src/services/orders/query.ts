import { GetOrdersParams } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "./api";

export const useGetOrders = (params: GetOrdersParams = {}) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => getOrders(params),
    staleTime: 1000 * 60 * 5,
  });
};
