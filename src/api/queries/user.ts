import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/client";
import { User } from "@/types/user";

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axiosInstance.get("/users");
  return data;
};

export const useUsersQuery = () => {
  return useQuery({ 
    queryKey: ["users"], 
    queryFn: fetchUsers 
  });
};
