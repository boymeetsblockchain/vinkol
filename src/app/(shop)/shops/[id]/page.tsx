// app/shop/[id]/page.tsx

"use client";
import { ShopHeader } from "@/components/shop-page/header";
import { CartModal } from "@/components/modals/cartmodal";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGetSingleStore } from "@/services/shops/query";
import { useGetAllProductsQuery } from "@/services/products/query";
import { ShopSideBar } from "@/components/shop-page/sidebar";
import { Menu, ShoppingCart } from "lucide-react";
import { getCartFromStorage, saveCartToStorage } from "@/config/storage";
import { ContactModal } from "@/components/modals/contactmodal";

const productCategories = [
  { name: "fresh Produce", value: "fresh-produce" },
  { name: "dairy Products", value: "dairy-products" },
  { name: "bakery And Snacks", value: "bakery-and-snacks" },
  { name: "dry Food And Staples", value: "dry-food-and-staples" },
  { name: "breakfast And Beverages", value: "breakfast-and-beverages" },
  { name: "baby And Kids", value: "baby-and-kids" },
  { name: "personal Care", value: "personal-care" },
  { name: "household And Cleaning", value: "household-and-cleaning" },
  { name: "home Essentials", value: "home-essentials" },
];

type CartItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  quantity: number;
};
function ShopIdPage() {
  const [openCartModal, setOpenCartModal] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [openContactModal, setOpenContactModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  const handleCloseContactModal = () => {
    setOpenContactModal(false);
  };

  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    getCartFromStorage()
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

  const handleAddToCart = (product: any) => {
    setCartItems((prevItems) => {
      // Check if product already exists in cart
      const existingItem = prevItems.find((item) => item.id === product._id);

      if (existingItem) {
        // Increase quantity if exists
        return prevItems.map((item) =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
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
          },
        ];
      }
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 5000;
  const total = subtotal + deliveryFee;

  const handleSelectCategory = (category?: string) => {
    setSelectedCategory(category);
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  if (isStoreLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading Store...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white flex flex-col">
      <button
        onClick={() => setOpenCartModal(true)}
        className="fixed top-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg"
      >
        <ShoppingCart size={24} />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>
      <div className="flex flex-1 overflow-hidden">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden fixed top-5 left-4 z-30 p-2 bg-white rounded-full shadow"
        >
          <Menu size={24} />
        </button>

        <ShopSideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          store={store.data.store}
          categories={productCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {selectedCategory || "All Products"}
              </h1>
            </div>

            {areProductsLoading ? (
              <div className="text-center py-10">Loading products...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-100"
                  >
                    <div className="p-4 flex justify-center items-center h-48 bg-gray-50">
                      <img
                        src={
                          product.image?.imageUrl || "/assets/placeholder.png"
                        }
                        className="h-full w-auto max-w-full object-contain"
                        alt={product.description}
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-semibold text-gray-900 mb-1 text-lg truncate">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description
                          ? product.description
                          : "No Product description"}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-bold text-blue-primary text-base">
                          {new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: "NGN",
                          }).format(product.price)}
                        </span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex items-center gap-2 bg-blue-primary hover:bg-blue-700 transition-colors duration-200 text-white font-medium py-2 px-4 rounded-lg shadow-sm"
                        >
                          <ShoppingCart size={16} /> Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {products.length === 0 && !areProductsLoading && (
              <div className="text-center py-10 text-gray-500">
                No products found{" "}
                {selectedCategory
                  ? `in ${selectedCategory}`
                  : "in this store yet"}
                .
              </div>
            )}
          </div>
        </main>
      </div>
      <CartModal
        isOpen={openCartModal}
        onClose={() => {
          setOpenCartModal(false);
          setOpenContactModal(true); // Open contact modal immediately after closing cart modal
        }}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        total={total}
      />
      <ContactModal
        isOpen={openContactModal}
        onClose={handleCloseContactModal}
        cartItems={cartItems}
        subtotal={subtotal}
        total={total}
      />
    </section>
  );
}

export default ShopIdPage;
