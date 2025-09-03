"use client";

import { useCart } from "@/Context/CartContext";
import { useWishlist } from "@/Context/WishlistContext";
import { IProduct } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { successAlert } from "@/lib/alert";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // Check if product already in wishlist
  const isWishlisted = useMemo(
    () => wishlist.some((p) => p._id === product._id),
    [wishlist, product._id]
  );

  const handleWishlistToggle = async () => {
    if (isWishlisted) {
      await removeFromWishlist(product._id);
      successAlert("Removed from your wishlist!");
    } else {
      await addToWishlist(product._id);
      successAlert("Added to your wishlist!");
    }
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
      {/* Product Image */}
      <div className="relative w-full h-40 lg:h-60 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Hover Action Buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
          {/* Eye Icon -> Product Details */}
          <Link
            href={`/all-plants/${product._id}`}
            className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
          >
            <Eye size={20} className="text-gray-700" />
          </Link>

          {/* Heart Icon -> Wishlist */}
          <button
            className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer"
            onClick={handleWishlistToggle}
          >
            <Heart
              size={20}
              className="text-red-500"
              fill={isWishlisted ? "red" : "none"}
            />
          </button>

          {/* Cart Icon -> Add to Cart */}
          <button
            className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer"
            onClick={() => {
              addToCart(product._id);
            }}
          >
            <ShoppingCart size={20} className="text-green-600" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-2">
        <h3 className="text-base lg:text-lg font-semibold text-textClr truncate group-hover:text-primaryGreen">
          <Link href={`/all-plants/${product._id}`}>{product.title}</Link>
        </h3>
        <p className="text-xs lg:text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-base lg:text-lg font-bold text-primary">
            {product.discountPrice} BDT
          </span>
          {product.price && (
            <span className="text-xs lg:text-sm text-gray-400 line-through">
              {product.price} BDT
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
