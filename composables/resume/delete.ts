import { DeleteResumeDto, ResumeDto } from "~/lib/dto";
import { useMutation } from "@tanstack/vue-query";
import { queryClient } from "~/utils/query-client";

export const deleteResume = async (data: DeleteResumeDto) => {
  const response = await useAPI.delete<ResumeDto>(
    `/resume/${data.id}`,
  );

  return response.data;
};

export const useDeleteResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: deleteResumeFn,
  } = useMutation({
    mutationFn: deleteResume,
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["resume", data.value.id] });

      queryClient.setQueryData<ResumeDto[]>(["resumes"], (cache) => {
        if (!cache) return [];
        return cache.filter((resume) => resume.id !== data.value.id);
      });
    },
  });

  return { deleteResume: deleteResumeFn, loading, error };
};
