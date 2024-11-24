import { BackupCodesDto, TwoFactorDto } from "~/lib/dto";
import { useMutation } from "@tanstack/vue-query";

export const enable2FA = async (data: TwoFactorDto) => {
  const response = await useAPI.post<BackupCodesDto>(
    "/auth/2fa/enable",
    data,
  );

  return response.data;
};

export const useEnable2FA = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: enable2FAFn,
  } = useMutation({
    mutationFn: enable2FA,
  });

  return { enable2FA: enable2FAFn, loading, error };
};
