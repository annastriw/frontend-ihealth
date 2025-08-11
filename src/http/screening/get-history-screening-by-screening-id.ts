import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { HistoryScreening } from "@/types/screening/screening";

interface GetHistoryScreeningByScreeningIdResponse {
  data: HistoryScreening[];
}

export const GetHistoryScreeningByScreeningIdHandler = async (
  id: string,
  token: string,
): Promise<GetHistoryScreeningByScreeningIdResponse> => {
  const { data } = await api.get<GetHistoryScreeningByScreeningIdResponse>(
    `/history/screening/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetHistoryScreeningByScreeningId = (
  id: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetHistoryScreeningByScreeningIdResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["history-screening-by-screening-id", id],
    queryFn: () => GetHistoryScreeningByScreeningIdHandler(id, token),
    ...options,
  });
};
