"use client"; // Make this a client component

import React, { useMemo } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/Context/WishlistContext";
import { errorAlert, successAlert } from "@/lib/alert";

interface WishlistActionProps {
  product: { _id: string }; // Adjust type according to your IProduct interface
}

const WishlistAction: React.FC<WishlistActionProps> = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // Check if product is already in wishlist
  const isWishlisted = useMemo(
    () => wishlist.some((p) => p._id === product._id),
    [wishlist, product._id]
  );

  const handleWishlistToggle = async () => {
    try {
      if (isWishlisted) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
    } catch (err) {
      console.error("Wishlist action failed:", err);
      errorAlert("Added to your wishlist failed!");
    }
  };

  return (
    <button
      onClick={handleWishlistToggle}
      className={`p-2 rounded-lg border-2 ${
        isWishlisted
          ? "border-red-500 text-red-500"
          : "border-gray-300 hover:border-red-500 hover:text-red-500"
      }`}
    >
      <Heart className="w-5 h-5" fill={isWishlisted ? "red" : "none"} />
    </button>
  );
};

export default WishlistAction;
