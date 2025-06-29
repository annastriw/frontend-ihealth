import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { QuestionBank } from "@/types/question-bank/question-bank";
import { QuestionBankType } from "@/validators/question-banks/question-bank-validator";

interface EditQuestionBankResponse {
  data: QuestionBank;
}

export const EditQuestionBankHandler = async (
  id: string,
  body: QuestionBankType,
  token: string,
): Promise<EditQuestionBankResponse> => {
  const { data } = await api.put(`/question-set/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useEditQuestionBank = (
  options?: UseMutationOptions<
    EditQuestionBankResponse,
    AxiosError<EditQuestionBankResponse>,
    { id: string; body: QuestionBankType }
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: ({ id, body }) =>
      EditQuestionBankHandler(id, body, sessionData?.access_token as string),
    ...options,
  });
};
