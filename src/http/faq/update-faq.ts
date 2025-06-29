import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { FAQDiscussion } from "@/types/faq/faq";
import { FAQDiscussionType } from "@/validators/faq/faq-discussion-validator";

interface EditFAQDiscussionResponse {
  data: FAQDiscussion;
}

export const editFAQDiscussionHandler = async (
  id: string,
  body: FAQDiscussionType,
  token: string,
): Promise<EditFAQDiscussionResponse> => {
  const { data } = await api.put(`/faqs/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useEditFAQDiscussion = (
  options?: UseMutationOptions<
    EditFAQDiscussionResponse,
    AxiosError<EditFAQDiscussionResponse>,
    { id: string; body: FAQDiscussionType }
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: ({ id, body }) =>
      editFAQDiscussionHandler(id, body, sessionData?.access_token as string),
    ...options,
  });
};
