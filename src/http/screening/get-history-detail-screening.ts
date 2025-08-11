import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { HistoryScreeningDetail } from "@/types/screening/screening";

interface GetDetailHistoryScreeningDetailResponse {
  data: HistoryScreeningDetail;
}

export const GetDetailHistoryScreeningDetailHandler = async (
  id: string,
  token: string,
): Promise<GetDetailHistoryScreeningDetailResponse> => {
  const { data } = await api.get<GetDetailHistoryScreeningDetailResponse>(
    `/screening/history/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDetailHistoryScreeningDetail = (
  id: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetDetailHistoryScreeningDetailResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["history-screening-detail", id],
    queryFn: () => GetDetailHistoryScreeningDetailHandler(id, token),
    ...options,
  });
};
