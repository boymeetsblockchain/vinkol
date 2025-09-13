import { useQuery } from "@tanstack/react-query";
import {
  getUserBank,
  getUserProfile,
  getWallet,
  getWithdrawalHistory,
} from "./api";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });
};

export const useGetUserBank = () => {
  return useQuery({
    queryKey: ["bank"],
    queryFn: getUserBank,
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
