import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { DiscussionComment } from "@/types/discussions/discussion";

interface DeleteDiscussionCommentPayload {
  id: string;
  token: string;
}

interface DeleteDiscussionCommentResponse {
  data: DiscussionComment;
}

export const DeleteDiscussionCommentHandler = async ({
  id,
  token,
}: DeleteDiscussionCommentPayload): Promise<DeleteDiscussionCommentResponse> => {
  const { data } = await api.delete(`/discussion/comment/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteDiscussionComment = (
  options?: UseMutationOptions<
    DeleteDiscussionCommentResponse,
    AxiosError<unknown>,
    DeleteDiscussionCommentPayload
  >,
) => {
  return useMutation({
    mutationFn: DeleteDiscussionCommentHandler,
    ...options,
  });
};
