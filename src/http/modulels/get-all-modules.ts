import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Modules } from "@/types/modules/modules";

export const GetAllModulesHandler = async (
  token: string,
  type?: string
): Promise<Modules[]> => {
  const { data } = await api.get<{ data: Modules[] }>("/modules/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: type ? { type } : undefined, // ✅ tambahkan ini
  });

  return data.data;
};

export const useGetAllModules = (
  token: string,
  type?: string,
  options?: Partial<UseQueryOptions<Modules[], AxiosError>>
) => {
  return useQuery({
    queryKey: ["modules-list", type], // ✅ supaya caching berdasarkan type
    queryFn: () => GetAllModulesHandler(token, type), // ✅ tambahkan type
    enabled: !!token && !!type, // ✅ hanya fetch kalau token dan type tersedia
    ...options,
  });
};
