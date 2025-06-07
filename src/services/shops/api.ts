import {
  registerShopSchema,
  loginShopSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resendOtpSchema,
  resetPasswordSchema,
  updateStoreProfileSchema,
} from "@/types/shop";

import * as z from "zod";
import axiosInstance from "@/config/store";
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
      "Network Error: No response received from the server. Please check your internet connection and try again."
    );
  } else {
    // Something happened in setting up the request that triggered an Error.
    throw new Error(
      `An unexpected error occurred: ${error.message || defaultMessage}`
    );
  }
};

/**
 * Registers a new Shop.
 * @param {z.infer<typeof registerShopSchema>} data - The registration data.
 * @returns {Promise<any>} The response data from the server.
 * @throws {Error} If the registration fails.
 */
export const registerShop = async (
  data: z.infer<typeof registerShopSchema>
) => {
  try {
    const response = await axiosInstance.post("/stores/register", data);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "Shop registration failed.");
  }
};

/**
 * Logs in a Shop.
 * @param {z.infer<typeof loginShopSchema>} data - The login credentials.
 * @returns {Promise<any>} The response data (e.g., auth token, user info).
 * @throws {Error} If the login fails.
 */
export const loginShop = async (data: z.infer<typeof loginShopSchema>) => {
  try {
    const response = await axiosInstance.post("/stores/login", data);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "Login failed. Please check your credentials.");
  }
};

/**
 * Verifies a Shop's email using an OTP.
 * @param {z.infer<typeof verifyEmailSchema>} data - The email verification data (e.g., email and OTP).
 * @returns {Promise<any>} The response data from the server.
 * @throws {Error} If the email verification fails.
 */
export const verifyEmail = async (data: z.infer<typeof verifyEmailSchema>) => {
  try {
    const response = await axiosInstance.patch("/stores/verify-email", data);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "Email verification failed.");
  }
};

/**
 * Resends an OTP to the Shop's email.
 * @param {z.infer<typeof resendOtpSchema>} data - The data to request OTP resend (e.g., email).
 * @returns {Promise<any>} The response data from the server.
 * @throws {Error} If resending OTP fails.
 */
export const resendOtp = async (data: z.infer<typeof resendOtpSchema>) => {
  try {
    const response = await axiosInstance.patch("stores/resend-otp", data);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "Failed to resend OTP.");
  }
};

/**
 * Initiates the forgot password process.
 * @param {z.infer<typeof forgotPasswordSchema>} data - The email for which to reset the password.
 * @returns {Promise<any>} The response data from the server.
 * @throws {Error} If the forgot password request fails.
 */
export const forgotPassword = async (
  data: z.infer<typeof forgotPasswordSchema>
) => {
  try {
    const response = await axiosInstance.post("/stores/forgot-password", data);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "Failed to initiate password reset.");
  }
};

/**
 * Resets the Shop's password using a reset token.
 * Assumes `resetPasswordSchema` includes `resetToken` and `password`.
 * The `resetToken` is used in the URL path, and `password` is sent in the body.
 *
 * @param {z.infer<typeof resetPasswordSchema>} data - The reset password data (resetToken and new password).
 * @returns {Promise<any>} The response data from the server.
 * @throws {Error} If the password reset fails.
 */
export const resetPassword = async (
  data: z.infer<typeof resetPasswordSchema>
) => {
  try {
    const { resetToken, password } = data; // Destructure resetToken for URL and password for body
    const response = await axiosInstance.patch(
      `/stores/reset-password/${resetToken}`,
      { password } // Send only the new password in the request body
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "Failed to reset password.");
  }
};

export const updateStoreProfile = async (
  data: z.infer<typeof updateStoreProfileSchema>
) => {
  try {
    const response = await axiosInstance.put("//stores/update-profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to upload profile.");
  }
};

export const getSingleStore = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/stores/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to get single store");
  }
};

export const getStoreProfile = async () => {
  try {
    const response = await axiosInstance.get(`/stores/profile`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to get single store");
  }
};

export const getAllStores = async () => {
  try {
    const response = await axiosInstance.get("/stores");
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to get stores");
  }
};
