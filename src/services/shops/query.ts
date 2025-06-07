import { useQuery } from "@tanstack/react-query";
import { getAllStores, getSingleStore, getStoreProfile } from "./api";

export const useGetSingleStore = (id?: string) => {
  return useQuery({
    queryKey: ["store", id],
    queryFn: () => getSingleStore(id!), // Use non-null assertion or handle undefined in getSingleStore
    enabled: !!id, // Query will only run if id is truthy
  });
};

export const useGetStoreProfile = () => {
  return useQuery({
    queryKey: ["store-profile"],
    queryFn: getStoreProfile,
  });
};

export const useGetAllStores = () => {
  return useQuery({
    queryKey: ["stores"],
    queryFn: getAllStores,
  });
};
