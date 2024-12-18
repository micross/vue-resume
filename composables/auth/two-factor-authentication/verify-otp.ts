import { AuthResponseDto, TwoFactorDto } from "~/lib/dto";
import { useAuthStore } from "@/stores/auth";
import { useMutation } from "@tanstack/vue-query";
import { queryClient } from "~/utils/query-client";

export const verifyOtp = async (data: TwoFactorDto) => {
  const response = await useAPI.post<AuthResponseDto>(
    "/auth/2fa/verify",
    data,
  );

  return response.data;
};

export const useVerifyOtp = () => {
  const setUser = useAuthStore.getState().setUser;

  const {
    error,
    isPending: loading,
    mutateAsync: verifyOtpFn,
  } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      setUser(data.value.user);
      queryClient.setQueryData(["user"], data.value.user);
    },
  });

  return { verifyOtp: verifyOtpFn, loading, error };
};
