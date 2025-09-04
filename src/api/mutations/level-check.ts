import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/client";
import { EssaySubmission } from "@/types/level-check";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useEvaluateEssayMutation = () => {
  return useMutation({
    mutationFn: (submission: EssaySubmission) =>
      axiosInstance.post("/level-checker", submission),
    onSuccess: (response) => {
      if (response.data?.feedback) {
        toast.success("Essay successfully evaluated!");
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage = error.response?.data?.message || "Error evaluating essay";
      toast.error(errorMessage);
    },
  });
};
