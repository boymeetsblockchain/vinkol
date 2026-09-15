import axios from "axios";

/**
 * The one axios instance. config/guest.ts, config/rider.ts and config/store.ts
 * were three byte-identical copies of this — including the "guest" one, which
 * attached the same bearer token — so a change to auth or base URL had to be
 * made three times.
 */
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://vinkol-server-staging.vercel.app/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/** Guarded: this module is imported by code that also renders on the server. */
const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("accessToken");
  } catch {
    return null;
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
