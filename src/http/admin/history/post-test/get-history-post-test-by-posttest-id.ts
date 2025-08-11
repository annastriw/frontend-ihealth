import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { HistoryPostTest } from "@/types/test/post-test";

interface GetHistoryPostTestByPostTestIdResponse {
  data: HistoryPostTest[];
}

export const GetHistoryPostTestByPostTestIdHandler = async (
  id: string,
  token: string,
): Promise<GetHistoryPostTestByPostTestIdResponse> => {
  const { data } = await api.get<GetHistoryPostTestByPostTestIdResponse>(
    `/history/post-test/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetHistoryPostTestByPostTestId = (
  id: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetHistoryPostTestByPostTestIdResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["history-posttest-by-posttest-id", id],
    queryFn: () => GetHistoryPostTestByPostTestIdHandler(id, token),
    ...options,
  });
};
