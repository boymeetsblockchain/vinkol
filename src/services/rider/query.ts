import { useQuery } from "@tanstack/react-query";
import { getUserProfile, getWallet, getWithdrawalHistory } from "./api";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });
};

export const useGetWallet = () => {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: getWallet,
  });
};

export const useGetWithdrawalHistory = () => {
  return useQuery({
    queryKey: ["withdrawalhistory"],
    queryFn: getWithdrawalHistory,
  });
};
