import { MessageDto } from "~/lib/dto";
import { useMutation } from "@tanstack/vue-query";

export const verifyEmail = async (data: { token: string }) => {
  const response = await useAPI.post<MessageDto>(
    `/auth/verify-email?token=${data.token}`,
  );

  return response.data;
};

export const useVerifyEmail = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: verifyEmailFn,
  } = useMutation({
    mutationFn: verifyEmail,
  });

  return { verifyEmail: verifyEmailFn, loading, error };
};
