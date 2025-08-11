import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { AdminScreeningHSMBQHistoryItem } from "@/types/screening-hsmbq/admin-screening-hsmbq";

// Tipe respons backend
interface GetAllHistoryScreeningHSMBQResponse {
  data: AdminScreeningHSMBQHistoryItem[];
}

// Fungsi handler untuk fetch data
export const GetAllHistoryScreeningHSMBQHandler = async (
  token: string,
): Promise<GetAllHistoryScreeningHSMBQResponse> => {
  const { data } = await api.get<GetAllHistoryScreeningHSMBQResponse>(
    "/medical/screening-hsmbq-histories",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

// React Query hook
export const useGetAllHistoryScreeningHSMBQ = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllHistoryScreeningHSMBQResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["all-history-screening-hsmbq"],
    queryFn: () => GetAllHistoryScreeningHSMBQHandler(token),
    ...options,
  });
};
