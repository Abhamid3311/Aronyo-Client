"use client";

import { useAxios } from "@/hooks/use-axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Use your existing interfaces
import { IProduct, CartItem, ICart } from "@/lib/types";

interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  refreshCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string | IProduct) => Promise<void>;
  updateQuantity: (
    productId: string | IProduct,
    quantity: number
  ) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { get, post, delete: del, put } = useAxios();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function to extract productId from either string or IProduct object
  const getProductId = (productId: string | IProduct): string => {
    return typeof productId === "string" ? productId : productId._id;
  };

  // ✅ Fetch cart from database
  const refreshCart = async () => {
    try {
      setLoading(true);
      const response = await get<ICart>("/cart");

      // Based on your console.log, the response directly contains the items array
      if (response.data?.data.items) {
        console.log("Cart items:", response.data);
        setCart(response.data.data.items);
      } else {
        console.warn("No items found in cart response:", response);
        setCart([]);
      }
    } catch (err) {
      console.error("❌ Failed to fetch cart:", err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  // ➕ Add to cart (Optimistic update)
  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      // First, make the API call
      await post("/cart/add", { productId, quantity });

      // Then refresh the cart to get updated data with populated product
      await refreshCart();
    } catch (err) {
      console.error("❌ Add to cart failed:", err);
      // You might want to show a toast notification here
      throw err; // Re-throw to let the calling component handle the error
    }
  };

  // ❌ Remove from cart (Optimistic update)
  const removeFromCart = async (productId: string | IProduct) => {
    const id = getProductId(productId);

    // Optimistic update
    const previousCart = [...cart];
    setCart((prev) =>
      prev.filter((item) => getProductId(item.productId) !== id)
    );

    try {
      await del(`/cart/${id}`);
      // Refresh to ensure consistency
      await refreshCart();
    } catch (err) {
      console.error("❌ Remove from cart failed:", err);
      // Rollback on error
      setCart(previousCart);
      throw err;
    }
  };

  // 🔄 Update quantity (Optimistic update)
  const updateQuantity = async (
    productId: string | IProduct,
    quantity: number
  ) => {
    const id = getProductId(productId);

    // If quantity is 0 or less, remove the item
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }

    // Optimistic update
    const previousCart = [...cart];
    setCart((prev) =>
      prev.map((item) =>
        getProductId(item.productId) === id ? { ...item, quantity } : item
      )
    );

    try {
      await put(`/cart/${id}`, { quantity });
      // Refresh to ensure consistency
      await refreshCart();
    } catch (err) {
      console.error("❌ Update quantity failed:", err);
      // Rollback on error
      setCart(previousCart);
      throw err;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        refreshCart,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
