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
import { useAuth } from "./AuthContext";
import { errorAlert, successAlert } from "@/lib/alert";

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
  const { get, post } = useAxios();
  const [wishlist, setWishlist] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, loading: authLoading } = useAuth();

  // ✅ Fetch wishlist only when logged in
  const refreshWishlist = async () => {
    if (!isAuthenticated) {
      setWishlist([]);
      setLoading(false);
      return;
    }

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
    if (!authLoading && isAuthenticated) {
      refreshWishlist();
    } else if (!authLoading && !isAuthenticated) {
      setWishlist([]);
      setLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  // Add product
  const addToWishlist = async (productId: string) => {
    if (!isAuthenticated) {
      errorAlert("Please log in to add items to your wishlist!");
      return;
    }

    try {
      await post("/wishlist/add", { productId });
      successAlert("Added to wishlist!");
      await refreshWishlist();
    } catch (err) {
      console.error("❌ Add to wishlist failed:", err);
      errorAlert("Failed to add item!");
    }
  };

  // Remove product
  const removeFromWishlist = async (productId: string) => {
    if (!isAuthenticated) {
      errorAlert("Please log in to remove items from your wishlist!");
      return;
    }

    try {
      await post("/wishlist/remove", { productId });
      setWishlist((prev) => prev.filter((p) => p._id !== productId));
      successAlert("Removed from wishlist!");
    } catch (err) {
      console.error("❌ Remove from wishlist failed:", err);
      errorAlert("Failed to remove item!");
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
