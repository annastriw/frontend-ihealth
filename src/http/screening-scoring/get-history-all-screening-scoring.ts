// src/http/screening-scoring/get-history-all-screening-scoring.ts

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { UserHistoryScreeningScoring } from "@/types/screening-scoring/screening-scoring";

interface GetAllHistoryScreeningScoringResponse {
  data: UserHistoryScreeningScoring[];
}

/**
 * Handler GET /screening-scorings/history
 */
export const getAllHistoryScreeningScoringHandler = async (
  token: string
): Promise<GetAllHistoryScreeningScoringResponse> => {
  const { data } = await api.get<GetAllHistoryScreeningScoringResponse>(
    "/screening-scorings/history",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

/**
 * Hook React Query untuk ambil seluruh riwayat screening scoring milik user login
 */
export const useGetAllHistoryScreeningScoring = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllHistoryScreeningScoringResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["history-screening-scoring"],
    queryFn: () => getAllHistoryScreeningScoringHandler(token),
    ...options,
  });
};
