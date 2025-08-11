import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { QuestionBank } from "@/types/question-bank/question-bank";

interface DeleteQuestionBankPayload {
  id: string;
  token: string;
}

interface DeleteQuestionBankResponse {
  data: QuestionBank;
}

export const DeleteQuestionBankHandler = async ({
  id,
  token,
}: DeleteQuestionBankPayload): Promise<DeleteQuestionBankResponse> => {
  const { data } = await api.delete(`/question-set/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useDeleteQuestionBank = (
  options?: UseMutationOptions<
    DeleteQuestionBankResponse,
    AxiosError<DeleteQuestionBankResponse>,
    DeleteQuestionBankPayload
  >,
) => {
  return useMutation({
    mutationFn: DeleteQuestionBankHandler,
    ...options,
  });
};
