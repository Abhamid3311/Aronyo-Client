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

  // Refs for debouncing quantity updates
  const quantityTimers = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const getProductId = (productId: string | IProduct): string => {
    return typeof productId === "string" ? productId : productId._id;
  };

  // Initial cart fetch
  const refreshCart = async () => {
    try {
      setLoading(true);
      const res = await get<ICart>("/cart");
      if (res.data?.data.items) setCart(res.data.data.items);
      else setCart([]);
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

  // Optimistic Add to Cart
  const addToCart = async (productId: string, quantity: number = 1) => {
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
      await refreshCart();
    } catch (err) {
      setCart(previousCart); // rollback
      console.error("❌ Add to cart failed:", err);
    }
  };

  // Optimistic Remove
  const removeFromCart = async (productId: string | IProduct) => {
    const id = getProductId(productId);
    const previousCart = [...cart];

    setCart((prev) =>
      prev.filter((item) => getProductId(item.productId) !== id)
    );

    try {
      await del("/cart/remove", { data: { productId: id } });
    } catch (err) {
      setCart(previousCart); // rollback
      console.error("❌ Remove from cart failed:", err);
    }
  };

  // Optimistic Quantity Update with Debounce
  const updateQuantity = (productId: string | IProduct, quantity: number) => {
    const id = getProductId(productId);

    // Immediate local update
    setCart((prev) =>
      prev.map((item) =>
        getProductId(item.productId) === id ? { ...item, quantity } : item
      )
    );

    // If quantity <= 0, remove the item immediately
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    // Clear previous timer
    if (quantityTimers.current[id]) clearTimeout(quantityTimers.current[id]);

    // Debounce API call by 300ms
    quantityTimers.current[id] = setTimeout(async () => {
      try {
        await put("/cart/update", { productId: id, quantity });
      } catch (err) {
        console.error("❌ Update quantity failed:", err);
        // Optionally, refetch cart or rollback
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
