import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserProfileUpdateData, ChangePasswordData } from "@/types/user";
import axiosInstance from "@/lib/client";
import { toast } from "sonner";
import { AxiosError } from "axios";

// Profile yangilash mutation
export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: UserProfileUpdateData) =>
      axiosInstance.put("/users/profile", userData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      const message = response.data?.message || "Profil muvaffaqiyatli yangilandi";
      toast.success(message);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage =
        error.response?.data?.message || "Profilni yangilashda xatolik";
      toast.error(errorMessage);
    },
  });
};

// Parol yangilash mutation
export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (passwordData: ChangePasswordData) =>
      axiosInstance.put("/users/change-password", passwordData),
    onSuccess: (response) => {
      const message = response.data?.message || "Parol muvaffaqiyatli yangilandi";
      toast.success(message);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage =
        error.response?.data?.message || "Parolni yangilashda xatolik";
      toast.error(errorMessage);
    },
  });
};
