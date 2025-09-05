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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { get, post, delete: del, put } = useAxios();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, loading: authLoading } = useAuth();

  const quantityTimers = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const getProductId = (productId: string | IProduct): string => {
    return typeof productId === "string" ? productId : productId._id;
  };

  // ✅ Only fetch cart when user is authenticated
  const refreshCart = async () => {
    if (!isAuthenticated) {
      setCart([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await get<ICart>("/cart");
      if (res.data?.data.items) setCart(res.data.data.items);
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
      // User not logged in → clear cart
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

  // Quantity Update with Debounce
  const updateQuantity = (productId: string | IProduct, quantity: number) => {
    if (!isAuthenticated) {
      errorAlert("Please log in to update cart!");
      return;
    }

    const id = getProductId(productId);

    // Immediate local update
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

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
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
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
