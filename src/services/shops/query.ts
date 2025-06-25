import { useQuery } from "@tanstack/react-query";
import {
  getAllStores,
  getBankLists,
  getSingleStore,
  getStoreProfile,
  getWallet,
  getWithdrawalHistory,
} from "./api";

export const useGetSingleStore = (id?: string) => {
  return useQuery({
    queryKey: ["store", id],
    queryFn: () => getSingleStore(id!),
    enabled: !!id,
  });
};

export const useGetStoreProfile = () => {
  return useQuery({
    queryKey: ["store-profile"],
    queryFn: getStoreProfile,
  });
};

interface GetAllStoresParams {
  search?: string;
  state?: string;
}

export const useGetAllStores = (params?: GetAllStoresParams) => {
  return useQuery({
    queryKey: ["stores", params],
    queryFn: () => getAllStores(params),
  });
};
export const useGetAllBanks = () => {
  return useQuery({
    queryKey: ["banks"],
    queryFn: getBankLists,
  });
};

export const useGetWallet = () => {
  return useQuery({
    queryKey: ["shopwallet"],
    queryFn: getWallet,
  });
};

export const useGetWithdrawalHistory = () => {
  return useQuery({
    queryKey: ["shopwithdrawalhistory"],
    queryFn: getWithdrawalHistory,
  });
};
