import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { IOrder } from "@/lib/types";
import {
  createOrder,
  getMyOrders,
  getAllOrdersAdmin,
  updateOrderStatus,
  cancelOrder,
  getSingleOrder,
} from "@/lib/services/Order/orderApis";

/******************* Order Hooks ************************/

// Fetch logged-in user's orders
export const useMyOrders = () => {
  return useQuery({
    queryKey: ["myOrders"],
    queryFn: getMyOrders,
  });
};

// Fetch all orders (Admin & Staff)
export const useAllOrdersAdmin = () => {
  return useQuery({
    queryKey: ["allOrders"],
    queryFn: getAllOrdersAdmin,
  });
};

// Fetch single order by ID
export const useSingleOrder = (orderId: string) => {
  return useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getSingleOrder(orderId),
  });
};

// Create order
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
    },
  });
};

// Update order status
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      orderId,
      data,
    }: {
      orderId: string;
      data: Partial<IOrder>;
    }) => updateOrderStatus(orderId, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.orderId] });
    },
  });
};

// Cancel order
export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
    },
  });
};
