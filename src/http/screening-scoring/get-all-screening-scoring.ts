// src/http/screening-scoring/get-all-screening-scoring.ts

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ScreeningScoring } from "@/types/screening-scoring/screening-scoring";

interface GetAllScreeningScoringResponse {
  data: ScreeningScoring[];
}

/**
 * Handler GET /screening-scorings
 */
export const getAllScreeningScoringHandler = async (
  token: string,
  type?: string
): Promise<GetAllScreeningScoringResponse> => {
  const { data } = await api.get<GetAllScreeningScoringResponse>(
    "/screening-scorings",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        type: type,
      },
    }
  );

  return data;
};

/**
 * Hook React Query untuk ambil semua screening scoring (by optional type)
 */
export const useGetAllScreeningScoring = (
  token: string,
  type?: string,
  options?: Partial<UseQueryOptions<GetAllScreeningScoringResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["screening-scoring-list", type],
    queryFn: () => getAllScreeningScoringHandler(token, type),
    ...options,
  });
};
