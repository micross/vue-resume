import { MessageDto } from "~/lib/dto";
import { useMutation } from "@tanstack/vue-query";

export const setup2FA = async () => {
  const response = await useAPI.post<MessageDto>("/auth/2fa/setup");

  return response.data;
};

export const useSetup2FA = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: setup2FAFn,
  } = useMutation({
    mutationFn: setup2FA,
  });

  return { setup2FA: setup2FAFn, loading, error };
};
