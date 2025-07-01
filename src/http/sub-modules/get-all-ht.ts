import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { HT } from "@/types/sub-modules/sub-modules";

interface GetAllHTResponse {
  data: HT[];
}

export const GetAllHTHandler = async (
  token: string,
): Promise<GetAllHTResponse> => {
  const { data } = await api.get<GetAllHTResponse>("/hts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllHT = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllHTResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["ht-list"],
    queryFn: () => GetAllHTHandler(token),
    ...options,
  });
};
