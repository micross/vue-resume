import { ResumeDto, UpdateResumeDto } from "~/lib/dto";
import { useMutation } from "@tanstack/vue-query";
import debounce from "lodash.debounce";

export const updateResume = async (dto: UpdateResumeDto) => {
  console.log('p')
  const { $api } = useNuxtApp()

  const { data, status, error, refresh, clear } = await useAsyncData(`/resume/${dto.id}`, () => $api(`/resume/${dto.id}`, {
    method: 'patch',
    body: dto
  }))
  const response = data.value as ResumeDto;

  return response;
};

export const debouncedUpdateResume = debounce(updateResume, 500);
