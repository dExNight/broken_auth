import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../services/api";
import type { LoginRequest } from "../../../types/api";

export function useAuth() {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      navigate("/profile");
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return {
    login: loginMutation.mutate,
    logout,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
}
