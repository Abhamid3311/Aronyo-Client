import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  getSingelProduct,
  updateProduct,
} from "@/lib/services/Products/ProductsAdminApi";
import { IProduct } from "@/lib/types";

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
