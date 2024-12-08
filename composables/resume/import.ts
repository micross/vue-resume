import { ImportResumeDto, ResumeDto } from "~/lib/dto";
import { useMutation } from "@tanstack/vue-query";
import { queryClient } from "~/utils/query-client";

export const importResume = async (data: ImportResumeDto) => {
  const response = await useAPI.post<ResumeDto>(
    "/resume/import",
    data,
  );

  return response.data;
};

export const useImportResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: importResumeFn,
  } = useMutation({
    mutationFn: importResume,
    onSuccess: (data) => {
      queryClient.setQueryData<ResumeDto>(["resume", { id: data.value.id }], data.value);

      queryClient.setQueryData<ResumeDto[]>(["resumes"], (cache) => {
        if (!cache) return [data.value];
        return [...cache, data.value];
      });
    },
  });

  return { importResume: importResumeFn, loading, error };
};
