"use client";

import { useAxios } from "@/hooks/use-axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { IProduct, CartItem, ICart } from "@/lib/types";
import { errorAlert, successAlert } from "@/lib/alert";
import { useAuth } from "./AuthContext";

interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string | IProduct) => Promise<void>;
  updateQuantity: (productId: string | IProduct, quantity: number) => void;
  clearCart: () => Promise<void>; // ✅ new
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { get, post, delete: del, put } = useAxios();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, loading: authLoading } = useAuth();
  const quantityTimers = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const getProductId = (productId: string | IProduct): string =>
    typeof productId === "string" ? productId : productId._id!;

  // Refresh Cart
  const refreshCart = async () => {
    if (!isAuthenticated) {
      setCart([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await get<ICart>("/cart");
      if (res.data?.data.items) setCart(res.data?.data.items);
      else setCart([]);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      refreshCart();
    } else if (!authLoading && !isAuthenticated) {
      setCart([]);
      setLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  // Add to Cart
  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!isAuthenticated) {
      errorAlert("Please log in to add items to your cart!");
      return;
    }

    const previousCart = [...cart];
    const id = getProductId(productId);

    const existingItem = cart.find(
      (item) => getProductId(item.productId) === id
    );

    if (existingItem) {
      setCart((prev) =>
        prev.map((item) =>
          getProductId(item.productId) === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart((prev) => [
        ...prev,
        { productId: { _id: id }, quantity } as CartItem,
      ]);
    }

    try {
      await post("/cart/add", { productId: id, quantity });
      successAlert("Item added to your cart!");
      await refreshCart();
    } catch (err) {
      setCart(previousCart); // rollback
      console.error("❌ Add to cart failed:", err);
      errorAlert("Item add failed!");
    }
  };

  // Remove
  const removeFromCart = async (productId: string | IProduct) => {
    if (!isAuthenticated) {
      errorAlert("Please log in to remove items from your cart!");
      return;
    }

    const id = getProductId(productId);
    const previousCart = [...cart];

    setCart((prev) =>
      prev.filter((item) => getProductId(item.productId) !== id)
    );

    try {
      await del("/cart/remove", { data: { productId: id } });
      successAlert("Item removed!");
    } catch (err) {
      setCart(previousCart); // rollback
      console.error("❌ Remove from cart failed:", err);
      errorAlert("Item remove failed!");
    }
  };

  // Update Quantity (debounced)
  const updateQuantity = (productId: string | IProduct, quantity: number) => {
    if (!isAuthenticated) {
      errorAlert("Please log in to update cart!");
      return;
    }

    const id = getProductId(productId);

    setCart((prev) =>
      prev.map((item) =>
        getProductId(item.productId) === id ? { ...item, quantity } : item
      )
    );

    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    if (quantityTimers.current[id]) clearTimeout(quantityTimers.current[id]);

    quantityTimers.current[id] = setTimeout(async () => {
      try {
        await put("/cart/update", { productId: id, quantity });
      } catch (err) {
        console.error("❌ Update quantity failed:", err);
        refreshCart();
      }
    }, 300);
  };

  // ✅ Clear Cart
  const clearCart = async () => {
    if (!isAuthenticated) {
      errorAlert("Please log in to clear your cart!");
      return;
    }

    const previousCart = [...cart];
    setCart([]);

    try {
      await del("/cart/clear-cart");
      // successAlert("Cart cleared!");
    } catch (err) {
      setCart(previousCart); // rollback
      console.error("❌ Clear cart failed:", err);
      // errorAlert("Failed to clear cart!");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart, // ✅ exposed
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
