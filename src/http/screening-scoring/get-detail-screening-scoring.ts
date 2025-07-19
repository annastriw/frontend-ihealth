// src/http/screening-scoring/get-detail-screening-scoring.ts

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ScreeningScoringDetail } from "@/types/screening-scoring/screening-scoring";

interface GetDetailScreeningScoringResponse {
  data: ScreeningScoringDetail;
}

/**
 * Handler GET /screening-scorings/{id}
 */
export const getDetailScreeningScoringHandler = async (
  id: string,
  token: string
): Promise<GetDetailScreeningScoringResponse> => {
  const { data } = await api.get<GetDetailScreeningScoringResponse>(
    `/screening-scorings/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

/**
 * Hook React Query untuk ambil detail screening scoring by ID
 */
export const useGetDetailScreeningScoring = (
  id: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetDetailScreeningScoringResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["screening-scoring-detail", id],
    queryFn: () => getDetailScreeningScoringHandler(id, token),
    ...options,
  });
};
