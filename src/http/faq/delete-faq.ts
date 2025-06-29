import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { FAQDiscussion } from "@/types/faq/faq";

interface DeleteFAQDiscussionPayload {
  id: string;
  token: string;
}

interface DeleteFAQDiscussionResponse {
  data: FAQDiscussion;
}

export const deleteFAQDiscussionHandler = async ({
  id,
  token,
}: DeleteFAQDiscussionPayload): Promise<DeleteFAQDiscussionResponse> => {
  const { data } = await api.delete(`/faqs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useDeleteFAQDiscussion = (
  options?: UseMutationOptions<
    DeleteFAQDiscussionResponse,
    AxiosError<DeleteFAQDiscussionResponse>,
    DeleteFAQDiscussionPayload
  >,
) => {
  return useMutation({
    mutationFn: deleteFAQDiscussionHandler,
    ...options,
  });
};
