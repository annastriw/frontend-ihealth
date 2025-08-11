import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Modules } from "@/types/modules/modules";

interface GetAllModulesUsersResponse {
  data: Modules[];
}

export const GetAllModulesUsersHandler = async (
  type: string,
  token: string,
): Promise<GetAllModulesUsersResponse> => {
  const { data } = await api.get<GetAllModulesUsersResponse>(
    `/modules/users?type=${type}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllModulesUsers = (
  type: string,
  token: string,
  options?: Partial<UseQueryOptions<GetAllModulesUsersResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["modules-list-users", type],
    queryFn: () => GetAllModulesUsersHandler(type, token),
    ...options,
  });
};
