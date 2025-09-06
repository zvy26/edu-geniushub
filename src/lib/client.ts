// src/lib/client.ts
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://dead.uz/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // optional if your API uses cookies
})

export default axiosInstance
