import { handleApiError } from "@/lib/apiError";
import axiosInstance from "@/config/guest";


/**
 * Verify a payment using the reference provided by the payment gateway.
 *
 * @param reference - the transaction reference string to verify
 * @returns the API response data
 */
export const verifyPayment = async (reference: string) => {
  try {
    const response = await axiosInstance.post("/payments/verify-payment", {
      reference,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Payment verification failed");
  }
};
