import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { FAQDiscussion } from "@/types/faq/faq";

interface GetAllFAQDiscussionResponse {
  data: FAQDiscussion[];
}

export const GetAllFAQDiscussionHandler = async (
  token: string,
): Promise<GetAllFAQDiscussionResponse> => {
  const { data } = await api.get<GetAllFAQDiscussionResponse>("/faqs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllFAQDiscussion = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllFAQDiscussionResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["discussion-faq-list"],
    queryFn: () => GetAllFAQDiscussionHandler(token),
    ...options,
  });
};
