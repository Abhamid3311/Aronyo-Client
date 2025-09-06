import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  getAdminCategories,
  getAdminProducts,
  getSingelProduct,
  getSingleCategory,
  updateCategory,
  updateProduct,
  updateStatusCategory,
} from "@/lib/services/Products/ProductsAdminApi";
import { ICategory, IProduct } from "@/lib/types";

/****************************  Products Hooks *******************************/

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAdminProducts,
  });
};

export const useSingelProducts = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getSingelProduct(id),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IProduct }) =>
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

/*******************  Category Hooks **************************/

/* Fetch all categories for admin */
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAdminCategories,
  });
};

/* Fetch single category by id */
export const useSingleCategory = (id: string) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => getSingleCategory(id),
  });
};

/* Create category */
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

/* Update category */
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ICategory> }) =>
      updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

/* Update category status */
export const useUpdateCategoryStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => updateStatusCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

/* Delete category */
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
