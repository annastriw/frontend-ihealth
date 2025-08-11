import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { HistoryPostTest } from "@/types/test/post-test";

interface GetAllHistoryPostTestAdminResponse {
  data: HistoryPostTest[];
}

export const GetAllHistoryPostTestAdminHandler = async (
  token: string,
): Promise<GetAllHistoryPostTestAdminResponse> => {
  const { data } = await api.get<GetAllHistoryPostTestAdminResponse>(
    `/history/post-test`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllHistoryPostTestAdmin = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllHistoryPostTestAdminResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["history-post-test-admin"],
    queryFn: () => GetAllHistoryPostTestAdminHandler(token),
    ...options,
  });
};
