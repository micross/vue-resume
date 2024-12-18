
import { UrlDto } from "~/lib/dto";
import { useMutation } from "@tanstack/vue-query";


export const printResume = async (data: UrlDto) => {
  const response = await useAPI.post<Blob>('/resume/print', data);

  return response.data;
};

export const usePrintResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: printResumeFn,
  } = useMutation({
    mutationFn: printResume,
    onError: (error) => {
      const message = error.message;
    },
  });

  return { printResume: printResumeFn, loading, error };
};
