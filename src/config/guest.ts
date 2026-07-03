import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://vinkol-server-staging.vercel.app/api/v1";

const axiosStore = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosStore.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosStore;
