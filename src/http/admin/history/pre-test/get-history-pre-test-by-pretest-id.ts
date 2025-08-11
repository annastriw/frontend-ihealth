import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { HistoryPreTest } from "@/types/test/pre-test";

interface GetHistoryPreTestByPretestIdResponse {
  data: HistoryPreTest[];
}

export const GetHistoryPreTestByPretestIdHandler = async (
  id: string,
  token: string,
): Promise<GetHistoryPreTestByPretestIdResponse> => {
  const { data } = await api.get<GetHistoryPreTestByPretestIdResponse>(
    `/history/pre-test/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetHistoryPreTestByPretestId = (
  id: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetHistoryPreTestByPretestIdResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["history-pretest-by-pretest-id", id],
    queryFn: () => GetHistoryPreTestByPretestIdHandler(id, token),
    ...options,
  });
};
