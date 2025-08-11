import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { QuestionBank } from "@/types/question-bank/question-bank";
import { QuestionBankType } from "@/validators/question-banks/question-bank-validator";

interface NewQuestionBankResponse {
  data: QuestionBank;
}

export const addNewQuestionBankHandler = async (
  body: QuestionBankType,
  token: string,
): Promise<NewQuestionBankResponse> => {
  const { data } = await api.post("/question-set", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddNewQuestionBank = (
  options?: UseMutationOptions<
    NewQuestionBankResponse,
    AxiosError<NewQuestionBankResponse>,
    QuestionBankType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: QuestionBankType) =>
      addNewQuestionBankHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
