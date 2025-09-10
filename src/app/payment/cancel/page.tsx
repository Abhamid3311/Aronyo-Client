"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-yellow-600" />
          </div>
          <CardTitle className="text-2xl text-yellow-600">
            Payment Cancelled
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            You have cancelled the payment process. Your order has been
            cancelled and no charges have been made.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 text-yellow-700 mb-2">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Don&apos;t worry!</span>
            </div>
            <p className="text-sm text-yellow-600">
              Your items are still in your cart. You can complete your purchase
              anytime.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Link href="/checkout" className="block">
              <Button className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Checkout
              </Button>
            </Link>

            <Link href="/cart" className="block">
              <Button variant="outline" className="w-full">
                <ShoppingCart className="w-4 h-4 mr-2" />
                View Cart
              </Button>
            </Link>

            <Link href="/all-plants" className="block">
              <Button variant="ghost" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
