import { MessageDto } from "~/lib/dto";

export const refreshToken = async () => {
  const response = await useAPI.post<MessageDto>("/auth/refresh");

  return response.data;
};
