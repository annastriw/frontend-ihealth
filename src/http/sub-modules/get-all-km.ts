import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { KM } from "@/types/sub-modules/sub-modules";

interface GetAllKMResponse {
  data: KM[];
}

export const GetAllKMHandler = async (
  token: string,
): Promise<GetAllKMResponse> => {
  const { data } = await api.get<GetAllKMResponse>("/kms", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllKM = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllKMResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["km-list"],
    queryFn: () => GetAllKMHandler(token),
    ...options,
  });
};
