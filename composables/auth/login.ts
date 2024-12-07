import { AuthResponseDto, LoginDto } from "~/lib/dto";

import { useAuthStore } from "@/stores/auth";
import { useMutation } from "@tanstack/vue-query";
import { queryClient } from "~/utils/query-client";

export const login = async (data: LoginDto) => {
  const response = await useAPI.post<AuthResponseDto>(
    "/auth/login",
    data,
  );

  return response.data;
};

export const useLogin = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: loginFn,
  } = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      if (data.value.status === "2fa_required") {
        await navigateTo("/auth/verify-otp")
        return;
      }

      useAuthStore().setUser(data.value.user);
      const cookie = useCookie('token')
      cookie.value = data.value.token
      queryClient.setQueryData(["user"], data.value.user);
    }
  });

  return { login: loginFn, loading, error };
};


