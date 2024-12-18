import { AuthProvidersDto } from "~/lib/dto";

import { AUTH_PROVIDERS_KEY } from "@/constants/query-keys";
import { useQuery } from "@tanstack/vue-query";

export const getAuthProviders = async () => {
  const response = await useAPI.get<AuthProvidersDto>(`/auth/providers`);

  return response.data.value;
};

export const useAuthProviders = () => {
  const {
    error,
    isPending: loading,
    data: providers,
  } = useQuery({
    queryKey: [AUTH_PROVIDERS_KEY],
    queryFn: getAuthProviders,
  });

  return { providers, loading, error };
};
