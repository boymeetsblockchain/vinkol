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
  <div className="border p-4 rounded-md shadow-sm space-y-2">
    <h3 className="font-semibold text-lg">{product.title}</h3>
    <p className="text-gray-600">₦{product.price.toFixed(2)}</p>
    <p className="text-sm text-gray-500">Category: {product.category}</p>
    <p className="text-sm text-gray-700">{product.description}</p>
    {product.image && (
      <img
        src={product.image}
        alt={product.title}
        className="w-24 h-24 object-cover rounded-md"
      />
    )}
    <div className="flex gap-2 mt-4">
      <button
        onClick={() => onEdit(product)}
        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(product._id)}
        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>

      <button
        onClick={() => {
          setIsCreateFormVisible(!isCreateFormVisible);
          setEditingProduct(null);
        }}
        className="mb-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        {isCreateFormVisible
          ? "Hide Create Product Form"
          : "Create New Product"}
      </button>

      {isCreateFormVisible && (
        <ProductForm
          onSubmit={handleCreateProduct}
          initialData={null} // No initial data for creation
          isSubmitting={createProductMutation.isPending}
          onCancel={() => setIsCreateFormVisible(false)}
        />
      )}

      {editingProduct && (
        <ProductForm
          onSubmit={(data) => handleUpdateProduct(editingProduct._id, data)}
          initialData={editingProduct} // Pass the full Product object
          isSubmitting={updateProductMutation.isPending}
          onCancel={() => setEditingProduct(null)}
        />
      )}

      <h2 className="text-2xl font-semibold mb-4 mt-8">All Products</h2>
      {productList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productList.map((product: any) => (
            <ProductCard
              key={product._id}
              product={{
                _id: product._id,
                title: product.title,
                price: product.price,
                category: product.category,
                image: product.image?.imageUrl, // Access the nested imageUrl
                description: product.description || "", // Handle possible undefined description
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
        <p className="text-gray-500">
          No products found. Start by creating one!
        </p>
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
    <div className="mb-8 p-6 border rounded-lg shadow-md bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? "Edit Product" : "Create New Product"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
            min="0.01"
            step="0.01"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryValue)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          >
            <option value="">Select a category</option>
            {productCategories.map(
              (
                cat // Use imported productCategories
              ) => (
                <option key={cat.value} value={cat.value}>
                  {cat.name}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image File{" "}
            {initialData ? "(Optional for Update)" : "(Required for Create)"}
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) =>
              setImageFile(e.target.files ? e.target.files[0] : null)
            }
            className="mt-1 block w-full text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {currentImageUrl &&
            !imageFile && ( // Display current image if no new file selected
              <p className="text-xs text-gray-500 mt-1">
                Current image:{" "}
                <a
                  href={currentImageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  View
                </a>
              </p>
            )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          ></textarea>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting
              ? "Submitting..."
              : initialData
              ? "Update Product"
              : "Create Product"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
