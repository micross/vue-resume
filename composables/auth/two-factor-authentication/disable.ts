import { MessageDto } from "~/lib/dto";
import { useMutation } from "@tanstack/vue-query";

export const disable2FA = async () => {
  const response = await useAPI.post<MessageDto>("/auth/2fa/disable");

  return response.data;
};

export const useDisable2FA = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: disable2FAFn,
  } = useMutation({
    mutationFn: disable2FA,
  });

  return { disable2FA: disable2FAFn, loading, error };
};
