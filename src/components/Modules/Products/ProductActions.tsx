"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "@/Context/CartContext";
import { IProduct } from "@/lib/types";
import Link from "next/link";

interface ProductActionsProps {
  product: IProduct;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const { addToCart, buyNow } = useCart();
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    if (quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product._id!, quantity);
    setQuantity(1);
  };

  const handleBuyNow = () => {
    buyNow(product._id!, quantity);
    setQuantity(1);
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <span className="font-medium">Quantity:</span>
        <div className="flex items-center border rounded-lg">
          <button
            onClick={decrease}
            className="p-2 hover:bg-gray-100 disabled:opacity-50"
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 font-medium">{quantity}</span>
          <button
            onClick={increase}
            className="p-2 hover:bg-gray-100 disabled:opacity-50"
            disabled={quantity >= product.stock}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-primaryGreen text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 cursor-pointer"
        >
          Buy Now
        </button>

        <button
          onClick={handleAddToCart}
          className="flex-1 border-2 border-green-600 text-green-600 py-3 px-6 rounded-lg font-medium hover:bg-green-50 flex items-center justify-center space-x-2 cursor-pointer"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
