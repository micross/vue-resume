import { FeatureDto } from "~/lib/dto";
import { useQuery } from "@tanstack/vue-query";
export const fetchFeatureFlags = async () => {
  const response = await useAPI.get<FeatureDto>(`/feature/flags`);

  return response.data;
};

export const useFeatureFlags = () => {
  const {
    error,
    isPending: loading,
    data: flags,
  } = useQuery({
    queryKey: ["feature_flags"],
    queryFn:  fetchFeatureFlags,
    refetchOnMount: "always",
    // initialData: {
    //   is_signups_disabled: false,
    //   is_email_auth_disabled: false,
    // },
  });

  return { flags, loading, error };
};
