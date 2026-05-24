import api from "@/lib/axios";
import type { LoginInput, RegisterInput } from "./schemas";
import type { AuthUser, LoginResponse, RegisterResponse } from "./types";

export const login = async (data: LoginInput): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/api/auth/login", data);
  return res.data;
};

export const register = async (data: RegisterInput): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>("/api/auth/register", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/api/auth/logout");
};

export const refreshToken = async (): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/api/auth/refresh-token");
  return res.data;
};

export const getProfile = async (): Promise<AuthUser> => {
  const res = await api.get<AuthUser>("/api/auth/profile");
  return res.data;
};
