import * as z from "zod";
import axiosInstance from "@/config/store";
import { createProductSchema, updateProductSchema } from "@/types/product";

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
    throw new Error(error.response.data.message || defaultMessage);
  } else if (error.request) {
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

export const createProduct = async (
  data: z.infer<typeof createProductSchema>
) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price.toString());
    formData.append("inventory", data.inventory.toString());
    formData.append("isAvailable", data.isAvailable.toString());
    formData.append("category", data.category);
    formData.append("description", data.description);
    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await axiosInstance.post("/products/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Error Creating Products");
  }
};

export const updateProduct = async (
  id: string,
  data: z.infer<typeof updateProductSchema>
) => {
  try {
    const formData = new FormData();
    if (data.title !== undefined) formData.append("title", data.title);
    if (data.price !== undefined) formData.append("price", data.price.toString());
    if (data.inventory !== undefined) formData.append("inventory", data.inventory.toString());
    if (data.isAvailable !== undefined) formData.append("isAvailable", data.isAvailable.toString());
    if (data.category !== undefined) formData.append("category", data.category);
    if (data.description !== undefined) formData.append("description", data.description);
    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await axiosInstance.patch(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Error Updating Products");
  }
};

export const getSingleProduct = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data.data;
  } catch (error) {
    handleApiError(error, "Error fetching single product ");
  }
};

interface GetAllProductsParams {
  category?: string;
  store?: string;
  search?: string;
  price?: string; // Or number, depending on how your API expects 'gte:2000'
  pageNo?: number;
  pageSize?: number;
}

export const getAllProducts = async (params?: GetAllProductsParams) => {
  try {
    const response = await axiosInstance.get("/products", {
      params: {
        category: params?.category,
        store: params?.store,
        search: params?.search,
        price: params?.price,
        pageNo: params?.pageNo,
        pageSize: params?.pageSize,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Error fetching all products");
  }
};

export const getStoreProducts = async (params?: GetAllProductsParams) => {
  try {
    const response = await axiosInstance.get("/products/mine", {
      params: {
        category: params?.category,
        search: params?.search,
        price: params?.price,
        pageNo: params?.pageNo,
        pageSize: params?.pageSize,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Error fetching all products");
  }
};

export const deleteSingleProduct = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Error deleting single product ");
  }
};
