import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Question } from "@/types/questions/question";
import { QuestionType } from "@/validators/question/question-validator";

interface EditQuestionResponse {
  data: Question;
}

export const EditQuestionHandler = async (
  id: string,
  body: QuestionType,
  token: string,
): Promise<EditQuestionResponse> => {
  const { data } = await api.put(`/question/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useEditQuestion = (
  options?: UseMutationOptions<
    EditQuestionResponse,
    AxiosError,
    { id: string; body: QuestionType }
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: ({ id, body }) =>
      EditQuestionHandler(id, body, sessionData?.access_token as string),
    ...options,
  });
};
