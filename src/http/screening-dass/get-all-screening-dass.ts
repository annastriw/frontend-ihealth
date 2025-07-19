// src/http/screening-dass/get-all-screening-dass.ts
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

export interface ScreeningDASSLatest {
  id: string;
  latest_submitted_at: string | null;
}

interface GetLatestScreeningDASSResponse {
  data: ScreeningDASSLatest;
}

/**
 * Handler GET /screening-dass/latest
 */
export const getLatestScreeningDASSHandler = async (
  token: string
): Promise<ScreeningDASSLatest> => {
  const { data } = await api.get<GetLatestScreeningDASSResponse>(
    "/screening-dass/latest",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data.data;
};

/**
 * Hook React Query untuk ambil data latest screening DASS
 */
export const useGetLatestScreeningDASS = (
  token: string,
  options?: Partial<UseQueryOptions<ScreeningDASSLatest, AxiosError>>
) => {
  return useQuery({
    queryKey: ["screening-dass-latest"],
    queryFn: () => getLatestScreeningDASSHandler(token),
    enabled: !!token,
    ...options,
  });
};
