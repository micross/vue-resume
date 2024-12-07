import { StatisticsDto } from "~/lib/dto";

import { RESUME_KEY } from "@/constants/query-keys";
import { useQuery } from "@tanstack/vue-query";

export const findResumeStatisticsById = async (data: { id: string }) => {
  const response = await useAPI.get<StatisticsDto>(`/resume/${data.id}/statistics`);

  return response.data;
};

export const useResumeStatistics = (id: string, enabled = false) => {
  const {
    error,
    isPending: loading,
    data: statistics,
  } = useQuery({
    queryKey: [...RESUME_KEY, "statistics", id],
    queryFn: () => findResumeStatisticsById({ id }),
    enabled,
  });

  return { statistics, loading, error };
};
