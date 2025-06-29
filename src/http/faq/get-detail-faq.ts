import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { FAQDiscussion } from "@/types/faq/faq";

interface GetDetailFAQDiscussionResponse {
  data: FAQDiscussion;
}

export const GetDetailFAQDiscussionHandler = async (
  id: string,
  token: string,
): Promise<GetDetailFAQDiscussionResponse> => {
  const { data } = await api.get<GetDetailFAQDiscussionResponse>(
    `/faqs/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDetailFAQDiscussion = (
  id: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetDetailFAQDiscussionResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["discussion-faq-list", id],
    queryFn: () => GetDetailFAQDiscussionHandler(id, token),
    ...options,
  });
};
