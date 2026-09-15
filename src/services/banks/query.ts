import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Country } from "@/lib/markets/types";
import { BankDetails } from "@/types/bank";
import { BankOwner, getBank, getBankList, saveBank, updateBank } from "./api";

export const useBankList = (country?: Country) =>
  useQuery({
    queryKey: ["banks", country],
    queryFn: () => getBankList(country),
    staleTime: 1000 * 60 * 60,
  });

export const useBank = (owner: BankOwner) =>
  useQuery({
    queryKey: ["bank", owner],
    queryFn: () => getBank(owner),
  });

/** Creates or updates depending on whether details already exist. */
export const useSaveBank = (owner: BankOwner, exists: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BankDetails) =>
      exists ? updateBank(owner, data) : saveBank(owner, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bank", owner] });
    },
  });
};
