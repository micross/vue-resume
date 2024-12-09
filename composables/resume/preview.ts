import { UrlDto } from "~/lib/dto";

import { RESUME_PREVIEW_KEY } from "@/constants/query-keys";
import { useQuery } from "@tanstack/vue-query";

export const previewResume = async (data: { id: string }) => {
  const response = await useAPI.get<UrlDto>(`/resume/print/${data.id}/preview`);

  return response.data;
};

export const useResumePreview = (id: string) => {
  const {
    error,
    isPending: loading,
    data,
  } = useQuery({
    queryKey: [RESUME_PREVIEW_KEY, { id }],
    queryFn: () => previewResume({ id }),
  });

  return { url: data?.value?.value.url, loading, error };
};
