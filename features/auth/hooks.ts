import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as authApi from "./api";
import { setAccessToken } from "@/lib/auth";
import { setSessionCookie, clearSessionCookie } from "@/lib/session";
import type { LoginInput, RegisterInput } from "./schemas";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: ({ accessToken }) => {
      setAccessToken(accessToken);
      setSessionCookie();
      router.push("/dashboard");
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterInput) => authApi.register(data),
    onSuccess: () => {
      router.push("/login");
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setAccessToken(null);
      clearSessionCookie();
      queryClient.clear();
      router.push("/login");
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: authApi.getProfile,
    retry: false,
  });
};
