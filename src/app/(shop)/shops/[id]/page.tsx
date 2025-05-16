"use client";
import { ShopHeader } from "@/components/shop-page/header";
import { CartModal } from "@/components/modals/cartmodal";
import { useState } from "react";

const productArray = [
  {
    name: "Banana",
    image: "/assets/banana.png",
    price: "₦23,000",
    desc: "Organic Banana 1 bunch",
  },
  {
    name: "Strawberry",
    image: "/assets/strawberry.png",
    price: "₦23,000",
    desc: "Organic Strawberry 1 pack of 6pcs",
  },
  {
    name: "Cucumber",
    image: "/assets/cucumber.png",
    price: "₦23,000",
    desc: "Organic Cucumber 3 pieces",
  },

  ...Array(9).fill({
    name: "Product",
    image: "/assets/strawberry.png",
    price: "₦20,000",
    desc: "Organic product description",
  }),
];

function ShopId() {
  const [openCartModal, setOpenCartModal] = useState<boolean>(false);
  return (
    <section className="min-h-screen bg-white">
      <ShopHeader isLogo={false} />

      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Category Title */}
        <h1 className="text-2xl md:text-3xl mt-4 md:mt-0 font-bold text-gray-900 mb-6">
          Fresh Produce
        </h1>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {productArray.map((data, index) => (
            <div
              key={index}
              className="bg-[#FAFAFA] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              {/* Product Image */}
              <div className="p-4 flex justify-center items-center h-40 bg-white">
                <img
                  src={data.image}
                  className="h-full w-full object-contain"
                  alt={data.name}
                />
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {data.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {data.desc}
                </p>
                <div className="mt-auto">
                  <p className="font-bold text-gray-900 mb-3">{data.price}</p>
                  <button
                    onClick={() => setOpenCartModal(true)}
                    className="w-full bg-blue-primary hover:bg-blue-700 text-white py-2 px-4 rounded-[4px] text-sm font-medium transition-colors duration-200"
                  >
                    + Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CartModal isOpen={openCartModal} onClose={() => {}} />
    </section>
  );
}

export default ShopId;
