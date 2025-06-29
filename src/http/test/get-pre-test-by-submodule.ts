import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { PreTest } from "@/types/test/pre-test";

interface GetAllPreTestBySubModuleResponse {
  data: PreTest[];
}

export const GetAllPreTestBySubModuleHandler = async (
  id: string,
  token: string,
): Promise<GetAllPreTestBySubModuleResponse> => {
  const { data } = await api.get<GetAllPreTestBySubModuleResponse>(
    `/pre-test/sub/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllPreTestBySubModule = (
  id: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllPreTestBySubModuleResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["pre-test-sub", id],
    queryFn: () => GetAllPreTestBySubModuleHandler(id, token),
    ...options,
  });
};
