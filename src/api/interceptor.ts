import api from "./api";
import { neoToast } from "@/components/ui/neo-toast";

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message || "Terjadi kesalahan server";

    if (status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/inituhpageslogin";
    }

    neoToast.error(message);
    return Promise.reject(error);
  }
);
