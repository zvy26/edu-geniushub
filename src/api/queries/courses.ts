// api/queries/courses.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/client";
import { Course, CourseDetail, Lesson } from "@/types/courses";

const fetchCourses = async (): Promise<Course[]> => {
  const { data } = await axiosInstance.get("/courses");
  return data;
};

export const useCoursesQuery = () => {
  return useQuery({ 
    queryKey: ["courses"], 
    queryFn: fetchCourses,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

const fetchCourseById = async (id: string): Promise<CourseDetail> => {
  const { data } = await axiosInstance.get(`/courses/${id}`);
  return data;
};

export const useCourseDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => fetchCourseById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// New query for fetching lessons by section ID
const fetchLessonsBySectionId = async (sectionId: string): Promise<Lesson[]> => {
  const { data } = await axiosInstance.get(`/sections/${sectionId}`);
  return data;
};

export const useLessonsQuery = (sectionId: string) => {
  return useQuery({
    queryKey: ["lessons", sectionId],
    queryFn: () => fetchLessonsBySectionId(sectionId),
    enabled: !!sectionId,
    staleTime: 5 * 60 * 1000,
  });
};