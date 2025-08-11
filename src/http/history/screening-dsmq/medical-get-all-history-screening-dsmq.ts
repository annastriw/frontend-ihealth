import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { AdminScreeningDSMQHistoryItem } from "@/types/screening-dsmq/admin-screening-dsmq";

// Tipe respons backend
interface GetAllHistoryScreeningDSMQResponse {
  data: AdminScreeningDSMQHistoryItem[];
}

// Fungsi handler untuk fetch data
export const GetAllHistoryScreeningDSMQHandler = async (
  token: string,
): Promise<GetAllHistoryScreeningDSMQResponse> => {
  const { data } = await api.get<GetAllHistoryScreeningDSMQResponse>(
    "/medical/screening-dsmq-histories",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

// React Query hook
export const useGetAllHistoryScreeningDSMQ = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllHistoryScreeningDSMQResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["all-history-screening-dsmq"],
    queryFn: () => GetAllHistoryScreeningDSMQHandler(token),
    ...options,
  });
};
