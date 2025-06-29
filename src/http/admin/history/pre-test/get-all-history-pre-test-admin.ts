import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { HistoryPreTest } from "@/types/test/pre-test";

interface GetAllHistoryPreTestAdminResponse {
  data: HistoryPreTest[];
}

export const GetAllHistoryPreTestAdminHandler = async (
  token: string,
): Promise<GetAllHistoryPreTestAdminResponse> => {
  const { data } = await api.get<GetAllHistoryPreTestAdminResponse>(
    `/history/pre-test`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllHistoryPreTestAdmin = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllHistoryPreTestAdminResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["history-pre-test-admin"],
    queryFn: () => GetAllHistoryPreTestAdminHandler(token),
    ...options,
  });
};
