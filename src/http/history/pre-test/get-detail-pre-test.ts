import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { HistoryPreTestDetail } from "@/types/test/pre-test";

interface GetDetailHistoryPreTestResponse {
  data: HistoryPreTestDetail;
}

export const GetDetailHistoryPreTestHandler = async (
  id: string,
  token: string,
): Promise<GetDetailHistoryPreTestResponse> => {
  const { data } = await api.get<GetDetailHistoryPreTestResponse>(
    `/pre-test/history/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDetailHistoryPreTest = (
  id: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetDetailHistoryPreTestResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["history-pre-test-detail", id],
    queryFn: () => GetDetailHistoryPreTestHandler(id, token),
    ...options,
  });
};
