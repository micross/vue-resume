import { MessageDto } from "~/lib/dto";
import { useMutation } from "@tanstack/vue-query";

export const resendVerificationEmail = async () => {
  const response = await useAPI.post<MessageDto>(
    "/auth/verify-email/resend",
  );

  return response.data;
};

export const useResendVerificationEmail = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: resendVerificationEmailFn,
  } = useMutation({
    mutationFn: resendVerificationEmail,
  });

  return { resendVerificationEmail: resendVerificationEmailFn, loading, error };
};
