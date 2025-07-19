// src/http/admin/history/screening-scoring/get-all-history-screening-scoring-admin.ts

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { AdminUserHistoryScreeningScoring } from "@/types/screening-scoring/screening-scoring";

interface GetAllHistoryScreeningScoringAdminResponse {
  data: AdminUserHistoryScreeningScoring[];
}

/**
 * Handler GET /history/screening-scorings
 */
export const getAllHistoryScreeningScoringAdminHandler = async (
  token: string
): Promise<GetAllHistoryScreeningScoringAdminResponse> => {
  const { data } = await api.get<GetAllHistoryScreeningScoringAdminResponse>(
    `/history/screening-scorings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

/**
 * React Query Hook untuk Admin: Ambil semua riwayat screening scoring user
 */
export const useGetAllHistoryScreeningScoringAdmin = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllHistoryScreeningScoringAdminResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["admin-history-screening-scoring"],
    queryFn: () => getAllHistoryScreeningScoringAdminHandler(token),
    ...options,
  });
};
