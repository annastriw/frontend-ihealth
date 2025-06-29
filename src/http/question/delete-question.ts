import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Question } from "@/types/questions/question";

interface DeleteQuestionPayload {
  id: string;
  token: string;
}

interface DeleteQuestionResponse {
  data: Question;
}

export const DeleteQuestionHandler = async ({
  id,
  token,
}: DeleteQuestionPayload): Promise<DeleteQuestionResponse> => {
  const { data } = await api.delete(`/question/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteQuestion = (
  options?: UseMutationOptions<
    DeleteQuestionResponse,
    AxiosError,
    DeleteQuestionPayload
  >,
) => {
  return useMutation({
    mutationFn: DeleteQuestionHandler,
    ...options,
  });
};
