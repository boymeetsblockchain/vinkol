interface CartItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  quantity: number;
}
export const getCartFromStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

export const saveCartToStorage = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};
