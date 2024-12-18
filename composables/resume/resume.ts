import { ResumeDto } from "~/lib/dto";


export const findResumeById = async (data: { id: string }) => {
  const response = await useAPI.get<ResumeDto>(`/resume/${data.id}`);

  return response.data;
};

export const findResumeByUsernameSlug = async (data: { username: string; slug: string }) => {
  const response = await useAPI.get<ResumeDto>(`/resume/public/${data.username}/${data.slug}`);

  return response.data;
};
