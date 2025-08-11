import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { SubModules } from "@/types/modules/modules";

interface GetAllSubModulesNoCategoryResponse {
  data: SubModules[];
}

export const GetAllSubModulesNoCategoryHandler = async (
  token: string,
): Promise<GetAllSubModulesNoCategoryResponse> => {
  const { data } = await api.get<GetAllSubModulesNoCategoryResponse>(
    `/sub-modules`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllSubModulesNoCategory = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllSubModulesNoCategoryResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["sub-modules"],
    queryFn: () => GetAllSubModulesNoCategoryHandler(token),
    ...options,
  });
};
