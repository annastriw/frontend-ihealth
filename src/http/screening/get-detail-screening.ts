import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { TesDetail } from "@/types/test/test-detail";

interface GetDetailScreeningResponse {
  data: TesDetail;
}

export const GetDetailScreeningHandler = async (
  id: string,
  token: string,
): Promise<GetDetailScreeningResponse> => {
  const { data } = await api.get<GetDetailScreeningResponse>(
    `/screening/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDetailScreening = (
  id: string,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailScreeningResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["screening-detail", id],
    queryFn: () => GetDetailScreeningHandler(id, token),
    ...options,
  });
};
