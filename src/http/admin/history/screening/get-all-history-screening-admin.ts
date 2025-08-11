import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { HistoryScreening } from "@/types/screening/screening";

interface GetAllHistoryScreeningAdminResponse {
  data: HistoryScreening[];
}

export const GetAllHistoryScreeningAdminHandler = async (
  token: string,
): Promise<GetAllHistoryScreeningAdminResponse> => {
  const { data } = await api.get<GetAllHistoryScreeningAdminResponse>(
    `/history/screening`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllHistoryScreeningAdmin = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllHistoryScreeningAdminResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["history-screening-admin"],
    queryFn: () => GetAllHistoryScreeningAdminHandler(token),
    ...options,
  });
};
