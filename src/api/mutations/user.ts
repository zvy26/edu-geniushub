import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserFormData } from "@/types/user";
import axiosInstance from "@/lib/client";

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: UserFormData) => axiosInstance.post("/users", user),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] })
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, user }: { id: number; user: UserFormData }) =>
      axiosInstance.put(`/users/${id}`, user),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] })
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => axiosInstance.delete(`/users/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] })
  });
};
