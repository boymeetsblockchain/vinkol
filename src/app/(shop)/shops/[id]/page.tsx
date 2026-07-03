// app/shop/[id]/page.tsx

"use client";
import { ShopHeader } from "@/components/shop-page/header";
import { CartModal } from "@/components/modals/cartmodal";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetSingleStore } from "@/services/shops/query";
import { useGetAllProductsQuery } from "@/services/products/query";
import { ShopSideBar } from "@/components/shop-page/sidebar";
import {
  Menu,
  ShoppingCart,
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  Plus,
  Search,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { getCartFromStorage, saveCartToStorage } from "@/config/storage";
import { ContactModal } from "@/components/modals/contactmodal";
import { toast } from "sonner";
import Link from "next/link";
import { productCategories } from "@/lib/constants";

type CartItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  quantity: number;
  inventory?: number;
};
function ShopIdPage() {
  const [openCartModal, setOpenCartModal] = useState<boolean>(false);
  const [isFullscreenImageOpen, setIsFullscreenImageOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const router = useRouter();

  // const [openContactModal, setOpenContactModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  // const handleCloseContactModal = () => {
  //   setOpenContactModal(false);
  // };

  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    getCartFromStorage(),
  );

  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  const params = useParams();
  const id = params.id as string;

  // Fetch the store details
  const { data: store, isLoading: isStoreLoading } = useGetSingleStore(id);
  const { data: productsData, isLoading: areProductsLoading } =
    useGetAllProductsQuery(undefined, {
      store: id,
      category: selectedCategory,
    });

  const products = productsData?.data.fetchedData || [];

  // Extract slugs
  const productCategorySlugs = new Set(products.flatMap((p) => p.category));

  // Filter categories
  const filteredCategories = productCategories.filter((cat) =>
    productCategorySlugs.has(cat.value),
  );

  const handleAddToCart = (product: any) => {
    toast.success("added to cart");
    setCartItems((prevItems) => {
      // Check if product already exists in cart
      const existingItem = prevItems.find((item) => item.id === product._id);

      if (existingItem) {
        // Increase quantity if exists, limited by inventory
        return prevItems.map((item) =>
          item.id === product._id
            ? {
                ...item,
                quantity:
                  item.inventory !== undefined
                    ? Math.min(item.quantity + 1, item.inventory)
                    : item.quantity + 1,
              }
            : item,
        );
      } else {
        // Add new item to cart
        return [
          ...prevItems,
          {
            id: product._id,
            title: product.title,
            imageUrl: product.image?.imageUrl || "/assets/placeholder.png",
            price: product.price,
            description: product.description || "No description",
            quantity: 1,
            inventory: product.inventory,
          },
        ];
      }
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleSelectCategory = (category?: string) => {
    setSelectedCategory(category);
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  type CategoryValue = (typeof productCategories)[number]["value"];

  const getCategoryName = (value: CategoryValue): string => {
    const category = productCategories.find((c) => c.value === value);
    return category?.name ?? value;
  };

  if (isStoreLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading Store...
      </div>
    );
  }

  if (!store && !isStoreLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Store not found</p>
        <Link href="/shops" className="underline mt-4">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col relative pb-20">
      {/* ── Floating Header (Glovo/Chowdeck style) ── */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent pointer-events-none transition-all">
        <button
          onClick={() => router.back()}
          className="pointer-events-auto w-10 h-10 bg-white/95 backdrop-blur-md rounded-full shadow-md text-gray-800 flex items-center justify-center hover:scale-105 transition active:scale-95"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-3 pointer-events-auto">
          {/* <button onClick={() => setIsSidebarOpen(true)} className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-full shadow-md text-gray-800 flex items-center justify-center hover:scale-105 transition active:scale-95">
            <Menu size={18} />
          </button> */}
          <button
            onClick={() => setOpenCartModal(true)}
            className="relative w-10 h-10 bg-white/95 backdrop-blur-md rounded-full shadow-md text-gray-800 flex items-center justify-center hover:scale-105 transition active:scale-95"
          >
            <ShoppingCart size={18} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-green-600 text-white text-[11px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ShopSideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          store={store?.data?.store}
          categories={filteredCategories ?? productCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        <main className="flex-1 overflow-y-auto bg-[#F9FAFB]">
          {/* ── Hero Banner ── */}
          <div
            className="relative h-56 md:h-72 w-full bg-gray-900 cursor-pointer group"
            onClick={() => setIsFullscreenImageOpen(true)}
          >
            <img
              src={
                store?.data?.store?.avatar?.imageUrl ||
                "/assets/placeholder.png"
              }
              className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-300"
              alt={store?.data?.store?.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F9FAFB] via-[#F9FAFB]/20 to-transparent pointer-events-none"></div>
          </div>

          {/* ── Store Info Card ── */}
          <div className="relative z-10 px-4 md:px-8 -mt-20">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-5 md:p-8">
              <div className="flex flex-col md:flex-row gap-4 md:items-end md:justify-between">
                <div>
                  <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                    {store?.data?.store?.name}
                  </h1>
                  <p className="text-gray-500 mt-1.5 flex items-center gap-1.5 text-sm md:text-base font-medium">
                    <MapPin size={16} className="text-gray-400" />
                    {store?.data?.store?.address}
                  </p>
                </div>
                {/* Badges */}
                <div className="flex gap-2">
                  <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1 border border-green-100 shadow-sm">
                    <Star size={13} className="fill-green-700" /> 4.8 Excellent
                  </div>
                  <div className="bg-gray-50 text-gray-700 px-3 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1 border border-gray-100 shadow-sm">
                    <Clock size={13} /> 20-35 min
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Sticky Categories Scroll ── */}
          <div className="sticky top-0 z-30 bg-[#F9FAFB]/95 backdrop-blur-xl py-3 md:py-4 px-4 md:px-8 mt-4 md:mt-8 border-b border-gray-100/50">
            <div className="flex items-center gap-2 md:gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <button
                onClick={() => handleSelectCategory(undefined)}
                className={`flex-shrink-0 px-6 py-2.5 rounded-full text-[15px] font-semibold transition-all duration-200 ${!selectedCategory ? "bg-[var(--color-blue-primary)] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200/80"}`}
              >
                All Products
              </button>
              {filteredCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleSelectCategory(cat.value)}
                  className={`flex-shrink-0 px-6 py-2.5 rounded-full text-[15px] font-semibold transition-all duration-200 ${selectedCategory === cat.value ? "bg-[var(--color-blue-primary)] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200/80"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* ── Product Grid ── */}
          <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto">
            {areProductsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-4 h-36 animate-pulse border border-gray-100 flex gap-4"
                  >
                    <div className="flex-1 space-y-3 py-2">
                      <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-100 rounded w-full"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </div>
                    <div className="w-28 h-28 bg-gray-100 rounded-xl"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-6 px-1">
                  {selectedCategory
                    ? getCategoryName(selectedCategory)
                    : "Popular items"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-2xl p-4 flex gap-4 border border-gray-100 hover:border-blue-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <div className="flex-1 min-w-0 flex flex-col">
                        <h3 className="font-bold text-gray-900 text-[15px] leading-snug line-clamp-2 group-hover:text-[var(--color-blue-primary)] transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-gray-500 text-[13px] mt-1.5 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>

                        <div className="mt-auto pt-4 flex items-center justify-between">
                          <span className="font-extrabold text-gray-900 text-[15px]">
                            {new Intl.NumberFormat("en-NG", {
                              style: "currency",
                              currency: "NGN",
                              maximumFractionDigits: 0,
                            }).format(product.price)}
                          </span>
                          {!product.isAvailable || (product.inventory ?? 0) <= 0 ? (
                            <span className="text-red-500 font-bold text-[13px] bg-red-50 px-3 py-1.5 rounded-xl border border-red-100 shadow-sm shrink-0">
                              Out of stock
                            </span>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
                              className="bg-[var(--color-blue-primary)] text-white text-sm font-bold px-3 py-1.5 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm"
                            >
                              Add to cart
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="w-32 h-32 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden relative border border-gray-100">
                        {product.image?.imageUrl ? (
                          <img
                            src={product.image.imageUrl}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <ShoppingCart size={24} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {products.length === 0 && (
                  <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 mt-4 shadow-sm">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                      <Search size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      No products found
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {selectedCategory
                        ? `We couldn't find any products in ${getCategoryName(selectedCategory)}.`
                        : "This store hasn't added any products yet."}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* ── Product Details Modal ── */}
      <Dialog
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
      >
        {selectedProduct && (
          <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none rounded-2xl shadow-2xl bg-white">
            <div className="relative h-64 bg-gray-50 w-full">
              {selectedProduct.image?.imageUrl ? (
                <img
                  src={selectedProduct.image.imageUrl}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <ShoppingCart size={40} />
                </div>
              )}
              <DialogClose asChild>
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full shadow-md text-gray-800 flex items-center justify-center hover:scale-105 transition">
                  <X size={20} />
                </button>
              </DialogClose>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start gap-4 mb-4">
                <DialogTitle className="text-2xl font-bold text-gray-900 leading-tight">
                  {selectedProduct.title}
                </DialogTitle>
                <span className="font-extrabold text-[var(--color-blue-primary)] text-xl shrink-0">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                    maximumFractionDigits: 0,
                  }).format(selectedProduct.price)}
                </span>
              </div>
              <DialogDescription className="text-gray-600 text-[15px] leading-relaxed mb-8">
                {selectedProduct.description ||
                  "Fresh and delicious, order now."}
              </DialogDescription>
              {!selectedProduct.isAvailable ||
              selectedProduct.inventory <= 0 ? (
                <div className="w-full py-4 rounded-xl bg-red-50 text-red-500 font-bold text-lg flex items-center justify-center gap-2 border border-red-100">
                  Out of Stock
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-4 rounded-xl bg-[var(--color-blue-primary)] text-white font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} /> Add to Cart
                </button>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>

      <Dialog
        open={isFullscreenImageOpen}
        onOpenChange={setIsFullscreenImageOpen}
      >
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-black/95 border-none shadow-2xl flex items-center justify-center">
          <DialogTitle className="sr-only">Store Cover Image</DialogTitle>
          <div className="relative w-full h-[85vh] flex items-center justify-center p-2 md:p-6">
            <img
              src={
                store?.data?.store?.avatar?.imageUrl ||
                "/assets/placeholder.png"
              }
              alt={store?.data?.store?.name}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <DialogClose className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/10 hover:bg-white/25 rounded-full text-white transition-colors">
              <X size={20} />
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      <CartModal
        isOpen={openCartModal}
        onClose={() => setOpenCartModal(false)}
        shopId={id as string}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        total={total}
      />
    </section>
  );
}

export default ShopIdPage;
