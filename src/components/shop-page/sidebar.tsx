// components/shop-page/sidebar.tsx
"use client";
import { X } from "lucide-react";

type Store = {
  _id: string;
  name: string;
  address: string;
  bio: string;
  avatar: { imageUrl: string };
};

type Category = {
  name: string;
  value: string;
};

interface ShopSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  store?: Store;
  categories: Category[];
  selectedCategory?: string;
  onSelectCategory: (category?: string) => void;
}

export const ShopSideBar = ({
  isOpen,
  onClose,
  store,
  categories,
  selectedCategory,
  onSelectCategory,
}: ShopSideBarProps) => {
  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      onSelectCategory(undefined);
    } else {
      onSelectCategory(category);
    }
  };

  const handleAllProductsClick = () => {
    onSelectCategory(undefined); // This will clear the category filter
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 bg-white h-full p-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:flex-shrink-0 transition-transform duration-300 ease-in-out z-50 md:z-auto border-r border-gray-200`}
      >
        <div className="flex justify-between items-center md:hidden mb-6">
          <h2 className="text-lg font-bold">Store Info</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {store && (
          <div className="flex flex-col items-center text-center mb-8">
            <img
              src={
                store.avatar?.imageUrl
                  ? store.avatar.imageUrl
                  : "/default-avatar.png"
              }
              alt={`${store.name} logo`}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 mb-4"
            />
            <h1 className="text-xl font-bold text-gray-900">{store.name}</h1>
            <p className="text-sm text-gray-600 mt-1">{store.address}</p>
            <p className="text-sm text-gray-500 mt-2">{store.bio}</p>
          </div>
        )}

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Categories
          </h3>
          <ul className="space-y-0.5 pr-1 overflow-y-auto">
            <li>
              <button
                onClick={handleAllProductsClick}
                className={`w-full text-left p-2  text-xs md:text-base rounded-md transition-colors uppercase ${
                  !selectedCategory
                    ? "bg-blue-primary text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                All Products
              </button>
            </li>
            {categories.map((category) => (
              <li key={category.value}>
                <button
                  onClick={() => handleCategoryClick(category.value)}
                  className={`w-full text-left text-xs md:text-base p-2 rounded-md transition-colors uppercase ${
                    selectedCategory === category.value
                      ? "bg-blue-primary text-white font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};
