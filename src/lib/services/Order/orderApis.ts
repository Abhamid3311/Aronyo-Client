import axiosInstance from "@/lib/axios";
import { IOrder, IReview } from "@/lib/types";

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

/******************* Review APIs *************************/

// CREATE or Update review (User)
export const createReview = async (data: Partial<IReview>) => {
  const res = await axiosInstance.post("/reviews/add-review", data);
  return res.data.data;
};

// GET single review by ID (User)
export const getSingleReview = async (reviewId: string): Promise<IReview> => {
  const res = await axiosInstance.get(`/reviews/view-review/${reviewId}`);
  return res.data.data;
};

// UPDATE review (User)
export const updateReview = async (
  reviewId: string,
  data: Partial<IReview>
): Promise<IReview> => {
  const res = await axiosInstance.put(`/reviews/edit-review/${reviewId}`, data);
  return res.data.data;
};

// DELETE review (User)
export const deleteReview = async (reviewId: string) => {
  const res = await axiosInstance.delete(`/reviews/delete-review/${reviewId}`);
  return res.data;
};

// UPDATE review status (Admin)
export const updateReviewStatus = async (
  reviewId: string,
  isActive: boolean
): Promise<IReview> => {
  const res = await axiosInstance.put(`/reviews/update-status/${reviewId}`, {
    isActive,
  });
  return res.data.data;
};

// GET random active reviews (Public)
export const getActiveReviews = async (): Promise<IReview[]> => {
  const res = await axiosInstance.get(`/reviews/active-reviews`);
  return res.data.data;
};

// GET all reviews (Admin)
export const getAllReviewsAdmin = async (): Promise<IReview[]> => {
  const res = await axiosInstance.get("/reviews/all-reviews");
  return res.data.data;
};
