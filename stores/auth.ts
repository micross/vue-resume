import { UserDto } from "~/lib/dto";

declare type Nullable<T> = T | null;

export interface AuthState {
  user: Nullable<UserDto>;
};


export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref({
      user: null
    } as AuthState);

    const setUser = (u: UserDto | null) => {
      user.value.user = u
    }

    return { user, setUser }

  },
  {
    persist: true,
  },
);
