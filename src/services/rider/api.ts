import axiosInstance from "@/config/rider";
import {
  contactFormSchema,
  forgotPasswordSchema,
  loginRiderSchema,
  registerRiderSchema,
  resendOtpSchema,
  resetPasswordSchema,
  sendSmsOtpSchema,
  updateProfileSchema,
  verifyEmailSchema,
  verifyPhoneSchema,
} from "@/types/rider";
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
 * Registers a new rider.
 * @param {z.infer<typeof registerRiderSchema>} data - The registration data.
 * @returns {Promise<any>} The response data from the server.
 * @throws {Error} If the registration fails.
 */
export const registerRider = async (
  data: z.infer<typeof registerRiderSchema>
) => {
  try {
    const response = await axiosInstance.post("/users/register-rider", data);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "Rider registration failed.");
  }
};
/**
 * Registers a new rider.
 * @param {z.infer<typeof registerRiderSchema>} data - The registration data.
 * @returns {Promise<any>} The response data from the server.
 * @throws {Error} If the registration fails.
 */
export const registerShopper = async (
  data: z.infer<typeof registerRiderSchema>
) => {
  try {
    const response = await axiosInstance.post("/users/register-shopper", data);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "Shopper registration failed.");
  }
};

/**
 * Logs in a rider.
 * @param {z.infer<typeof loginRiderSchema>} data - The login credentials.
 * @returns {Promise<any>} The response data (e.g., auth token, user info).
 * @throws {Error} If the login fails.
 */
export const loginRider = async (data: z.infer<typeof loginRiderSchema>) => {
  try {
    const response = await axiosInstance.post("/users/login", data);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "Login failed. Please check your credentials.");
  }
};

/**
 * Verifies a rider's email using an OTP.
 * @param {z.infer<typeof verifyEmailSchema>} data - The email verification data (e.g., email and OTP).
 * @returns {Promise<any>} The response data from the server.
 * @throws {Error} If the email verification fails.
 */
export const verifyEmail = async (data: z.infer<typeof verifyEmailSchema>) => {
  try {
    const response = await axiosInstance.patch("/users/verify-email", data);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "Email verification failed.");
  }
};

/**
 * Resends an OTP to the rider's email.
 * @param {z.infer<typeof resendOtpSchema>} data - The data to request OTP resend (e.g., email).
 * @returns {Promise<any>} The response data from the server.
 * @throws {Error} If resending OTP fails.
 */
export const resendOtp = async (data: z.infer<typeof resendOtpSchema>) => {
  try {
    const response = await axiosInstance.patch("/users/resend-otp", data);
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
    const response = await axiosInstance.post("/users/forgot-password", data);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "Failed to initiate password reset.");
  }
};

/**
 * Resets the rider's password using a reset token.
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
      `/users/reset-password/${resetToken}`,
      { password } // Send only the new password in the request body
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "Failed to reset password.");
  }
};

/**
 * Updates the rider's profile.
 * Uses PUT, implying a full replacement of the profile data.
 * @param {z.infer<typeof updateProfileSchema>} data - The updated profile data.
 * @returns {Promise<any>} The response data from the server.
 * @throws {Error} If the profile update fails.
 */
export const updateProfile = async (
  data: z.infer<typeof updateProfileSchema>
) => {
  try {
    const response = await axiosInstance.put("/users/update-profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    handleApiError(error, "Failed to update profile.");
  }
};

export const submitKyc = async (data: any) => {
  try {
    const response = await axiosInstance.post("/kyc/submit-id", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to submit KYC.");
  }
};

export const submitVehicle = async (data: any) => {
  try {
    const response = await axiosInstance.patch("/kyc/submit-vehicle", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to submit vehicle.");
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/users/profile");
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to Get User profile");
  }
};

export const getKyc = async () => {
  try {
    const response = await axiosInstance.get("/kyc");
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to Get User profile");
  }
};

export const sendSmsOtp = async (data: z.infer<typeof sendSmsOtpSchema>) => {
  try {
    const response = await axiosInstance.post("/users/sms-otp", data);
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to send Sms Otp");
  }
};

export const verifySmsOtp = async (data: z.infer<typeof verifyPhoneSchema>) => {
  try {
    const response = await axiosInstance.patch("/users/verify-phone", data);
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to send Sms Otp");
  }
};

export const getWallet = async () => {
  try {
    const response = await axiosInstance.get(`/users/wallet-balance`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to get wallet balance");
  }
};

export const contactMessage = async (
  data: z.infer<typeof contactFormSchema>
) => {
  try {
    const response = await axiosInstance.post("others/contact", data);
    return response;
  } catch (error) {
    handleApiError(error, "failed to send message");
  }
};

export const subscribe = async (email: string) => {
  try {
    const response = await axiosInstance.post("others/subscribe", { email });
    return response;
  } catch (error) {
    handleApiError(error, "failed to send message");
  }
};

export const withdraw = async (amount: string) => {
  try {
    const response = await axiosInstance.post("/users/withdraw", { amount });
    return response;
  } catch (error) {
    handleApiError(error, "failed to withdraw");
  }
};

export const getWithdrawalHistory = async () => {
  try {
    const response = await axiosInstance.get("/users/withdrawal-history");
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to get WithDrawal history");
  }
};
