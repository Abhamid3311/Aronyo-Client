"use client";

import Link from "next/link";
import { useWishlist } from "@/Context/WishlistContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Loader2 } from "lucide-react";
import Image from "next/image";

export default function WishlistPage() {
  const { wishlist, loading, removeFromWishlist } = useWishlist();

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <Card key={product._id} className="flex flex-col">
            <CardHeader>
              <Image
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
              <CardTitle className="mt-2 text-lg">{product.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 flex-grow justify-between">
              <p className="text-green-600 font-semibold">
                ৳{product.discountPrice ? product.discountPrice : product.price}
              </p>
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => removeFromWishlist(product._id)}
                >
                  Remove
                </Button>
                <Link href={`/products/${product._id}`} className="flex-1">
                  <Button className="w-full">View</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
