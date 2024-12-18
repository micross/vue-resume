import { MessageDto, UpdatePasswordDto } from "~/lib/dto";
import { useMutation } from "@tanstack/vue-query";

export const updatePassword = async (data: UpdatePasswordDto) => {
  const response = await useAPI.patch<MessageDto>(
    "/auth/password",
    data,
  );

  return response.data;
};

export const useUpdatePassword = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: updatePasswordFn,
  } = useMutation({
    mutationFn: updatePassword,
  });

  return { updatePassword: updatePasswordFn, loading, error };
};
