import api from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const res = await api.post("/auth/login", payload);
    return res.data.data ?? res.data;
  },

  async logout() {
    await api.post("/auth/logout");
  },
};
