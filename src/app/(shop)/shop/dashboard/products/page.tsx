"use client";

import { useGetStoreProductsQuery } from "@/services/products/query";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/services/products/mutation";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { createProductSchema, updateProductSchema } from "@/types/product";
import * as z from "zod";
import { productCategories } from "@/lib/constants";
import {
  Plus, X, Pencil, Trash2, PackageOpen, ImagePlus,
  AlertTriangle, ZoomIn, LayoutGrid, List, Search,
  Tag, Check, SlidersHorizontal
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type CategoryValue = (typeof productCategories)[number]["value"];

interface Product {
  _id: string;
  title: string;
  price: number;
  category: CategoryValue;
  image?: string;
  description: string;
  inventory?: number;
  isAvailable: boolean;
}

type ProductFormData =
  | z.infer<typeof createProductSchema>
  | z.infer<typeof updateProductSchema>;

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const ImageLightbox: React.FC<{ src: string; alt: string; onClose: () => void }> = ({ src, alt, onClose }) => {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[200] bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"><X size={22} /></button>
      <img src={src} alt={alt} className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain" onClick={(e) => e.stopPropagation()} />
    </div>
  );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const SkeletonGrid = () => (
  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse">
    <div className="aspect-square bg-gray-100" />
    <div className="p-4 space-y-2.5">
      <div className="h-4 w-3/4 bg-gray-100 rounded" />
      <div className="h-4 w-1/3 bg-gray-100 rounded" />
      <div className="h-3 w-full bg-gray-100 rounded" />
    </div>
  </div>
);

const SkeletonList = () => (
  <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 animate-pulse">
    <div className="w-16 h-16 rounded-xl bg-gray-100 flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-4 w-1/2 bg-gray-100 rounded" />
      <div className="h-3 w-1/3 bg-gray-100 rounded" />
    </div>
    <div className="h-5 w-20 bg-gray-100 rounded" />
    <div className="flex gap-2">
      <div className="w-8 h-8 bg-gray-100 rounded-lg" />
      <div className="w-8 h-8 bg-gray-100 rounded-lg" />
    </div>
  </div>
);

// ─── Product image placeholder ────────────────────────────────────────────────
const ImgPlaceholder = ({ size = "lg" }: { size?: "sm" | "lg" }) => (
  <div className={`w-full h-full flex flex-col items-center justify-center text-gray-200 bg-gray-50 gap-1 ${size === "sm" ? "text-[10px]" : "text-xs"}`}>
    <ImagePlus size={size === "sm" ? 18 : 28} />
    {size === "lg" && <span>No image</span>}
  </div>
);

// ─── Grid card ────────────────────────────────────────────────────────────────
const GridCard: React.FC<{
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  onZoom: (src: string) => void;
}> = ({ product, onEdit, onDelete, isDeleting, onZoom }) => {
  return (
    <div className="bg-white border border-gray-100/80 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-100 transition-all group flex flex-col">
      {/* Image */}
      <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center border-b border-gray-100/50 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 origin-bottom">
        {product.image ? (
          <Dialog>
            <DialogTrigger asChild>
              <div className="w-full h-full relative cursor-pointer">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-all">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 drop-shadow-md" size={24} />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl border-none bg-transparent shadow-none p-0 flex justify-center items-center">
              <DialogTitle className="sr-only">Image Preview</DialogTitle>
              <img src={product.image} alt={product.title} className="max-w-full max-h-[85vh] rounded-xl object-contain drop-shadow-2xl" />
            </DialogContent>
          </Dialog>
        ) : (
          <PackageOpen size={32} className="text-gray-300" />
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 bg-white relative z-10">
        <h3 className="font-semibold text-gray-900 text-[15px] leading-snug line-clamp-1 group-hover:text-[var(--color-blue-primary)] transition-colors">{product.title}</h3>
        <div className="flex items-center justify-between mt-1 mb-2">
          <span className="text-[var(--color-blue-primary)] font-bold text-[15px] tracking-tight">₦{product.price.toLocaleString()}</span>
          {!product.isAvailable ? (
            <span className="flex-shrink-0 text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">Offline</span>
          ) : product.inventory !== undefined ? (
            product.inventory <= 0 ? (
              <span className="flex-shrink-0 text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full">Out of Stock</span>
            ) : (
              <span className="flex-shrink-0 text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">{product.inventory} in stock</span>
            )
          ) : null}
        </div>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed flex-1">{product.description}</p>
        
        {/* Actions */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50">
          <button onClick={() => onEdit(product)} className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 transition-colors text-sm font-medium">
            <Pencil size={14} /> Edit
          </button>
          <button onClick={() => onDelete(product._id)} className="w-10 h-10 rounded-xl flex items-center justify-center text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── List row ─────────────────────────────────────────────────────────────────
const ListRow: React.FC<{
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  onZoom: (src: string) => void;
}> = ({ product, onEdit, onDelete, isDeleting, onZoom }) => {
  return (
    <div className="bg-white border border-gray-100/80 rounded-2xl p-4 flex gap-4 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-100 group">
      {/* Image */}
      <div className="w-24 h-24 rounded-xl bg-gray-50 flex-shrink-0 flex items-center justify-center border border-gray-100/50 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-300">
        {product.image ? (
          <Dialog>
            <DialogTrigger asChild>
              <div className="w-full h-full relative cursor-pointer">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-all">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 drop-shadow-md" size={24} />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl border-none bg-transparent shadow-none p-0 flex justify-center items-center">
              <DialogTitle className="sr-only">Image Preview</DialogTitle>
              <img src={product.image} alt={product.title} className="max-w-full max-h-[85vh] rounded-xl object-contain drop-shadow-2xl" />
            </DialogContent>
          </Dialog>
        ) : (
          <PackageOpen size={24} className="text-gray-300" />
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 py-0.5 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-gray-900 text-[15px] leading-snug line-clamp-1 flex-1 group-hover:text-[var(--color-blue-primary)] transition-colors">{product.title}</h3>
          <div className="flex gap-2 items-center">
            {!product.isAvailable ? (
              <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full flex-shrink-0">Offline</span>
            ) : product.inventory !== undefined ? (
              product.inventory <= 0 ? (
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full flex-shrink-0">Out of Stock</span>
              ) : (
                <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full flex-shrink-0">{product.inventory} in stock</span>
              )
            ) : null}
          </div>
        </div>
        <p className="text-[var(--color-blue-primary)] font-bold text-[15px] tracking-tight">₦{product.price.toLocaleString()}</p>
        <p className="text-gray-500 text-sm mt-1.5 line-clamp-2 flex-1 leading-relaxed">{product.description}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 justify-center pl-2 border-l border-gray-50 ml-1">
        <button onClick={() => onEdit(product)} className="w-9 h-9 rounded-xl flex items-center justify-center text-blue-500 bg-blue-50 hover:bg-blue-100 hover:text-blue-600 transition-colors">
          <Pencil size={15} />
        </button>
        <button onClick={() => onDelete(product._id)} className="w-9 h-9 rounded-xl flex items-center justify-center text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 transition-colors">
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};

// ─── Drawer form ──────────────────────────────────────────────────────────────
interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  initialData: Product | null;
  isSubmitting: boolean;
  onClose: () => void;
  isOpen: boolean;
}

const ProductFormDrawer: React.FC<ProductFormProps> = ({ onSubmit, initialData, isSubmitting, onClose, isOpen }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [inventory, setInventory] = useState<number | "">("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [category, setCategory] = useState<CategoryValue | "">("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(initialData?.title ?? "");
    setPrice(initialData?.price ?? "");
    setInventory(initialData?.inventory ?? "");
    setIsAvailable(initialData?.isAvailable ?? true);
    setCategory((initialData?.category as CategoryValue) ?? "");
    setImageFile(null);
    setImagePreview(initialData?.image ?? "");
    setDescription(initialData?.description ?? "");
  }, [initialData, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || price === "" || price <= 0 || inventory === "" || inventory < 0 || !category || !description.trim()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }
    if (initialData) {
      const payload: z.infer<typeof updateProductSchema> = { title, price: Number(price), inventory: Number(inventory), isAvailable, category, description };
      if (imageFile) payload.image = imageFile;
      const parsed = updateProductSchema.safeParse(payload);
      if (!parsed.success) { toast.error(parsed.error.errors[0]?.message); return; }
      onSubmit(parsed.data);
    } else {
      if (!imageFile) { toast.error("An image is required for new products."); return; }
      const payload = { title, price: Number(price), inventory: Number(inventory), isAvailable, category, image: imageFile, description };
      const parsed = createProductSchema.safeParse(payload);
      if (!parsed.success) { toast.error(parsed.error.errors[0]?.message); return; }
      onSubmit(parsed.data);
    }
  };

  const inputCls = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition";

  return (
    <>
      <div className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-900 text-lg">{initialData ? "Edit Product" : "Add New Product"}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{initialData ? "Update the product details below" : "Fill in the details to list a new product"}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-500"><X size={20} /></button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image {!initialData && <span className="text-red-500">*</span>}
            </label>
            
            {imagePreview ? (
              <div className="space-y-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 cursor-pointer group bg-gray-50 flex items-center justify-center">
                      <img src={imagePreview} alt="Preview" className="w-full max-h-56 object-contain" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-200 flex items-center justify-center">
                        <div className="bg-white/90 text-gray-800 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity transform scale-95 group-hover:scale-100">
                          <ZoomIn size={18} />
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl border-none bg-transparent shadow-none p-0 flex justify-center items-center">
                    <DialogTitle className="sr-only">Image Preview</DialogTitle>
                    <img src={imagePreview} alt="Preview" className="max-w-full max-h-[85vh] rounded-xl object-contain" />
                  </DialogContent>
                </Dialog>
                
                <div className="flex items-center gap-2">
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium text-sm transition"
                  >
                    <ImagePlus size={16} /> Change Image
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview("");
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="flex items-center justify-center p-2.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                    title="Remove Image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative cursor-pointer border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-gray-50 hover:border-blue-400 hover:bg-blue-50/30 transition flex flex-col items-center justify-center gap-2"
                style={{ minHeight: "140px" }}
              >
                <div className="p-3 bg-white rounded-full shadow-sm text-gray-400 mb-1">
                  <ImagePlus size={24} />
                </div>
                <span className="text-sm font-medium text-gray-700">Click to upload image</span>
                <span className="text-xs text-gray-400">PNG, JPG up to 2MB</span>
              </div>
            )}
            
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            {initialData?.image && !imageFile && !imagePreview && (
              <p className="text-xs text-amber-600 mt-2 font-medium">Original image was removed. Please upload a new one or cancel to keep the original.</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Title <span className="text-red-500">*</span></label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Nike Air Max 270" className={inputCls} />
          </div>

          {/* Price + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (₦) <span className="text-red-500">*</span></label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value === "" ? "" : parseFloat(e.target.value))} placeholder="0" min={0} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category <span className="text-red-500">*</span></label>
              <Select value={category} onValueChange={(val) => setCategory(val as CategoryValue)}>
                <SelectTrigger className={inputCls + " w-full bg-white h-auto py-2.5"}>
                  <SelectValue placeholder="Select…" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Stock Quantity <span className="text-red-500">*</span></label>
              <input type="number" value={inventory} onChange={(e) => setInventory(e.target.value === "" ? "" : parseInt(e.target.value))} placeholder="0" min={0} className={inputCls} />
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300" />
                <span className="text-sm font-medium text-gray-700">Is Available</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description <span className="text-red-500">*</span></label>
            <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the product…" className={inputCls + " resize-none"} />
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition text-sm">Cancel</button>
          <button type="button" disabled={isSubmitting} onClick={handleSubmit as any} className="flex-1 py-3 rounded-xl bg-[var(--color-blue-primary)] text-white font-semibold hover:opacity-90 disabled:opacity-50 transition text-sm">
            {isSubmitting ? "Saving…" : initialData ? "Update Product" : "Add Product"}
          </button>
        </div>
      </div>
    </>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────
function ProductPage() {
  const { data: products, isLoading, isError, error, refetch } = useGetStoreProductsQuery();
  const productList: Product[] = (products?.data?.fetchedData ?? []).map((p: any) => ({
    _id: p._id, title: p.title, price: p.price, category: p.category,
    image: p.image?.imageUrl, description: p.description || "",
    inventory: p.inventory, isAvailable: p.isAvailable ?? true,
  }));

  const [view, setView] = useState<"grid" | "list">("list");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = productList;
    if (filterCategory !== "All") {
      result = result.filter(p => p.category === filterCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return result;
  }, [productList, search, filterCategory]);

  const totalValue = productList.reduce((sum, p) => sum + p.price, 0);

  const createMutation = useCreateProductMutation({
    onSuccess: () => { toast.success("Product added!"); refetch(); setDrawerOpen(false); },
    onError: (err) => toast.error(err.message),
  });
  const updateMutation = useUpdateProductMutation({
    onSuccess: () => { toast.success("Product updated!"); refetch(); setDrawerOpen(false); setEditingProduct(null); },
    onError: (err) => toast.error(err.message),
  });
  const deleteMutation = useDeleteProductMutation({
    onSuccess: () => { toast.success("Product deleted."); refetch(); setDeletingId(null); },
    onError: (err) => { toast.error(err.message); setDeletingId(null); },
  });

  const openAdd = () => { setEditingProduct(null); setDrawerOpen(true); };
  const openEdit = (p: Product) => { setEditingProduct(p); setDrawerOpen(true); };
  const closeDrawer = () => { setDrawerOpen(false); setEditingProduct(null); };

  const handleSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct._id, data: data as z.infer<typeof updateProductSchema> });
    } else {
      createMutation.mutate(data as z.infer<typeof createProductSchema>);
    }
  };
  const handleDelete = (id: string) => { setDeletingId(id); deleteMutation.mutate(id); };

  return (
    <div className="p-5 md:p-8 min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Products</h1>
          {!isLoading && (
            <p className="text-sm text-gray-500 mt-1.5 font-medium flex items-center gap-2">
              <span className="bg-white border border-gray-200 px-2.5 py-1 rounded-full">{productList.length} listed</span>
              <span className="bg-[var(--color-blue-primary)]/10 text-[var(--color-blue-primary)] border border-blue-200/50 px-2.5 py-1 rounded-full">₦{totalValue.toLocaleString()} inventory value</span>
            </p>
          )}
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-3 bg-[var(--color-blue-primary)] text-white rounded-xl font-semibold text-sm hover:opacity-90 transition shadow-lg shadow-blue-500/25 active:scale-[0.98]">
          <Plus size={18} strokeWidth={2.5} /> Add Product
        </button>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 bg-white p-2 rounded-2xl border border-gray-200/60 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-full bg-transparent border-none pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-0 placeholder:text-gray-400 text-gray-700"
          />
        </div>
        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-gray-100"></div>
        {/* Category filter */}
        <div className="relative w-full sm:w-56 flex-shrink-0">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full bg-gray-50 border-transparent hover:bg-gray-100 transition-colors h-auto py-2 focus:ring-0">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-gray-500" />
                <SelectValue placeholder="All Categories" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {productCategories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* View toggle */}
        <div className="flex items-center bg-gray-50 rounded-xl p-1 gap-0.5 flex-shrink-0 self-end sm:self-auto border border-gray-100">
          <button
            onClick={() => setView("list")}
            className={`p-1.5 rounded-lg transition-all duration-200 ${view === "list" ? "bg-white shadow-sm text-[var(--color-blue-primary)]" : "text-gray-400 hover:text-gray-600 hover:bg-gray-200/50"}`}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setView("grid")}
            className={`p-1.5 rounded-lg transition-all duration-200 ${view === "grid" ? "bg-white shadow-sm text-[var(--color-blue-primary)]" : "text-gray-400 hover:text-gray-600 hover:bg-gray-200/50"}`}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {/* ── Loading ── */}
      {isLoading && (
        view === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonGrid key={i} />)}
          </div>
        ) : (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonList key={i} />)}
          </div>
        )
      )}

      {/* ── Error ── */}
      {isError && <div className="text-center py-16 text-red-500 text-sm">{error?.message ?? "Failed to load products."}</div>}

      {/* ── Empty ── */}
      {!isLoading && !isError && productList.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
            <PackageOpen size={28} className="text-[var(--color-blue-primary)]" />
          </div>
          <h3 className="font-semibold text-gray-800 text-lg">No products yet</h3>
          <p className="text-gray-400 text-sm mt-1 mb-6">Add your first product to start selling.</p>
          <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-blue-primary)] text-white rounded-xl font-semibold text-sm hover:opacity-90 transition">
            <Plus size={15} /> Add your first product
          </button>
        </div>
      )}

      {/* ── No search results ── */}
      {!isLoading && !isError && productList.length > 0 && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search size={28} className="text-gray-300 mb-3" />
          <p className="font-semibold text-gray-600">No results found.</p>
          <button onClick={() => { setSearch(""); setFilterCategory("All"); }} className="text-sm text-[var(--color-blue-primary)] mt-2 hover:opacity-80 transition">Clear filters</button>
        </div>
      )}

      {/* ── Grid view ── */}
      {!isLoading && !isError && filtered.length > 0 && view === "grid" && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <GridCard key={p._id} product={p} onEdit={openEdit} onDelete={handleDelete} isDeleting={deletingId === p._id} onZoom={setLightboxSrc} />
          ))}
        </div>
      )}

      {/* ── List view ── */}
      {!isLoading && !isError && filtered.length > 0 && view === "list" && (
        <div className="space-y-2.5">
          {filtered.map((p) => (
            <ListRow key={p._id} product={p} onEdit={openEdit} onDelete={handleDelete} isDeleting={deletingId === p._id} onZoom={setLightboxSrc} />
          ))}
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightboxSrc && <ImageLightbox src={lightboxSrc} alt="Product" onClose={() => setLightboxSrc(null)} />}

      {/* ── Drawer ── */}
      <ProductFormDrawer
        isOpen={drawerOpen}
        onClose={closeDrawer}
        onSubmit={handleSubmit}
        initialData={editingProduct}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}

export default ProductPage;
