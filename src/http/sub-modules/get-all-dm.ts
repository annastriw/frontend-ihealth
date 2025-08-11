import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { DM } from "@/types/sub-modules/sub-modules";

interface GetAllDMResponse {
  data: DM[];
}

export const GetAllDMHandler = async (
  token: string,
): Promise<GetAllDMResponse> => {
  const { data } = await api.get<GetAllDMResponse>("/dms", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllDM = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllDMResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["dm-list"],
    queryFn: () => GetAllDMHandler(token),
    ...options,
  });
};
