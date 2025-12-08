"use client";

import {
  useGetAllProductsQuery,
  useGetStoreProductsQuery,
} from "@/services/products/query";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/services/products/mutation";
import React, { useState } from "react";
import { toast } from "sonner";
import { createProductSchema, updateProductSchema } from "@/types/product";
import * as z from "zod";
import { productCategories } from "@/lib/constants";

type CategoryValue = (typeof productCategories)[number]["value"];

interface Product {
  _id: string;
  title: string;
  price: number;
  category: CategoryValue;
  image?: string;
  description: string;
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

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => (
  <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col">
    {product.image && (
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
    )}

    <div className="flex justify-between items-start flex-wrap">
      <h3 className="font-semibold text-lg">{product.title}</h3>

      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
        {product.category}
      </span>
    </div>

    <p className="text-green-700 font-semibold mt-1">
      ₦{product.price.toLocaleString()}
    </p>

    <p className="text-gray-600 text-sm mt-2 line-clamp-3">
      {product.description}
    </p>

    <div className="flex gap-2 mt-4">
      <button
        onClick={() => onEdit(product)}
        className="flex-1 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Edit
      </button>

      <button
        onClick={() => onDelete(product._id)}
        className="flex-1 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
      >
        Delete
      </button>
    </div>
  </div>
);

function ProductPage() {
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetStoreProductsQuery();
  // Extract the products from the nested structure
  const productList = products?.data?.fetchedData || [];
  const createProductMutation = useCreateProductMutation({
    onSuccess: () => {
      toast.success("Product created successfully!");
      refetch();
      setIsCreateFormVisible(false); // Hide form after successful creation
    },
    onError: (err) => {
      toast.error(`Error creating product: ${err.message}`);
    },
  });

  const updateProductMutation = useUpdateProductMutation({
    onSuccess: () => {
      toast.success("Product updated successfully!");
      refetch();
      setEditingProduct(null); // Close edit form after successful update
    },
    onError: (err) => {
      toast.error(`Error updating product: ${err.message}`);
    },
  });

  const deleteProductMutation = useDeleteProductMutation({
    onSuccess: () => {
      toast.success("Product deleted successfully!");
      refetch();
    },
    onError: (err) => {
      toast.error(`Error deleting product: ${err.message}`);
    },
  });

  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null); // Type this as Product

  const handleCreateProduct = (payload: ProductFormData) => {
    // Only pass create payload to mutation
    createProductMutation.mutate(
      payload as z.infer<typeof createProductSchema>
    );
  };

  const handleUpdateProduct = (id: string, data: ProductFormData) => {
    updateProductMutation.mutate({
      id,
      data: data as z.infer<typeof updateProductSchema>,
    });
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading products...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Error fetching products: {error?.message}
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 md:mt-1 mb-8">
        <h1 className="text-3xl font-bold">Product Management</h1>

        <button
          onClick={() => {
            setIsCreateFormVisible(!isCreateFormVisible);
            setEditingProduct(null);
          }}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition"
        >
          {isCreateFormVisible ? "Close Form" : "+ Add Product"}
        </button>
      </div>

      {isCreateFormVisible && (
        <ProductForm
          onSubmit={handleCreateProduct}
          initialData={null}
          isSubmitting={createProductMutation.isPending}
          onCancel={() => setIsCreateFormVisible(false)}
        />
      )}

      {editingProduct && (
        <ProductForm
          onSubmit={(data) => handleUpdateProduct(editingProduct._id, data)}
          initialData={editingProduct}
          isSubmitting={updateProductMutation.isPending}
          onCancel={() => setEditingProduct(null)}
        />
      )}

      <h2 className="text-2xl font-semibold mb-4 mt-10">All Products</h2>

      {productList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {productList.map((product: any) => (
            <ProductCard
              key={product._id}
              product={{
                _id: product._id,
                title: product.title,
                price: product.price,
                category: product.category,
                image: product.image?.imageUrl,
                description: product.description || "",
              }}
              onEdit={(prod) => {
                setEditingProduct(prod);
                setIsCreateFormVisible(false);
              }}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-lg border">
          No products found. Click
          <span className="font-semibold text-green-700"> “Add Product” </span>
          to get started.
        </div>
      )}
    </div>
  );
}

export default ProductPage;

type ProductFormData =
  | z.infer<typeof createProductSchema>
  | z.infer<typeof updateProductSchema>;

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  initialData: Product | null;
  isSubmitting: boolean;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  initialData,
  isSubmitting,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [price, setPrice] = useState(initialData?.price || 0);
  const [category, setCategory] = useState<CategoryValue | undefined>(
    initialData?.category as CategoryValue | undefined
  );
  const [imageFile, setImageFile] = useState<File | null>(null); // For new image selection (File object)
  const [currentImageUrl, setCurrentImageUrl] = useState(
    initialData?.image || ""
  ); // To display existing image URL
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation for required fields
    if (!title || price <= 0 || !category || !description) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    if (!initialData && !imageFile) {
      // Image file is strictly required for new product creation
      toast.error("An image file is required for new products.");
      return;
    }

    // Construct the payload based on whether it's an update or create
    let payload:
      | z.infer<typeof createProductSchema>
      | z.infer<typeof updateProductSchema>;

    if (initialData) {
      // This is an update operation
      payload = {
        title,
        price,
        category,
        description,
      };
      // Only include image if a new file has been selected
      if (imageFile) {
        (payload as z.infer<typeof updateProductSchema>).image = imageFile;
      }
      // Validate against updateProductSchema (optional fields)
      const parsed = updateProductSchema.safeParse(payload);
      if (!parsed.success) {
        console.error("Update validation errors:", parsed.error.errors);
        toast.error(`Validation failed: ${parsed.error.errors[0]?.message}`);
        return;
      }
      onSubmit(parsed.data);
    } else {
      if (!imageFile) {
        toast.error("An image file is required for new products.");
        return;
      }
      payload = {
        title,
        price,
        category,
        image: imageFile,
        description,
      };

      const parsed = createProductSchema.safeParse(payload);
      if (!parsed.success) {
        console.error("Create validation errors:", parsed.error.errors);
        toast.error(`Validation failed: ${parsed.error.errors[0]?.message}`);
        return;
      }
      onSubmit(parsed.data);
    }
  };

  return (
    <div className="mb-10 p-6 bg-white shadow-md rounded-xl border">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? "Edit Product" : "Create Product"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Title */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryValue)}
            className="mt-1 w-full border rounded-lg p-3 bg-white"
          >
            <option value="">Select a category</option>
            {productCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Image (Max: 2MB)
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            className="mt-2 block w-full text-gray-800 file:bg-blue-50 file:px-4 file:py-2 file:rounded-lg file:border-0 file:text-blue-700 hover:file:bg-blue-100"
          />

          {currentImageUrl && !imageFile && (
            <p className="text-sm mt-1 text-gray-500">
              Current image:{" "}
              <a
                href={currentImageUrl}
                target="_blank"
                className="underline text-blue-600"
              >
                View
              </a>
            </p>
          )}
        </div>

        {/* Description */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="col-span-1 md:col-span-2 flex gap-3 mt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting
              ? "Saving..."
              : initialData
              ? "Update Product"
              : "Create Product"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
