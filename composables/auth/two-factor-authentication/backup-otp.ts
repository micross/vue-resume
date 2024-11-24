import { AuthResponseDto, TwoFactorBackupDto } from "~/lib/dto";
import { useMutation } from "@tanstack/vue-query";
import { queryClient } from "~/utils/query-client";
import { useAuthStore } from "~/stores/auth";

export const backupOtp = async (data: TwoFactorBackupDto) => {
  const response = await useAPI.post<AuthResponseDto>("/auth/2fa/backup", data);

  return response.data;
};

export const useBackupOtp = () => {
  const setUser = useAuthStore.getState().setUser;

  const {
    error,
    isPending: loading,
    mutateAsync: backupOtpFn,
  } = useMutation({
    mutationFn: backupOtp,
    onSuccess: (data) => {
      setUser(data.value.user);
      queryClient.setQueryData(["user"], data.value.user);
    },
  });

  return { backupOtp: backupOtpFn, loading, error };
};
