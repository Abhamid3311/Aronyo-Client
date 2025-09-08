"use client";

import Link from "next/link";
import { useCart } from "@/Context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Loader2 } from "lucide-react";
import CartCard from "./CartCard";
import { useAuth } from "@/Context/AuthContext";

export default function CartPage() {
  const { cart, loading } = useCart();
  const { isAuthenticated } = useAuth();

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => {
    const itemPrice =
      Number(item.productId?.discountPrice) ||
      Number(item.productId?.price) ||
      0;
    return sum + itemPrice * item.quantity;
  }, 0);

  // console.log(cart);

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="flex flex-col items-center gap-4 py-12">
          <ShoppingCart className="h-16 w-16 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">You&apos;re Not Logged in</h2>
          <p className="text-muted-foreground mb-4">
            Please login first for view cart
          </p>
          <Link href="/login">
            <Button>Login </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (!cart.length) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="flex flex-col items-center gap-4 py-12">
          <ShoppingCart className="h-16 w-16 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-4">
            Add some items to get started
          </p>
          <Link href="/all-products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="text-muted-foreground mt-1">
          {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cart Items Section */}
        <div className="lg:col-span-8">
          <div className="space-y-4">
            {cart.map((item) => (
              <CartCard key={item._id} item={item} />
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-4">
          <div className="sticky top-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Items ({cart.length}):</span>
                    <span>৳{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                </div>

                <hr />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>৳{totalPrice.toFixed(2)}</span>
                </div>

                <Button className="w-full flex items-center justify-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Proceed to Checkout
                </Button>

                <Link href="/all-plants" className="block">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
