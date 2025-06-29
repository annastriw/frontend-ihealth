import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Modules } from "@/types/modules/modules";

interface GetAllModulesResponse {
  data: Modules[];
}

export const GetAllModulesHandler = async (
  token: string,
): Promise<GetAllModulesResponse> => {
  const { data } = await api.get<GetAllModulesResponse>("/modules", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllModules = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllModulesResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["modules-list"],
    queryFn: () => GetAllModulesHandler(token),
    ...options,
  });
};
