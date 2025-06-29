import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { QuestionBank } from "@/types/question-bank/question-bank";

interface GetAllQuestionBanksResponse {
  data: QuestionBank[];
}

export const GetAllQuestionBanksHandler = async (
  token: string,
): Promise<GetAllQuestionBanksResponse> => {
  const { data } = await api.get<GetAllQuestionBanksResponse>("/question-set", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllQuestionBanks = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllQuestionBanksResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["question-bank-list"],
    queryFn: () => GetAllQuestionBanksHandler(token),
    ...options,
  });
};
