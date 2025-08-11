import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { HistoryPreTest } from "@/types/test/pre-test";

interface GetAllHistoryPreTestResponse {
  data: HistoryPreTest[];
}

export const GetAllHistoryPreTestHandler = async (
  token: string,
): Promise<GetAllHistoryPreTestResponse> => {
  const { data } = await api.get<GetAllHistoryPreTestResponse>(
    "/pre-test/history",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllHistoryPreTest = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllHistoryPreTestResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["history-pre-test"],
    queryFn: () => GetAllHistoryPreTestHandler(token),
    ...options,
  });
};
