// src/http/screening-scoring/get-history-screening-scoring-by-screening-scoring-id.ts

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { AdminUserHistoryScreeningScoringByScreening } from "@/types/screening-scoring/screening-scoring";

interface GetHistoryScreeningScoringByScreeningIdResponse {
  data: AdminUserHistoryScreeningScoringByScreening[];
}

/**
 * Handler GET /history/screening-scorings/users/{screeningScoringId}
 */
export const getHistoryScreeningScoringByScreeningIdHandler = async (
  screeningScoringId: string,
  token: string
): Promise<GetHistoryScreeningScoringByScreeningIdResponse> => {
  const { data } =
    await api.get<GetHistoryScreeningScoringByScreeningIdResponse>(
      `/history/screening-scorings/users/${screeningScoringId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return data;
};

/**
 * Hook React Query untuk ambil semua riwayat user berdasarkan ID screening scoring
 */
export const useGetHistoryScreeningScoringByScreeningId = (
  screeningScoringId: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetHistoryScreeningScoringByScreeningIdResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["history-screening-scoring-by-id", screeningScoringId],
    queryFn: () =>
      getHistoryScreeningScoringByScreeningIdHandler(
        screeningScoringId,
        token
      ),
    ...options,
  });
};
