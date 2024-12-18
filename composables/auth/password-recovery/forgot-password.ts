import { ForgotPasswordDto } from "~/lib/dto";
import { useMutation } from "@tanstack/vue-query";

export const forgotPassword = async (data: ForgotPasswordDto) => {
  return useAPI.post<ForgotPasswordDto>(
    "/auth/forgot-password",
    data,
  );
};

export const useForgotPassword = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: forgotPasswordFn,
  } = useMutation({
    mutationFn: forgotPassword,
  });

  return { forgotPassword: forgotPasswordFn, loading, error };
};
