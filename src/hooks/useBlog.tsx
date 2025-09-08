import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { IBlog } from "@/lib/types";
import {
  createBlog,
  getAllBlogsAdmin,
  updateBlog,
  deleteBlog,
} from "@/lib/services/Users/UsersAdminApis";
import { getBlogById } from "@/lib/services/Products/publicApi";

/****************************  Blogs Hooks *******************************/

/* Fetch all blogs for admin */
export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: () => getAllBlogsAdmin(),
  });
};

/* Fetch single blog by id */
export const useSingleBlog = (id: string) => {
  return useQuery({
    queryKey: ["blogs", id],
    queryFn: () => getBlogById(id),
  });
};

/* Create blog */
export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

/* Update blog */
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IBlog }) =>
      updateBlog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

/* Delete blog */
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};
