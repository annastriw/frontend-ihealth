import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Modules } from "@/types/modules/modules";

export const GetAllModulesHandler = async (
  token: string
): Promise<Modules[]> => {
  const { data } = await api.get<{ data: Modules[] }>("/modules/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
};

export const useGetAllModules = (
  token: string,
  options?: Partial<UseQueryOptions<Modules[], AxiosError>>
) => {
  return useQuery({
    queryKey: ["modules-list"],
    queryFn: () => GetAllModulesHandler(token),
    enabled: !!token,
    ...options,
  });
};
