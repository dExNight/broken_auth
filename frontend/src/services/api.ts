import axios from "axios";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from "../types/api";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (data: LoginRequest) => {
    const response = await api.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest) => {
    const response = await api.post<User>("/auth/register", data);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get<User>("/auth/me");
    return response.data;
  },

  updateProfile: async (data: Partial<User>) => {
    const response = await api.put<User>("/auth/profile", {
      bio: data.bio,
    });
    return response.data;
  },

  requestPasswordReset: async (data: { email: string }) => {
    const response = await api.post<{ token: string }>(
      "/auth/reset-password/request",
      data
    );
    return response.data;
  },

  confirmPasswordReset: async (data: {
    email: string;
    token: string;
    new_password: string;
  }) => {
    const response = await api.post("/auth/reset-password/confirm", data);
    return response.data;
  },

  searchUsers: async (query: string) => {
    const response = await api.get<User[]>(
      `/auth/users/search?username=${query}`
    );
    return response.data;
  },
};

export default api;
