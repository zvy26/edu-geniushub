import Cookies from 'js-cookie';
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor – cookie dan token qo'shish
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // cookie dan oladi
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor – global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // 401 Unauthorized → cookie o'chirish va login sahifaga yo'naltirish
      if (status === 401) {
        Cookies.remove("token");
        // if (typeof window !== 'undefined') {
        //   // window.location.href = "/login";
        // }
      }

      // boshqa xatoliklar uchun console
      console.error("API error:", error.response.data);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
