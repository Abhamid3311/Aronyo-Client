/* Admin Products API */

import axiosInstance from "@/lib/axios";
import { IProduct } from "@/lib/types";

// GET all Admin products
export const getAdminProducts = async () => {
  const res = await axiosInstance.get("/products/admin/all-products");
  return res.data.data;
};

// CREATE product
export const createProduct = async (data: IProduct) => {
  const res = await axiosInstance.post("/products/create-product", data);
  return res.data;
};

// UPDATE product
export const updateProduct = async (id: string, data: IProduct) => {
  const res = await axiosInstance.put(`/products/update-product/${id}`, data);
  return res.data;
};

// DELETE product
export const deleteProduct = async (id: string) => {
  const res = await axiosInstance.delete(`/products/${id}`);
  return res.data;
};

// Get Singel product for Admin
export const getSingelProduct = async (id: string) => {
  const res = await axiosInstance.get(`/products/admin/${id}`);
  console.log(res);
  return res.data.data;
};
