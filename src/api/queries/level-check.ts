import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/client";
import { WritingTopic } from "@/types/level-check";

const fetchWritingTopic = async (): Promise<WritingTopic> => {
  const { data } = await axiosInstance.get("/level-checker");
  return data;
};

export const useWritingTopicQuery = () => {
  return useQuery({ 
    queryKey: ["writing-topic"], 
    queryFn: fetchWritingTopic,
    enabled: false, // Faqat manual trigger qilganda ishlaydi
  });
};