import { CreateResumeDto, ResumeDto } from "~/lib/dto";
import { useMutation } from "@tanstack/vue-query";
import { queryClient } from "~/utils/query-client";

export const createResume = async (data: CreateResumeDto) => {
  const response = await useAPI.post<ResumeDto>(
    "/resume",
    data,
  );

  return response.data;
};

export const useCreateResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: createResumeFn,
  } = useMutation({
    mutationFn: createResume,
    onSuccess: (data) => {
      queryClient.setQueryData<ResumeDto>(["resume", { id: data.value.id }], data.value);

      queryClient.setQueryData<ResumeDto[]>(["resumes"], (cache) => {
        if (!cache) return [data.value];
        return [...cache, data.value];
      });
    },
  });

  return { createResume: createResumeFn, loading, error };
};
