import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { DiscussionComment } from "@/types/discussions/discussion";

interface GetDiscussionMessageYourQuestionResponse {
  data: DiscussionComment[];
}

export const GetDiscussionMessageYourQuestionHandler = async (
  token: string,
): Promise<GetDiscussionMessageYourQuestionResponse> => {
  const { data } = await api.get<GetDiscussionMessageYourQuestionResponse>(
    `/discussion/comment/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDiscussionMessageYourQuestion = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetDiscussionMessageYourQuestionResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["discussion-your-question"],
    queryFn: () => GetDiscussionMessageYourQuestionHandler(token),
    ...options,
  });
};
