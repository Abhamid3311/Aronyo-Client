"use client";

import { useAxios } from "@/hooks/use-axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { IProduct } from "@/lib/types";

interface WishlistContextType {
  wishlist: IProduct[];
  loading: boolean;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { get, post, delete: del } = useAxios();
  const [wishlist, setWishlist] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist from backend
  const refreshWishlist = async () => {
    try {
      setLoading(true);
      const res = await get<{ data: { products: IProduct[] } }>("/wishlist");
      if (res.data?.data?.products) {
        setWishlist(res.data.data.products);
      } else {
        setWishlist([]);
      }
    } catch (err) {
      console.error("❌ Failed to fetch wishlist:", err);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshWishlist();
  }, []);

  // Add product to wishlist
  const addToWishlist = async (productId: string) => {
    try {
      await post("/wishlist/add", { productId });
      await refreshWishlist();
    } catch (err) {
      console.error("❌ Add to wishlist failed:", err);
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (productId: string) => {
    try {
      await post("/wishlist/remove", { productId });
      setWishlist((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("❌ Remove from wishlist failed:", err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used inside WishlistProvider");
  return context;
};
