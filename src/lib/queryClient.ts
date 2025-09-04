// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 daqiqa fresh
      refetchOnWindowFocus: false, // tabga qaytganda fetch qilmaydi
      retry: 1, // xato bo‘lsa 1 marta urinadi
    },
  },
});
