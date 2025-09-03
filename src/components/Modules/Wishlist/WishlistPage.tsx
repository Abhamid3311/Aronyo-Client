"use client";

import Link from "next/link";
import { useWishlist } from "@/Context/WishlistContext";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import WishlistCard from "./WishlistCard";
import { useCart } from "@/Context/CartContext";
import { useAuth } from "@/Context/AuthContext";

export default function WishlistPage() {
  const { isAuthenticated } = useAuth();
  const { wishlist, loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="flex flex-col items-center gap-4 py-12">
          <Heart className="h-16 w-16 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">You&apos;re Not Logged in</h2>
          <p className="text-muted-foreground mb-4">
            Please login first for view Wishlist
          </p>
          <Link href="/login">
            <Button>Login </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your wishlist...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!wishlist.length) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="flex flex-col items-center gap-4 py-12">
          <Heart className="h-16 w-16 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-4">
            Save your favorite products to see them here
          </p>
          <Link href="/all-plants">
            <Button>Browse Plants</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="text-muted-foreground mt-1">
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"} in your
          wishlist
        </p>
      </div>

      <div className="">
        {wishlist.map((product) => (
          <WishlistCard
            key={product._id}
            product={product}
            addToCart={addToCart}
            removeFromWishlist={removeFromWishlist}
          />
        ))}
      </div>
    </div>
  );
}
