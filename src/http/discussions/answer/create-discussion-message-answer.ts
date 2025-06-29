import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { DiscussionComment } from "@/types/discussions/discussion";
import { DiscussionMessageAnswerType } from "@/validators/discussion/discussion-message-answer-validator";

interface NewDiscussionMessageAnswerResponse {
  data: DiscussionComment;
}

export const addNewDiscussionMessageAnswerHandler = async (
  body: DiscussionMessageAnswerType,
  token: string,
): Promise<NewDiscussionMessageAnswerResponse> => {
  const formData = new FormData();

  formData.append("discussion_comment_id", body.discussion_comment_id);
  formData.append("comment", body.comment);

  if (body.image) {
    formData.append("image", body.image);
  }

  const { data } = await api.post("/discussion/comment/answer", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const useAddNewDiscussionMessageAnswer = (
  options?: UseMutationOptions<
    NewDiscussionMessageAnswerResponse,
    AxiosError<NewDiscussionMessageAnswerResponse>,
    DiscussionMessageAnswerType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: DiscussionMessageAnswerType) =>
      addNewDiscussionMessageAnswerHandler(
        body,
        sessionData?.access_token as string,
      ),
    ...options,
  });
};
