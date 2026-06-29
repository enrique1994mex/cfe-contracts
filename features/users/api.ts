import api from "@/lib/axios";
import type { User } from "./types";

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>("/api/users");
  return res.data;
};
