export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  bio?: string;
  created_at: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user_id: number;
  username: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirmRequest {
  token: string;
  email: string;
  new_password: string;
}

export interface ApiError {
  message: string;
  details?: Record<string, string[]>;
}
