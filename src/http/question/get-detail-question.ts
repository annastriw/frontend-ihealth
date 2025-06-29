import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Question } from "@/types/questions/question";

interface GetDetailQuestionResponse {
  data: Question;
}

export const GetDetailQuestionHandler = async (
  id: string,
  token: string,
): Promise<GetDetailQuestionResponse> => {
  const { data } = await api.get<GetDetailQuestionResponse>(`/question/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetDetailQuestion = (
  id: string,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailQuestionResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["question-detail", id],
    queryFn: () => GetDetailQuestionHandler(id, token),
    ...options,
  });
};
