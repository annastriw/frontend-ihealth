import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { HistoryScreening } from "@/types/screening/screening";

interface GetAllHistoryScreeningResponse {
  data: HistoryScreening[];
}

export const GetAllHistoryScreeningHandler = async (
  token: string,
): Promise<GetAllHistoryScreeningResponse> => {
  const { data } = await api.get<GetAllHistoryScreeningResponse>(
    "/screening/history",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllHistoryScreening = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllHistoryScreeningResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["history-screening"],
    queryFn: () => GetAllHistoryScreeningHandler(token),
    ...options,
  });
};
