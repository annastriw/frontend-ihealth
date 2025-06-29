import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ModulesDetail } from "@/types/modules/modules-detail";

interface GetDetailModulesResponse {
  data: ModulesDetail;
}

export const GetDetailModulesHandler = async (
  id: string,
  token: string,
): Promise<GetDetailModulesResponse> => {
  const { data } = await api.get<GetDetailModulesResponse>(`/modules/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetDetailModules = (
  id: string,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailModulesResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["detail-modules", id],
    queryFn: () => GetDetailModulesHandler(id, token),
    ...options,
  });
};
