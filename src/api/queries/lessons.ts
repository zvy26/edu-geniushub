// api/queries/lessons.ts

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/client";
import { Lesson } from "@/types/lesson";
import { AxiosError } from "axios";

// Lesson detail olish uchun query (API prefix bilan to'g'rilandi)
const fetchLesson = async (lessonId: string): Promise<Lesson> => {
  const { data } = await axiosInstance.get(`/lessons/${lessonId}`);
  return data;
};


export const useLessonQuery = (lessonId: string) => {
  return useQuery({ 
    queryKey: ["lesson", lessonId], 
    queryFn: () => fetchLesson(lessonId),
    enabled: !!lessonId,
    retry: (failureCount, error: AxiosError) => {
      if (error.response?.status === 403 || error.response?.status === 404) {
        return false;
      }
      return failureCount < 2;
    }
  });
};
