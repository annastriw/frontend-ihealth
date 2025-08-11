import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { DiscussionDetail } from "@/types/discussions/discussion";

interface GetDetailDiscussionAdminResponse {
  data: DiscussionDetail;
}

export const GetDetailDiscussionAdminHandler = async (
  id: string,
  token: string,
): Promise<GetDetailDiscussionAdminResponse> => {
  const { data } = await api.get<GetDetailDiscussionAdminResponse>(
    `/discussion/admin/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDetailDiscussionAdmin = (
  id: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetDetailDiscussionAdminResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["discussion-detail-admin", id],
    queryFn: () => GetDetailDiscussionAdminHandler(id, token),
    ...options,
  });
};
