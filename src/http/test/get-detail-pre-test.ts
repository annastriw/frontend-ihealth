import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { TesDetail } from "@/types/test/test-detail";

interface GetDetailPreTestResponse {
  data: TesDetail;
}

export const GetDetailPreTestHandler = async (
  id: string,
  token: string,
): Promise<GetDetailPreTestResponse> => {
  const { data } = await api.get<GetDetailPreTestResponse>(`/pre-test/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetDetailPreTest = (
  id: string,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailPreTestResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["pre-test-detail", id],
    queryFn: () => GetDetailPreTestHandler(id, token),
    ...options,
  });
};
