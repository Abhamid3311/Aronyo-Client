import axiosInstance from "@/lib/axios";
import { ICategory, IProduct } from "@/lib/types";

/***************************  Products API ***************************/

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

/*********************************** Categories API *****************************************************/

// GET all categories
export const getAdminCategories = async (): Promise<ICategory[]> => {
  const res = await axiosInstance.get("/category/admin/all-categories");
  return res.data.data;
};

// CREATE category
export const createCategory = async (data: Partial<ICategory>) => {
  const res = await axiosInstance.post("/category/create-category", data);
  return res.data;
};

// UPDATE category
export const updateCategory = async (id: string, data: Partial<ICategory>) => {
  const res = await axiosInstance.put(`/category/${id}`, data);
  return res.data;
};

// DELETE category
export const deleteCategory = async (id: string) => {
  const res = await axiosInstance.delete(`/category/${id}`);
  return res.data;
};

// GET single category by slug or id
export const getSingleCategory = async (id: string): Promise<ICategory> => {
  const res = await axiosInstance.get(`/category/${id}`);
  return res.data.data;
};
