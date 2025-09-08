import axiosInstance from "@/lib/axios";
import { IBlog, IUser } from "@/lib/types";

/***************************  Users API ***************************/

// GET all Admin users
export const getAdminUsers = async () => {
  const res = await axiosInstance.get("/users/admin/all-users");
  return res.data.data;
};

// UPDATE Admin user
export const updateUser = async (id: string, data: Partial<IUser>) => {
  const res = await axiosInstance.put(`/users/admin/update-user/${id}`, data);
  return res.data;
};

// DELETE user by Admin
export const deleteUser = async (id: string) => {
  const res = await axiosInstance.delete(`/users/delete-user/${id}`);
  return res.data;
};

// Get Single user for Admin
export const getSingleUser = async (id: string) => {
  const res = await axiosInstance.get(`/users/admin/${id}`);
  console.log(res);
  return res.data.user;
};

// UPDATE user password
export const updatePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const res = await axiosInstance.patch(`/users/update-password`, data);
  return res.data;
};

// UPDATE personal profile
export const updateProfile = async (data: Partial<IUser>) => {
  const res = await axiosInstance.put(`/users/update-profile/`, data);
  return res.data;
};

/***************************  Blogs API ***************************/

// CREATE blog
export const createBlog = async (data: IBlog) => {
  const res = await axiosInstance.post("/blog/create-blog", data);
  return res.data;
};

// Get Admin blogs
export const getAllBlogsAdmin = async () => {
  const res = await axiosInstance.post("/blog/admin/all-blogs");
  return res.data;
};

// UPDATE blog
export const updateBlog = async (id: string, data: IBlog) => {
  const res = await axiosInstance.put(`/blog/update-blog/${id}`, data);
  return res.data;
};

// DELETE blog
export const deleteBlog = async (id: string) => {
  const res = await axiosInstance.delete(`/blog/delete-blog/${id}`);
  return res.data;
};
