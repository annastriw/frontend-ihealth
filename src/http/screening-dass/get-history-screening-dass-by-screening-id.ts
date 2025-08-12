// src/http/screening-dass/get-history-screening-dass-by-screening-id.ts

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { UserHistoryScreeningDASS } from "@/types/screening-dass/screening-dass";

interface GetHistoryScreeningDASSByScreeningIdResponse {
  data: UserHistoryScreeningDASS[];
}

export const GetHistoryScreeningDASSByScreeningIdHandler = async (
  id: string,
  token: string,
): Promise<GetHistoryScreeningDASSByScreeningIdResponse> => {
  const { data } = await api.get<GetHistoryScreeningDASSByScreeningIdResponse>(
    `/history/screening-dass/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetHistoryScreeningDASSByScreeningId = (
  id: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetHistoryScreeningDASSByScreeningIdResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["history-screening-dass-by-screening-id", id],
    queryFn: () => GetHistoryScreeningDASSByScreeningIdHandler(id, token),
    ...options,
  });
};
