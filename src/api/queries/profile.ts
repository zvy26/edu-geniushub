import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/client";
import { User } from "@/types/user";

const fetchProfile = async (): Promise<User> => {
  const { data } = await axiosInstance.get("/users/profile");
  return data;
};

export const useProfileQuery = () => {
  return useQuery({ 
    queryKey: ["profile"], 
    queryFn: fetchProfile 
  });
};