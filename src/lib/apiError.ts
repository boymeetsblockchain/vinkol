import { ApiError } from "./interfaces/error";

/**
 * The single API error translator.
 *
 * Was copy-pasted into four service modules, and only the shops copy threw the
 * typed ApiError carrying a status — which is why the 401 redirect worked in
 * the store dashboard and nowhere else. Every service now throws the typed
 * error, so any caller can react to a status.
 */
export const handleApiError = (error: any, defaultMessage: string): never => {
  if (error?.response) {
    throw new ApiError(
      error.response.data?.message || defaultMessage,
      error.response.status,
    );
  }

  if (error?.request) {
    throw new ApiError(
      "Network Error: No response received from the server. Please check your internet connection and try again.",
    );
  }

  throw new ApiError(
    `An unexpected error occurred: ${error?.message || defaultMessage}`,
  );
};
