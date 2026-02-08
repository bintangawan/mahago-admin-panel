import axios from "axios";

const api = axios.create({
  baseURL: "https://appapi.mahago.id/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
