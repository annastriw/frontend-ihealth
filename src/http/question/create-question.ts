import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Question } from "@/types/questions/question";
import { QuestionType } from "@/validators/question/question-validator";

interface NewQuestionResponse {
  data: Question;
}

export const addNewQuestionHandler = async (
  body: QuestionType,
  token: string,
): Promise<NewQuestionResponse> => {
  const { data } = await api.post("/question", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddNewQuestion = (
  options?: UseMutationOptions<
    NewQuestionResponse,
    AxiosError<NewQuestionResponse>,
    QuestionType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: QuestionType) =>
      addNewQuestionHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
