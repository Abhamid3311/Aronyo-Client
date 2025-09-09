import axiosInstance from "@/lib/axios";
import { IOrder } from "@/lib/types";

/*************************** Orders API ***************************/

// CREATE order
export const createOrder = async (data: Partial<IOrder>) => {
  const res = await axiosInstance.post("/orders/create-order", data);
  return res.data;
};

// GET logged-in user's orders
export const getMyOrders = async (): Promise<IOrder[]> => {
  const res = await axiosInstance.get("/orders/my-orders");
  return res.data.data;
};

// GET all orders (Admin & Staff)
export const getAllOrdersAdmin = async (): Promise<IOrder[]> => {
  const res = await axiosInstance.get("/orders/admin/all-orders");
  return res.data.data;
};

// GET single order by ID
export const getSingleOrder = async (orderId: string): Promise<IOrder> => {
  const res = await axiosInstance.get(`/orders/${orderId}`);
  return res.data.data;
};

// UPDATE order status (Admin & Staff)
export const updateOrderStatus = async (
  orderId: string,
  data: Partial<IOrder>
) => {
  const res = await axiosInstance.patch(
    `/orders/update-order/${orderId}`,
    data
  );
  return res.data.data;
};

// DELETE / Cancel order (Admin & Staff)
export const cancelOrder = async (orderId: string) => {
  const res = await axiosInstance.delete(`/orders/delete-order/${orderId}`);
  return res.data;
};
