"use server";

import axios from "axios";

export const deleteAccount = async (email: string, password: string) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/delete-account`,
      { email, password }
    );

    const data = response?.data;
    return { data };
  } catch (error: any) {
    return {
      error:
        error?.response?.data?.message ||
        "An error ocured while deleting account",
    };
  }
};
