import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { CAPD } from "@/types/sub-modules/sub-modules";

interface GetAllCAPDResponse {
  data: CAPD[];
}

export const GetAllCAPDHandler = async (
  token: string,
): Promise<GetAllCAPDResponse> => {
  const { data } = await api.get<GetAllCAPDResponse>("/capds", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllCAPD = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllCAPDResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["capd-list"],
    queryFn: () => GetAllCAPDHandler(token),
    ...options,
  });
};
