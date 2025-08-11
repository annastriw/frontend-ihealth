import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { DiscussionComment } from "@/types/discussions/discussion";
import { DiscussionMessageType } from "@/validators/discussion/discussion-message-validator";

interface EditYourQuestionResponse {
  data: DiscussionComment;
}

export const EditYourQuestionHandler = async (
  id: string,
  body: DiscussionMessageType,
  token: string,
): Promise<EditYourQuestionResponse> => {
  const { data } = await api.put(`/discussion/comment/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useEditYourQuestion = (
  options?: UseMutationOptions<
    EditYourQuestionResponse,
    AxiosError<EditYourQuestionResponse>,
    { id: string; body: DiscussionMessageType }
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: ({ id, body }) =>
      EditYourQuestionHandler(id, body, sessionData?.access_token as string),
    ...options,
  });
};
