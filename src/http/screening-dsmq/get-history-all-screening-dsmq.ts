// src/http/screening-dsmq/get-history-all-screening-dsmq.ts
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

/**
 * Tipe data satu riwayat screening DSMQ
 */
export interface ScreeningDSMQHistoryItem {
  id: string;
  created_at: string;
}

/**
 * Response dari GET /screening-dsmq
 */
interface GetAllScreeningDSMQResponse {
  data: ScreeningDSMQHistoryItem[];
}

/**
 * Handler GET /screening-dsmq
 */
export const getAllScreeningDSMQHandler = async (
  token: string,
): Promise<ScreeningDSMQHistoryItem[]> => {
  const response = await api.get<GetAllScreeningDSMQResponse>(
    "/screening-dsmq",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data;
};

/**
 * React Query hook: Ambil semua riwayat screening DSMQ
 */
export const useGetAllHistoryScreeningDSMQ = (
  token: string,
  options?: Partial<UseQueryOptions<ScreeningDSMQHistoryItem[], AxiosError>>,
) => {
  return useQuery({
    queryKey: ["screening-dsmq-history-all"],
    queryFn: () => getAllScreeningDSMQHandler(token),
    enabled: !!token,
    ...options,
  });
};
