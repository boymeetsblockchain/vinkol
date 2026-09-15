import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getSingleProduct, getStoreProducts } from "./api";

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
  isAvailable?: boolean;
  inventory?: number;
};

/**
 * onSuccess and onError were removed from useQuery in TanStack Query v5, so
 * passing them here did nothing. Kept only for the call sites that still supply
 * them; react to a query result with the returned state instead.
 */
interface QueryOptions<TData = unknown, TError = Error> {
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
  params?: ProductQueryParams,
) {
  return useQuery<ApiResponse, Error>({
    queryKey: ["products", params],

    queryFn: async () => {
      const data = await getAllProducts(params);
      return data;
    },
    ...options,
  });
}

export function useGetStoreProductsQuery(
  options?: QueryOptions<Product[], Error>,
  params?: ProductQueryParams,
) {
  return useQuery<ApiResponse, Error>({
    queryKey: ["products", params],

    queryFn: async () => {
      const data = await getStoreProducts(params);
      return data;
    },
    ...options,
  });
}

export function useGetSingleProductQuery(
  productId: string | undefined,
  options?: QueryOptions<Product, Error>,
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
  });
}
