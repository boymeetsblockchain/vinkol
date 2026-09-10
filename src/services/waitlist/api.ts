import axiosInstance from "@/config/guest";
import { handleApiError } from "@/lib/apiError";
import { waitlistSchema } from "@/types/waitlist";
import * as z from "zod";

export const submitWaitlist = async (data: z.infer<typeof waitlistSchema>) => {
  try {
    const response = await axiosInstance.post("/waitlist", data);
    return response.data;
  } catch (error) {
    handleApiError(error, "Waitlist submission failed");
  }
};
