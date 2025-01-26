import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-tau-amber.vercel.app/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
