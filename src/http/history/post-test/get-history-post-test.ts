import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { HistoryPostTest } from "@/types/test/post-test";

interface GetAllHistoryPostTestResponse {
  data: HistoryPostTest[];
}

export const GetAllHistoryPostTestHandler = async (
  token: string,
): Promise<GetAllHistoryPostTestResponse> => {
  const { data } = await api.get<GetAllHistoryPostTestResponse>(
    `/post-test/history`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllHistoryPostTest = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllHistoryPostTestResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["history-post-test"],
    queryFn: () => GetAllHistoryPostTestHandler(token),
    ...options,
  });
};
