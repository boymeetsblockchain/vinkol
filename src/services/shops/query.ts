import { Country } from "@/lib/markets/types";
import { useQuery } from "@tanstack/react-query";
import {
  getAllCollorativeStores,
  getAllStores,
  getBankLists,
  getSingleStore,
  getStoreProfile,
  getWallet,
  getWithdrawalHistory,
} from "./api";

export const useGetSingleStore = (id?: string, country?: Country) => {
  return useQuery({
    queryKey: ["store", id, country],
    queryFn: () => getSingleStore(id!, country),
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
  /** Scopes the listing to one market. The server rejects cross-market rows. */
  country?: Country;
}

export const useGetAllStores = (params?: GetAllStoresParams) => {
  return useQuery({
    queryKey: ["stores", params],
    queryFn: () => getAllStores(params),
  });
};
export const useGetAllCollaborativeStores = (country?: Country) => {
  return useQuery({
    queryKey: ["stores", "collaborative", country],
    queryFn: () => getAllCollorativeStores(country),
  });
};
export const useGetAllBanks = (country?: Country) => {
  return useQuery({
    queryKey: ["banks", country],
    queryFn: () => getBankLists(country),
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
