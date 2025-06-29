import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { SubModules } from "@/types/modules/modules";

interface GetAllSubModuleResponse {
  data: SubModules[];
}

export const GetAllSubModuleHandler = async (
  id: string,
  token: string,
): Promise<GetAllSubModuleResponse> => {
  const { data } = await api.get<GetAllSubModuleResponse>(
    `/sub-modules/category/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllSubModule = (
  id: string,
  token: string,
  options?: Partial<UseQueryOptions<GetAllSubModuleResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["sub-module", id],
    queryFn: () => GetAllSubModuleHandler(id, token),
    ...options,
  });
};
