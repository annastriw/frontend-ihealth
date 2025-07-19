// src/http/screening-scoring/get-history-detail-screening-scoring.ts

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { UserHistoryScreeningScoringDetail } from "@/types/screening-scoring/screening-scoring";

interface GetDetailHistoryScreeningScoringResponse {
  data: UserHistoryScreeningScoringDetail;
}

/**
 * Handler GET /screening-scorings/history/{id}
 */
export const getDetailHistoryScreeningScoringHandler = async (
  id: string,
  token: string
): Promise<GetDetailHistoryScreeningScoringResponse> => {
  const { data } = await api.get<GetDetailHistoryScreeningScoringResponse>(
    `/screening-scorings/history/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

/**
 * Hook React Query untuk ambil detail hasil screening scoring milik user
 */
export const useGetDetailHistoryScreeningScoring = (
  id: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetDetailHistoryScreeningScoringResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["history-screening-scoring-detail", id],
    queryFn: () => getDetailHistoryScreeningScoringHandler(id, token),
    ...options,
  });
};
