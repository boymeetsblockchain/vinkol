import { handleApiError } from "@/lib/apiError";
import axiosInstance from "@/config/guest";
import {
  changeOrderStatusSchema,
  createOrderSchema,
  createStoreOrderSchema,
  GetOrdersParams,
  getQuoteSchema,
  getShoppingDeliveryFeeSchema,
  orderDataSchema,
} from "@/types/order";
import * as z from "zod";


export const getQuote = async (data: z.infer<typeof getQuoteSchema>) => {
  try {
    const response = await axiosInstance.post("/orders/get-quote", data);
    return response.data;
  } catch (error) {
    handleApiError(error, "Get Qoute Failed");
  }
};

export const createGuestOrder = async (
  data: z.infer<typeof orderDataSchema>,
) => {
  try {
    const response = await axiosInstance.post(
      "/orders/create-guest-order",
      data,
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Create Order Failed");
  }
};

export const createGuestOrderWithPaystack = async (
  data: z.infer<typeof orderDataSchema>,
) => {
  try {
    const response = await axiosInstance.post(
      "/orders/create-guest-order",
      data,
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Create Order Failed");
  }
};

export const getOrders = async (params: GetOrdersParams = {}) => {
  try {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });
    const response = await axiosInstance.get(`/orders?${query.toString()}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Get Order failed");
  }
};

export const getAvailableOrders = async (params: GetOrdersParams = {}) => {
  try {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });
    const response = await axiosInstance.get(
      `/orders/available-orders?${query.toString()}`,
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Get Order failed");
  }
};

// Updated getStoreOrders function with pagination and filtering support
export const getStoreOrders = async (params?: {
  page?: number;
  status?: string;
  page_size?: number;
}) => {
  try {
    const queryParams = new URLSearchParams();

    if (params?.page) {
      queryParams.append("page", params.page.toString());
    }

    if (params?.status && params.status !== "all") {
      queryParams.append("status", params.status);
    }

    if (params?.page_size) {
      queryParams.append("page_size", params.page_size.toString());
    }

    const response = await axiosInstance.get(
      `/stores/orders?${queryParams.toString()}`,
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch orders");
    throw error; // Re-throw the error to be caught by react-query
  }
};

export const trackOrders = async (trackingId: string) => {
  try {
    const response = await axiosInstance.get(
      `/orders/track-order/${trackingId}`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, "Tracking order failed");
    throw error;
  }
};

export const getSingleOrder = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Error  Getting single order failed");
    throw error;
  }
};

export const acceptOrder = async (id: string): Promise<any> => {
  try {
    const response = await axiosInstance.patch(`/orders/${id}/accept`);
    return response.data;
  } catch (error) {
    handleApiError(error, " Error Accepting Orders");
    throw error;
  }
};

export const confirmOrder = async (id: string): Promise<any> => {
  try {
    const response = await axiosInstance.patch(`/orders/${id}/confirm`);
    return response.data;
  } catch (error) {
    handleApiError(error, " Error Confirmimng Orders");
    throw error;
  }
};

export const changeOrderStatus = async (
  id: string,
  data: z.infer<typeof changeOrderStatusSchema>,
) => {
  try {
    const response = await axiosInstance.patch(
      `/orders/${id}/change-status`,
      data,
    );
    return response.data;
  } catch (error) {
    handleApiError(error, " Error Changing Order Status");
    throw error;
  }
};

export const getRiderOrders = async () => {
  try {
    const response = await axiosInstance.get("/orders/rider-orders");
    return response.data;
  } catch (error) {
    handleApiError(error, " Error Getting Order Status");
    throw error;
  }
};

export const getShoppingDeliveryFee = async (
  data: z.infer<typeof getShoppingDeliveryFeeSchema>,
) => {
  try {
    const response = await axiosInstance.post(
      "orders/shopping-delivery-fee",
      data,
    );
    return response.data;
  } catch (error) {
    handleApiError(error, " Error Getting Delivery Fee");
    throw error;
  }
};

export const createStoreOrder = async (
  data: z.infer<typeof createStoreOrderSchema>,
) => {
  try {
    const response = await axiosInstance.post("/orders/guest-store-order", data);
    return response.data;
  } catch (error) {
    handleApiError(error, " Error Creating Order from Store");
    throw error;
  }
};
export const getBulkQuote = async (data: any) => {
  try {
    const response = await axiosInstance.post("/orders/get-bulk-quote", data);
    return response.data;
  } catch (error) {
    handleApiError(error, "Get Bulk Quote Failed");
  }
};

export const getMultiOrderQuote = async (data: any) => {
  try {
    const response = await axiosInstance.post("/orders/multi-order-quote", data);
    return response.data;
  } catch (error) {
    handleApiError(error, "Get Multi-Order Quote Failed");
  }
};

export const createBulkOrder = async (payload: { quoteId: string; callbackUrl?: string; paymentSource: string }) => {
  try {
    const response = await axiosInstance.post(
      "orders/create-bulk-order",
      payload,
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Create Bulk Order Failed");
  }
};

export const createMultiOrder = async (payload: { quoteId: string; callbackUrl?: string; paymentSource: string }) => {
  try {
    const response = await axiosInstance.post(
      "orders/create-multi-order",
      payload,
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Create Multi-Order Failed");
  }
};
