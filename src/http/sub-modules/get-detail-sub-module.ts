import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { SubModules } from "@/types/modules/modules";

interface GetDetailSubModuleResponse {
  data: SubModules;
}

export const GetDetailSubModuleHandler = async (
  id: string,
  token: string,
): Promise<GetDetailSubModuleResponse> => {
  const { data } = await api.get<GetDetailSubModuleResponse>(
    `/sub-modules/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDetailSubModule = (
  id: string,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailSubModuleResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["sub-module-detail", id],
    queryFn: () => GetDetailSubModuleHandler(id, token),
    ...options,
  });
};
