import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IUser } from "@/lib/types";
import {
  getAdminUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  updatePassword,
  updateProfile,
} from "@/lib/services/Users/UsersAdminApis";

/****************************  Users Hooks *******************************/

// Fetch all users
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAdminUsers,
  });
};

// Fetch single user by ID
export const useSingleUser = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getSingleUser(id),
    enabled: !!id, // only fetch if id exists
  });
};

// Update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<IUser> }) =>
      updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Update user password
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      updatePassword(data),
  });
};

// Update personal profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<IUser>) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
