import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { DiscussionComment } from "@/types/discussions/discussion";

interface GetAllDiscussionPrivateResponse {
  data: DiscussionComment[];
}

export const GetAllDiscussionPrivateHandler = async (
  token: string,
): Promise<GetAllDiscussionPrivateResponse> => {
  const { data } = await api.get<GetAllDiscussionPrivateResponse>(
    `/discussion/private`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllDiscussionPrivate = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllDiscussionPrivateResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["discussion-private"],
    queryFn: () => GetAllDiscussionPrivateHandler(token),
    ...options,
  });
};
