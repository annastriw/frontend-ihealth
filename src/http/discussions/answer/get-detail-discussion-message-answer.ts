import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { DiscussionComment } from "@/types/discussions/discussion";

interface GetDetailDiscussionCommentAnswerResponse {
  data: DiscussionComment[];
}

export const GetDetailDiscussionCommentAnswerHandler = async (
  id: string,
  token: string,
): Promise<GetDetailDiscussionCommentAnswerResponse> => {
  const { data } = await api.get<GetDetailDiscussionCommentAnswerResponse>(
    `/discussion/comment/answer/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDetailDiscussionCommentAnswer = (
  id: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetDetailDiscussionCommentAnswerResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["discussion-comment-answer", id],
    queryFn: () => GetDetailDiscussionCommentAnswerHandler(id, token),
    ...options,
  });
};
