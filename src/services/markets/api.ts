import axiosInstance from "@/config/api";
import { handleApiError } from "@/lib/apiError";
import { Country, MarketConfig } from "@/lib/markets/types";

/**
 * Per-market client configuration: which payment methods to offer, whether a
 * customer wallet exists, how to format money, the tax label to print, and the
 * shape a bank-account form must take.
 *
 * Note what this does not return: no rate card, no processing fee rate. Prices
 * come from a quote, never from a local calculation.
 */
export const getMarkets = async (): Promise<Record<Country, MarketConfig>> => {
  try {
    const response = await axiosInstance.get("/others/markets");
    return response.data?.data?.markets;
  } catch (error) {
    return handleApiError(error, "Could not load market configuration");
  }
};
