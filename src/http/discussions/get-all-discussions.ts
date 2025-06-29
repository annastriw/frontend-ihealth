import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Discussion } from "@/types/discussions/discussion";

interface GetAllDiscussionResponse {
  data: Discussion[];
}

export const GetAllDiscussionHandler = async (
  token: string,
): Promise<GetAllDiscussionResponse> => {
  const { data } = await api.get<GetAllDiscussionResponse>("/discussion", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllDiscussion = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllDiscussionResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["discussion-list"],
    queryFn: () => GetAllDiscussionHandler(token),
    ...options,
  });
};
