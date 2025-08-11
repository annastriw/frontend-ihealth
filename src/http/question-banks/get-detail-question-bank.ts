import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { QuestionBankDetail } from "@/types/question-bank/question-bank";

interface GetDetailQuestionBankResponse {
  data: QuestionBankDetail;
}

export const GetDetailQuestionBankHandler = async (
  id: string,
  token: string,
): Promise<GetDetailQuestionBankResponse> => {
  const { data } = await api.get<GetDetailQuestionBankResponse>(
    `/question-set/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDetailQuestionBank = (
  id: string,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailQuestionBankResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["question-bank-detail", id],
    queryFn: () => GetDetailQuestionBankHandler(id, token),
    ...options,
  });
};
