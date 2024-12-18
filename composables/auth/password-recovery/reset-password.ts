import { ResetPasswordDto } from "~/lib/dto";
import { useMutation } from "@tanstack/vue-query";

export const resetPassword = async (data: ResetPasswordDto) => {
  return useAPI.post<ResetPasswordDto>(
    "/auth/reset-password",
    data,
  );
};

export const useResetPassword = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: resetPasswordFn,
  } = useMutation({
    mutationFn: resetPassword,
  });

  return { resetPassword: resetPasswordFn, loading, error };
};
