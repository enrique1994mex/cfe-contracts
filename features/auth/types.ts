export interface LoginResponse {
  accessToken: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
  role: "USER" | "ADMIN";
}

export interface AuthUser {
  id: number;
  email: string;
  role: "USER" | "ADMIN";
}
