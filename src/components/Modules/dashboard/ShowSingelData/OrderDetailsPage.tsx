/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUpdateOrderStatus } from "@/hooks/useOrders";
import {
  Package,
  User,
  MapPin,
  Phone,
  CreditCard,
  Calendar,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Edit,
  Save,
  ArrowLeft,
  Notebook,
  LocationEditIcon,
} from "lucide-react";
import { errorAlert, successAlert } from "@/lib/alert";
import { IOrder, OrderStatus } from "@/lib/types";
import { ORDER_STATUS_OPTIONS, PAYMENT_STATUS_OPTIONS } from "@/lib/staticData";
import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";
import ReviewSection from "./ReviewCompo";

interface OrderDetailsAdminProps {
  order: IOrder;
  existingReviews?: { [key: string]: any }; // Optional prop for existing reviews
}

export default function OrderDetailsAdmin({
  order,
  existingReviews = {},
}: OrderDetailsAdminProps) {
  const { user } = useAuth();
  const [currentOrder, setCurrentOrder] = useState(order);
  const { mutate: updateOrderStatus, isPending: isUpdating } =
    useUpdateOrderStatus();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("pending");
  const [isEditing, setIsEditing] = useState(false);

  // Set initial status when order loads
  useEffect(() => {
    if (order) {
      setSelectedStatus(order.orderStatus);
    }
  }, [order]);

  const handleUpdateStatus = async () => {
    if (!order || selectedStatus === order.orderStatus) {
      setIsEditing(false);
      return;
    }

    updateOrderStatus(
      {
        orderId: order._id,
        data: { orderStatus: selectedStatus },
      },
      {
        onSuccess: (updatedOrder: IOrder) => {
          setCurrentOrder(updatedOrder);
          successAlert("Order status updated successfully!");
          setIsEditing(false);
        },
        onError: (error: any) => {
          errorAlert(error?.message || "Failed To Update, try Again");
          console.error("Failed to update order status:", error);
        },
      }
    );
  };

  const getStatusBadge = (
    status: string,
    type: "order" | "payment" = "order"
  ) => {
    const options =
      type === "order" ? ORDER_STATUS_OPTIONS : PAYMENT_STATUS_OPTIONS;
    const statusConfig = options.find((option) => option.value === status);

    return (
      <Badge className={statusConfig?.color || "bg-gray-100 text-gray-800"}>
        {statusConfig?.label || status}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Check if order is delivered and user is a customer
  const isDelivered = currentOrder.orderStatus === "delivered";
  const isCustomer = user?.role === "user";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button asChild variant="ghost" className="mb-4">
              <Link
                href={
                  user?.role === "admin" || user?.role === "staff"
                    ? "/dashboard/admin/order-managment"
                    : "/dashboard/order-history"
                }
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Orders
              </Link>
            </Button>

            <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-600">Order ID: {order._id}</p>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(currentOrder.orderStatus)}
            {getStatusBadge(currentOrder.orderStatus)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Items ({order.orderItems.length} items)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.orderItems.map((item: any) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage
                                src={item.product.images[0]}
                                alt={item.product.title}
                              />
                              <AvatarFallback>
                                {item.product.title
                                  .substring(0, 2)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <p className="font-medium text-sm">
                                {item.product.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                SKU: {item.product._id}
                              </p>
                              {item.product.size && (
                                <Badge variant="outline" className="text-xs">
                                  {item.product.size}
                                </Badge>
                              )}
                              {item.product.brand && (
                                <p className="text-xs text-gray-500">
                                  Brand: {item.product.brand}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">
                              ${item.price.toLocaleString()}
                            </p>
                            {item.product.discountPrice &&
                              item.product.discountPrice <
                                item.product.price && (
                                <p className="text-xs text-gray-500 line-through">
                                  ${item.product.price.toLocaleString()}
                                </p>
                              )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{item.quantity}</Badge>
                        </TableCell>
                        <TableCell>
                          <p className="font-semibold">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Review Section - Only visible when order is delivered and user is customer */}
            <ReviewSection
              orderItems={order.orderItems}
              orderId={order._id}
              isDelivered={isDelivered}
              isUser={isCustomer}
              existingReview={existingReviews}
            />

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">
                      Customer Name
                    </p>
                    <p className="text-sm">{order.user?.name}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">
                      Customer Email
                    </p>
                    <p className="text-sm">{order.user?.email}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">
                      Customer ID
                    </p>
                    <p className="text-sm font-mono">{order.user?._id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="font-medium">{order.shippingAddress.name}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <LocationEditIcon className="w-4 h-4 text-gray-400" />
                    <p className="text-sm">
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.area}, {order.shippingAddress.city}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="text-sm">{order.shippingAddress.phone}</p>
                  </div>

                  {order?.shippingAddress?.deliveryNotes && (
                    <div className="flex items-center gap-2 mt-2">
                      <Notebook className="w-4 h-4 text-gray-400" />
                      <p className="text-sm">
                        {order?.shippingAddress?.deliveryNotes || "N/A"}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Order Status Management - Only for admin/staff */}
            {user?.role !== "user" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Edit className="w-5 h-5" />
                      Order Status
                    </span>
                    {!isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">
                        Current Status
                      </p>
                      {isEditing ? (
                        <Select
                          value={selectedStatus}
                          onValueChange={(value) =>
                            setSelectedStatus(value as OrderStatus)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select order status" />
                          </SelectTrigger>
                          <SelectContent>
                            {ORDER_STATUS_OPTIONS.map((status) => (
                              <SelectItem
                                key={status.value}
                                value={status.value}
                              >
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(status.value)}
                                  {status.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.orderStatus)}
                          {getStatusBadge(order.orderStatus)}
                        </div>
                      )}
                    </div>

                    {isEditing && (
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={handleUpdateStatus}
                          disabled={
                            isUpdating || selectedStatus === order.orderStatus
                          }
                          size="sm"
                        >
                          {isUpdating ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Updating...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Update Status
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsEditing(false);
                            setSelectedStatus(order.orderStatus);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Payment Method
                    </span>
                    <Badge variant="outline" className="uppercase">
                      {order.paymentMethod}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Payment Status
                    </span>
                    {getStatusBadge(order.paymentStatus, "payment")}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Transaction ID
                    </span>
                    <span className="text-sm font-mono text-right break-all">
                      {order.transactionId}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${order.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Charge</span>
                    <span>${order.deliveryCharge.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total Payable</span>
                    <span>${order.totalPayable.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Order Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Created</span>
                    <span>
                      {new Date(order.createdAt).toLocaleDateString()} at{" "}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last Updated</span>
                    <span>
                      {new Date(order.updatedAt).toLocaleDateString()} at{" "}
                      {new Date(order.updatedAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
