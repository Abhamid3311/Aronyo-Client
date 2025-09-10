"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear cart from localStorage or state management
    // This ensures the cart is cleared after successful payment
    if (typeof window !== "undefined") {
      // Clear any cached cart data
      localStorage.removeItem("cart");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">
            Payment Successful!
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Thank you for your order! Your payment has been processed
            successfully.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <Package className="w-5 h-5" />
              <span className="font-medium">Order Confirmed</span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              You will receive an order confirmation shortly.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Link href="/dashboard" className="block">
              <Button className="w-full">
                View My Orders
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link href="/all-plants" className="block">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
