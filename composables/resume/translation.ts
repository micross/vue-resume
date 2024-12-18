import type { Language } from "~/lib/utils";

import { LANGUAGES_KEY } from "@/constants/query-keys";
import { useQuery } from "@tanstack/vue-query";

export const fetchLanguages = async () => {
  const response = await useAPI.get<Language[]>(`/translation/languages`);

  return response.data;
};

export const useLanguages = () => {
  const {
    error,
    isPending: loading,
    data: languages,
  } = useQuery({
    queryKey: [LANGUAGES_KEY],
    queryFn: fetchLanguages,
  });

  return { languages: languages ?? [], loading, error };
};
