import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../../../services/api";
import type { User } from "../../../types/api";

export function useProfile() {
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: authApi.getCurrentUser,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (userData: Partial<User>) => authApi.updateProfile(userData),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(["profile"], updatedProfile);
    },
    onError: (error) => {},
  });

  return {
    profile,
    isLoading,
    error,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
    updateError: updateProfileMutation.error,
  };
}
