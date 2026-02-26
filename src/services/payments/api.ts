import axiosInstance from "@/config/guest";

/**
 * Handles common API errors by throwing a new Error with a more specific message.
 * This duplicates logic used elsewhere so services remain self-contained.
 */
const handleApiError = (error: any, defaultMessage: string): never => {
  if (error.response) {
    throw new Error(error.response.data.message || defaultMessage);
  } else if (error.request) {
    throw new Error(
      "Network Error: No response received from the server. Please check your internet connection and try again.",
    );
  } else {
    throw new Error(
      `An unexpected error occurred: ${error.message || defaultMessage}`,
    );
  }
};

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
