import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { FAQDiscussion } from "@/types/faq/faq";
import { FAQDiscussionType } from "@/validators/faq/faq-discussion-validator";

interface NewFAQDiscussionResponse {
  data: FAQDiscussion;
}

export const addNewFAQDiscussionHandler = async (
  body: FAQDiscussionType,
  token: string,
): Promise<NewFAQDiscussionResponse> => {
  const { data } = await api.post("/faqs", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddNewFAQDiscussion = (
  options?: UseMutationOptions<
    NewFAQDiscussionResponse,
    AxiosError<NewFAQDiscussionResponse>,
    FAQDiscussionType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: FAQDiscussionType) =>
      addNewFAQDiscussionHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
