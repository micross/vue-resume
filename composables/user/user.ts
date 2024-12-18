import { UserDto } from "~/lib/dto";
import { useQuery } from "@tanstack/vue-query";

import { useAuthStore } from "@/stores/auth";

export const fetchUser = async () => {
  const response = await useAPI.get<UserDto>(
    "/user/me",
  );

  return response.data;
};

export const useUser = () => {
  const setUser = useAuthStore.getState().setUser;

  const {
    error,
    isPending: loading,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  setUser(user.value as unknown as UserDto)

  return { user: user, loading, error };
};
