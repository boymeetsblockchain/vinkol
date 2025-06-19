import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getSingleProduct } from "./api";

type StoreImage = {
  imageUrl: string;
  cloudinaryId: string;
};

type ProductImage = {
  imageUrl: string;
  cloudinaryId: string;
};

type Store = {
  _id: string;
  email: string;
  role: "STORE";
  address: string;
  name: string;
  phone: string;
  avatar: StoreImage;
};

type Product = {
  _id: string;
  title: string;
  price: number;
  description?: string;
  store: Store;
  image: ProductImage;
  category: string;
  slug: string;
};

interface QueryOptions<TData = unknown, TError = Error> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean | "always";
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    fetchedData: Product[];
    noOfPages: number;
    total: number;
    pageNo: number;
    pageSize: number;
  };
}

interface ProductQueryParams {
  category?: string;
  store?: string;
  search?: string;
  price?: string; // e.g., "gte:2000"
  pageNo?: number;
  pageSize?: number;
}

export function useGetAllProductsQuery(
  options?: QueryOptions<Product[], Error>,
  params?: ProductQueryParams
) {
  return useQuery<ApiResponse, Error>({
    queryKey: ["products", params],

    queryFn: async () => {
      const data = await getAllProducts(params);
      return data;
    },
    onSuccess: (data: Product[]) => {
      console.log("Successfully fetched all products:", data);
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      console.error("Failed to fetch all products:", error.message);
      options?.onError?.(error);
    },
    ...options,
  });
}

export function useGetSingleProductQuery(
  productId: string | undefined,
  options?: QueryOptions<Product, Error>
) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!productId) {
        throw new Error("Product ID is required to fetch a single product.");
      }
      const data = await getSingleProduct(productId);
      return data;
    },
    enabled: !!productId && (options?.enabled ?? true),
    onSuccess: (data: Product) => {
      console.log(`Successfully fetched product with ID ${productId}:`, data);
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      console.error(
        `Failed to fetch product with ID ${productId}:`,
        error.message
      );
      options?.onError?.(error);
    },
    ...options,
  });
}
