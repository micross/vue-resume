import { MessageDto } from "~/lib/dto";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/libs/axios";
import { queryClient } from "@/libs/query-client";

export const deleteUser = async () => {
  const response = await axios.delete<MessageDto, AxiosResponse<MessageDto>>("/user/me");

  return response.data;
};

export const useDeleteUser = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: deleteUserFn,
  } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.clear();
    },
  });

  return { deleteUser: deleteUserFn, loading, error };
};
