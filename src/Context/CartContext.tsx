"use client";

import { useAxios } from "@/hooks/use-axios";
import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { post, del, put } = useAxios();

  // ✅ Add to Cart
  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      await post("/cart/add", { productId, quantity }); // headers auto added
      setCart((prev) => {
        const existing = prev.find((item) => item.productId === productId);
        if (existing) {
          return prev.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { productId, quantity }];
      });

      // ✅ Basic alert instead of toast
      alert("Product added to cart!");
    } catch (error) {
      console.error("Add to cart failed", error);
      alert("Failed to add product to cart!");
    }
  };

  // ✅ Remove from Cart
  const removeFromCart = async (productId: string) => {
    try {
      await del(`/cart/${productId}`);
      setCart((prev) => prev.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error("Remove from cart failed", error);
    }
  };

  // ✅ Update Quantity
  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      await put(`/cart/${productId}`, { quantity });
      setCart((prev) =>
        prev.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Update quantity failed", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
