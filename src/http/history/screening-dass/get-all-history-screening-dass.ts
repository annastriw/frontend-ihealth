// src/http/history/screening-dass/get-all-history-screening-dass.ts
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { AdminScreeningDASSHistoryItem } from "@/types/screening-dass/admin-screening-dass";

// Tipe respons backend (dari Laravel)
interface GetAllHistoryScreeningDASSResponse {
  data: AdminScreeningDASSHistoryItem[];
}

// Fungsi handler untuk fetch data
export const GetAllHistoryScreeningDASSHandler = async (
  token: string,
): Promise<GetAllHistoryScreeningDASSResponse> => {
  const { data } = await api.get<GetAllHistoryScreeningDASSResponse>(
    "/admin/screening-dass-histories",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

// React Query hook
export const useGetAllHistoryScreeningDASS = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllHistoryScreeningDASSResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["all-history-screening-dass"],
    queryFn: () => GetAllHistoryScreeningDASSHandler(token),
    ...options,
  });
};
