import axiosInstance from "@/config/api";
import { handleApiError } from "@/lib/apiError";
import { Country } from "@/lib/markets/types";
import { BankDetails, BankListEntry, IBank } from "@/types/bank";

/**
 * One bank service for both roles and both markets.
 *
 * The rider pages previously imported the *store* service for bank lookups,
 * and details could only ever be created — there was no way to correct a
 * mistyped account number, on the only interface a merchant has. The server
 * has had PATCH endpoints all along.
 */

const paths = {
  store: {
    save: "/banks/create-store-bank",
    update: "/banks/store-bank",
    get: "/banks/store-bank",
  },
  user: {
    save: "/banks/create-user-bank",
    update: "/banks/user-bank",
    get: "/banks/user-bank",
  },
} as const;

export type BankOwner = keyof typeof paths;

export const getBankList = async (
  country?: Country,
): Promise<BankListEntry[]> => {
  try {
    const response = await axiosInstance.get("/banks/list", {
      params: { country },
    });
    return response.data?.data ?? [];
  } catch (error) {
    return handleApiError(error, "Failed to load banks");
  }
};

export const getBank = async (owner: BankOwner): Promise<IBank | null> => {
  try {
    const response = await axiosInstance.get(paths[owner].get);
    return response.data?.data ?? null;
  } catch (error: any) {
    // No bank on file yet is an expected state during onboarding, not an error.
    if (error?.response?.status === 404) return null;
    return handleApiError(error, "Failed to load bank details");
  }
};

export const saveBank = async (owner: BankOwner, data: BankDetails) => {
  try {
    const response = await axiosInstance.post(paths[owner].save, data);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Failed to save bank details");
  }
};

export const updateBank = async (owner: BankOwner, data: BankDetails) => {
  try {
    const response = await axiosInstance.patch(paths[owner].update, data);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Failed to update bank details");
  }
};

/** Nigeria only. The market config says whether resolution is available. */
export const resolveAccountName = async (payload: {
  country: Country;
  accountNumber: string;
  bankCode: string;
}): Promise<string | null> => {
  try {
    const response = await axiosInstance.post("/banks/validate", payload);
    return response.data?.data?.account_name ?? null;
  } catch (error) {
    return handleApiError(error, "Could not verify that account");
  }
};
