import { ResumeDto } from "~/lib/dto";
import { useMutation } from "@tanstack/vue-query";
import { queryClient } from "~/utils/query-client";

type LockResumeArgs = {
  id: string;
  set: boolean;
};

export const lockResume = async ({ id, set }: LockResumeArgs) => {
  const response = await useAPI.patch<ResumeDto>(`/resume/${id}/lock`, { set });

  queryClient.setQueryData<ResumeDto>(["resume", { id: response.data.value.id }], response.data.value);

  queryClient.setQueryData<ResumeDto[]>(["resumes"], (cache) => {
    if (!cache) return [response.data.value];
    return cache.map((resume) => {
      if (resume.id === response.data.value.id) return response.data.value;
      return resume;
    });
  });

  return response.data;
};

export const useLockResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: lockResumeFn,
  } = useMutation({
    mutationFn: lockResume,
  });

  return { lockResume: lockResumeFn, loading, error };
};
