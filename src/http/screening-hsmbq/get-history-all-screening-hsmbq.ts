// src/http/screening-hsmbq/get-history-all-screening-hsmbq.ts
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

/**
 * Tipe data satu riwayat screening HSMBQ
 */
export interface ScreeningHSMBQHistoryItem {
  id: string;
  created_at: string;
}

/**
 * Response dari GET /screening-hsmbq
 */
interface GetAllScreeningHSMBQResponse {
  data: ScreeningHSMBQHistoryItem[];
}

/**
 * Handler GET /screening-hsmbq
 */
export const getAllScreeningHSMBQHandler = async (
  token: string,
): Promise<ScreeningHSMBQHistoryItem[]> => {
  const response = await api.get<GetAllScreeningHSMBQResponse>(
    "/screening-hsmbq",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data;
};

/**
 * React Query hook: Ambil semua riwayat screening HSMBQ
 */
export const useGetAllHistoryScreeningHSMBQ = (
  token: string,
  options?: Partial<UseQueryOptions<ScreeningHSMBQHistoryItem[], AxiosError>>,
) => {
  return useQuery({
    queryKey: ["screening-hsmbq-history-all"],
    queryFn: () => getAllScreeningHSMBQHandler(token),
    enabled: !!token,
    ...options,
  });
};
