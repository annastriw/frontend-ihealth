import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { DiscussionDetail } from "@/types/discussions/discussion";

interface GetDetailDiscussionResponse {
  data: DiscussionDetail;
}

export const GetDetailDiscussionHandler = async (
  id: string,
  token: string,
): Promise<GetDetailDiscussionResponse> => {
  const { data } = await api.get<GetDetailDiscussionResponse>(
    `/discussion/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDetailDiscussion = (
  id: string,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailDiscussionResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["discussion-detail", id],
    queryFn: () => GetDetailDiscussionHandler(id, token),
    ...options,
  });
};
