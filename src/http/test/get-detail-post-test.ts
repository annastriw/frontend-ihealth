import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { TesDetail } from "@/types/test/test-detail";

interface GetDetailPostTestResponse {
  data: TesDetail;
}

export const GetDetailPostTestHandler = async (
  id: string,
  token: string,
): Promise<GetDetailPostTestResponse> => {
  const { data } = await api.get<GetDetailPostTestResponse>(
    `/post-test/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDetailPostTest = (
  id: string,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailPostTestResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["post-test-detail", id],
    queryFn: () => GetDetailPostTestHandler(id, token),
    ...options,
  });
};
