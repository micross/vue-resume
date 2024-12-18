import { ResumeDto } from "~/lib/dto";
import { RESUMES_KEY } from "@/constants/query-keys";
import { useQuery } from "@tanstack/vue-query";


export const fetchResumes = async () => {
  const response = await useAPI.get<ResumeDto[]>("/resume");

  return response.data;
};

export const useResumes = () => {
  const {
    error,
    isPending: loading,
    data: resumes,
  } = useQuery({
    queryKey: RESUMES_KEY,
    queryFn: fetchResumes,
  });

  return { resumes, loading, error };
};
