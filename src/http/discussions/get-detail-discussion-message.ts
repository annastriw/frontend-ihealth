import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { DiscussionComment } from "@/types/discussions/discussion";

interface GetDetailDiscussionCommentResponse {
  data: DiscussionComment;
}

export const GetDetailDiscussionCommentHandler = async (
  id: string,
  token: string,
): Promise<GetDetailDiscussionCommentResponse> => {
  const { data } = await api.get<GetDetailDiscussionCommentResponse>(
    `/discussion/comment/detail/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDetailDiscussionComment = (
  id: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetDetailDiscussionCommentResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["discussion-comment", id],
    queryFn: () => GetDetailDiscussionCommentHandler(id, token),
    ...options,
  });
};
