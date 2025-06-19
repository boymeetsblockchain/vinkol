// app/shop/[id]/page.tsx

"use client";
import { ShopHeader } from "@/components/shop-page/header";
import { CartModal } from "@/components/modals/cartmodal";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useGetSingleStore } from "@/services/shops/query";
import { useGetAllProductsQuery } from "@/services/products/query";
import { ShopSideBar } from "@/components/shop-page/sidebar";
import { Menu, ShoppingCart } from "lucide-react";

// A static list of categories. In a real app, this might come from an API
const productCategories = [
  "Fresh Produce",
  "Bakery",
  "Dairy",
  "Meat",
  "Pantry",
  "Snacks",
  "Beverages",
];

function ShopIdPage() {
  const [openCartModal, setOpenCartModal] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  const params = useParams();
  const id = params.id as string;

  // Fetch the store details
  const { data: store, isLoading: isStoreLoading } = useGetSingleStore(id);

  // **THE FIX IS HERE**
  // Fetch products based on the store ID and the selected category.
  // The query will automatically re-run when `selectedCategory` changes.
  const { data: productsData, isLoading: areProductsLoading } =
    useGetAllProductsQuery(undefined, {
      store: id,
      category: selectedCategory,
    });

  const products = productsData?.data.fetchedData || [];
  console.log(productsData?.data.fetchedData || []);

  console.log();

  const handleSelectCategory = (category?: string) => {
    setSelectedCategory(category);
    // Close sidebar on mobile after selection
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
      {/* <ShopHeader isLogo={false} /> */}

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile hamburger menu button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden fixed top-5 left-4 z-30 p-2 bg-white rounded-full shadow"
        >
          <Menu size={24} />
        </button>

        {/* Sidebar */}
        <ShopSideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          store={store.data.store}
          categories={productCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {selectedCategory || "All Products"}
              </h1>
              <span className="text-gray-500">{products.length} items</span>
            </div>

            {/* Product Grid */}
            {areProductsLoading ? (
              <div className="text-center py-10">Loading products...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-[#FAFAFA] rounded-lg ..."
                  >
                    {/* ... (Your existing product card JSX) ... */}
                    <div className="p-4 flex justify-center items-center h-48 bg-white">
                      <img
                        src={
                          product.image?.imageUrl || "/assets/placeholder.png"
                        }
                        className="h-full w-full object-contain"
                        alt={product.description}
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-auto">
                        <p className="font-bold text-gray-900 mb-3">
                          {new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: "NGN",
                          }).format(product.price)}
                        </p>
                        <button
                          onClick={() => setOpenCartModal(true)}
                          className="w-full bg-blue-primary hover:bg-blue-700 text-white py-2 px-4 ..."
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
        onClose={() => setOpenCartModal(false)}
      />
    </section>
  );
}

export default ShopIdPage;
