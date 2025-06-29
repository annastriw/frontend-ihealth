import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { HistoryPostTestDetail } from "@/types/test/post-test";

interface GetDetailHistoryPostTestResponse {
  data: HistoryPostTestDetail;
}

export const GetDetailHistoryPostTestHandler = async (
  id: string,
  token: string,
): Promise<GetDetailHistoryPostTestResponse> => {
  const { data } = await api.get<GetDetailHistoryPostTestResponse>(
    `/post-test/history/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDetailHistoryPostTest = (
  id: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetDetailHistoryPostTestResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["history-post-test-detail", id],
    queryFn: () => GetDetailHistoryPostTestHandler(id, token),
    ...options,
  });
};
