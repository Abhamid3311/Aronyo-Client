"use client";

import OrderDetailsAdmin from "@/components/Modules/dashboard/ShowSingelData/OrderDetailsPage";
import OrderDetailsSkeleton from "@/components/Modules/skeletons/OrderDetailsPageSkeleton";
import { useSingleOrder } from "@/hooks/useOrders";
import { use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OrderPage({ params }: PageProps) {
  const { id } = use(params);

  const { data: order, isLoading, error } = useSingleOrder(id);

  if (isLoading) return <OrderDetailsSkeleton />;
  if (error || !order) return <div>Order Not Found</div>;

  return <OrderDetailsAdmin order={order} />;
}
