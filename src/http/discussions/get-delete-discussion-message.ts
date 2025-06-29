import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { DiscussionComment } from "@/types/discussions/discussion";

interface DeleteDiscussionMessagePayload {
  id: string;
  token: string;
}

interface DeleteDiscussionMessageResponse {
  data: DiscussionComment;
}

export const deleteDiscussionMessageHandler = async ({
  id,
  token,
}: DeleteDiscussionMessagePayload): Promise<DeleteDiscussionMessageResponse> => {
  const { data } = await api.delete(`/discussion/comment/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useDeleteDiscussionMessage = (
  options?: UseMutationOptions<
    DeleteDiscussionMessageResponse,
    AxiosError<DeleteDiscussionMessageResponse>,
    DeleteDiscussionMessagePayload
  >,
) => {
  return useMutation({
    mutationFn: deleteDiscussionMessageHandler,
    ...options,
  });
};
