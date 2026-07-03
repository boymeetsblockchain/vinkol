// components/modals/cartmodal.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Trash2, ShoppingCart, Minus, Plus } from "lucide-react";

interface CartItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  quantity: number;
  inventory?: number;
}

interface CartModalProps {
  isOpen: boolean;
  shopId?: string;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  total: number;
}

export const CartModal = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  total,
  shopId,
}: CartModalProps) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleProceed = () => {
    router.push(`/shops/checkout/${shopId}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Slide-over panel */}
      <div className="relative w-full md:w-[450px] max-w-full bg-gray-50 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart size={22} className="text-[var(--color-blue-primary)]" />
            Your Cart
          </h1>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 pb-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                <ShoppingCart size={40} />
              </div>
              <p className="text-gray-500 font-medium text-lg">Your cart is empty.</p>
              <button
                onClick={onClose}
                className="bg-[var(--color-blue-primary)] text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 relative group hover:border-blue-100 transition-colors"
              >
                <div className="w-20 h-20 shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 p-0.5">
                  <img
                    src={item.imageUrl}
                    className="w-full h-full object-cover rounded-lg"
                    alt={item.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = "/assets/placeholder.png"; }}
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-gray-900 text-[15px] leading-tight line-clamp-2">{item.title}</h3>
                      <button
                        className="text-gray-300 hover:text-red-500 transition shrink-0"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-gray-400 text-[13px] mt-1 line-clamp-1">{item.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-end mt-3">
                    <div className="font-extrabold text-[var(--color-blue-primary)] text-base">
                      {formatPrice(item.price)}
                    </div>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 bg-gray-50 px-2 py-1.5 rounded-xl border border-gray-100 shadow-sm">
                      <button
                        className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 transition"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-bold text-sm w-4 text-center text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-[var(--color-blue-primary)] disabled:opacity-50 transition"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={item.inventory !== undefined && item.quantity >= item.inventory}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer (Sticky Checkout) */}
        {cartItems.length > 0 && (
          <div className="bg-white border-t border-gray-100 p-6 shrink-0 shadow-[0_-10px_40px_rgb(0,0,0,0.04)] z-10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-xl font-extrabold text-gray-900">
                {formatPrice(total)}
              </span>
            </div>
            <button
              className="w-full bg-[var(--color-blue-primary)] hover:bg-blue-700 text-white py-4 rounded-xl text-base font-bold transition flex justify-between items-center px-6"
              onClick={handleProceed}
            >
              <span>Checkout</span>
              <span className="bg-white/20 px-2.5 py-1 rounded-lg text-sm">{formatPrice(total)}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
