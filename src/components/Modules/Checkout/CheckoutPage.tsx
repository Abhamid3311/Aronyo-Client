"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Truck,
  CreditCard,
  Package,
  ShoppingCart,
  Link,
  Loader2,
  Plus,
  Smartphone,
  Building,
} from "lucide-react";
import { useCart } from "@/Context/CartContext";
import { useAuth } from "@/Context/AuthContext";
import { useCreateOrder } from "@/hooks/useOrders";
import { errorAlert, successAlert } from "@/lib/alert";
import { checkoutSchema } from "@/lib/FormSchemas";
import Image from "next/image";

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cart, clearCart, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const createMutation = useCreateOrder();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      area: "",
      deliveryNotes: "",
      paymentMethod: "cod",
    },
  });

  const deliveryFee = 120; // Static Delivery Charge

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessingPayment(true);

    // Minimal payload
    const orderPayload = {
      shippingAddress: {
        name: data.fullName,
        phone: data.phone,
        city: data.city,
        area: data.area, 
        address: data.address,
        deliveryNotes: data.deliveryNotes,
      },
      deliveryCharge: deliveryFee,
      paymentMethod: data.paymentMethod,
    };

    createMutation.mutate(orderPayload, {
      onSuccess: (response) => {
        if (data.paymentMethod === "online" && response.paymentUrl) {
          // Redirect to SSL Commerce payment gateway
          window.location.href = response.paymentUrl;
        } else {
          // COD order success
          successAlert("Order placed successfully with Cash on Delivery!");
          clearCart();
          router.push("/dashboard/order-history");
          form.reset();
        }
        setIsProcessingPayment(false);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        setIsProcessingPayment(false);
        errorAlert(error?.message || "Failed to create order!");
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="flex flex-col items-center gap-4 py-12">
          <ShoppingCart className="h-16 w-16 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">You&apos;re Not Logged in</h2>
          <p className="text-muted-foreground mb-4">
            Please login first to view Checkout
          </p>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.productId.discountPrice! * item.quantity,
    0
  );
  const discount = cart.reduce(
    (acc, item) =>
      acc +
      (item.productId.price - item.productId.discountPrice!) * item.quantity,
    0
  );
  const finalTotal = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
          <p className="text-gray-600 mt-2">
            Complete your order in just a few steps
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Delivery Info Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="w-5 h-5" /> Delivery Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter phone number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your complete address"
                              rows={2}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Area *</FormLabel>
                            <FormControl>
                              <Input placeholder="State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="deliveryNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Special delivery instructions..."
                              rows={2}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Payment Info Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" /> Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-4"
                            >
                              {/* Cash on Delivery */}
                              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                <RadioGroupItem value="cod" id="cod" />
                                <div className="flex-1">
                                  <Label
                                    htmlFor="cod"
                                    className="flex items-center gap-3 cursor-pointer"
                                  >
                                    <Truck className="w-5 h-5 text-green-600" />
                                    <div>
                                      <div className="font-medium">
                                        Cash on Delivery
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        Pay when you receive your order
                                      </div>
                                    </div>
                                  </Label>
                                </div>
                              </div>

                              {/* Online Payment */}
                              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                <RadioGroupItem value="online" id="online" />
                                <div className="flex-1">
                                  <Label
                                    htmlFor="online"
                                    className="flex items-center gap-3 cursor-pointer"
                                  >
                                    <CreditCard className="w-5 h-5 text-blue-600" />
                                    <div>
                                      <div className="font-medium">
                                        Online Payment
                                      </div>
                                      <div className="text-sm text-gray-500 mb-2">
                                        Pay securely with bKash, Nagad, Card,
                                        etc.
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Badge
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          <Smartphone className="w-3 h-3 mr-1" />
                                          bKash
                                        </Badge>
                                        <Badge
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          <Smartphone className="w-3 h-3 mr-1" />
                                          Nagad
                                        </Badge>
                                        <Badge
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          <Building className="w-3 h-3 mr-1" />
                                          Bank
                                        </Badge>
                                      </div>
                                    </div>
                                  </Label>
                                </div>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Payment Method Info */}
                    {form.watch("paymentMethod") === "online" && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Package className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div className="text-sm text-blue-800">
                            <div className="font-medium mb-1">
                              Secure Payment
                            </div>
                            <p className="text-blue-600">
                              You will be redirected to our secure payment
                              gateway to complete your transaction safely.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Order Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Order Summary{" "}
                      <Badge variant="outline">{itemCount} items</Badge>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="max-h-64 overflow-y-auto space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <Image
                            src={item.productId.images[0]}
                            alt={item.productId.title}
                            width={48}
                            height={48}
                            className="object-cover rounded"
                          />

                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">
                              {item.productId.title}
                            </h4>
                            <p className="text-xs text-gray-600">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-sm">
                              $
                              {(
                                item.productId.discountPrice! * item.quantity
                              ).toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">
                              ${item.productId.discountPrice!.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {/* {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )} */}
                      <div className="flex justify-between">
                        <span>Delivery</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  disabled={createMutation.isPending || isProcessingPayment}
                  className="w-full"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Payment...
                    </>
                  ) : createMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Order...
                    </>
                  ) : form.watch("paymentMethod") === "online" ? (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Proceed to Payment - ${finalTotal.toFixed(2)}
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Place Order - ${finalTotal.toFixed(2)}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
