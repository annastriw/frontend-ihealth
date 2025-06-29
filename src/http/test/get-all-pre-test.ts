import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { PreTest } from "@/types/test/pre-test";

interface GetAllPreTestResponse {
  data: PreTest[];
}

export const GetAllPreTestHandler = async (
  token: string,
): Promise<GetAllPreTestResponse> => {
  const { data } = await api.get<GetAllPreTestResponse>("/pre-test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllPreTest = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllPreTestResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["pre-test-list"],
    queryFn: () => GetAllPreTestHandler(token),
    ...options,
  });
};
