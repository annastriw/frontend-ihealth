// src/http/screening-dass/get-history-all-screening-dass.ts
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

/**
 * Tipe data satu riwayat screening DASS
 */
export interface ScreeningDASSHistoryItem {
  id: string;
  created_at: string;
}

/**
 * Response dari GET /screening-dass
 */
interface GetAllScreeningDASSResponse {
  data: ScreeningDASSHistoryItem[];
}

/**
 * Handler GET /screening-dass
 */
export const getAllScreeningDASSHandler = async (
  token: string,
): Promise<ScreeningDASSHistoryItem[]> => {
  const response = await api.get<GetAllScreeningDASSResponse>(
    "/screening-dass",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data;
};

/**
 * React Query hook: Ambil semua riwayat screening DASS
 */
export const useGetAllHistoryScreeningDASS = (
  token: string,
  options?: Partial<UseQueryOptions<ScreeningDASSHistoryItem[], AxiosError>>,
) => {
  return useQuery({
    queryKey: ["screening-dass-history-all"],
    queryFn: () => getAllScreeningDASSHandler(token),
    enabled: !!token,
    ...options,
  });
};
