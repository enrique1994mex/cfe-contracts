import axios from "axios";
import { getAccessToken, setAccessToken } from "./auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let queue: Array<(token: string) => void> = [];

const processQueue = (token: string) => {
  queue.forEach((resolve) => resolve(token));
  queue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        queue.push((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          resolve(api(original));
        });
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
        {},
        { withCredentials: true }
      );
      setAccessToken(data.accessToken);
      processQueue(data.accessToken);
      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(original);
    } catch {
      setAccessToken(null);
      // Call logout to let the server clear the refreshToken cookie before
      // redirecting; otherwise the middleware will redirect straight back to
      // /dashboard because the stale cookie is still present.
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
          {},
          { withCredentials: true }
        );
      } catch {
        // Best-effort: if logout also fails, continue to redirect anyway.
      }
      window.location.href = "/login";
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
