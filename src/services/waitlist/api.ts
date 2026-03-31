import axiosInstance from "@/config/guest";
import { waitlistSchema } from "@/types/waitlist";
import * as z from "zod";

/**
 * Handles common API errors by throwing a new Error with a more specific message.
 * This centralizes error handling logic, making the code DRY.
 *
 * @param {any} error - The error object caught from the axios request.
 * @param {string} defaultMessage - A fallback message if no specific error message is available from the response.
 * @throws {Error} Throws a new Error object with a descriptive message.
 */
const handleApiError = (error: any, defaultMessage: string): never => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx.
    // Use the server's error message if available, otherwise the default.
    throw new Error(error.response.data.message || defaultMessage);
  } else if (error.request) {
    // The request was made but no response was received.
    throw new Error(
      "Network Error: No response received from the server. Please check your internet connection and try again.",
    );
  } else {
    // Something happened in setting up the request that triggered an Error.
    throw new Error(
      `An unexpected error occurred: ${error.message || defaultMessage}`,
    );
  }
};

export const submitWaitlist = async (data: z.infer<typeof waitlistSchema>) => {
  try {
    const response = await axiosInstance.post("/waitlist", data);
    return response.data;
  } catch (error) {
    handleApiError(error, "Waitlist submission failed");
  }
};
