import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { HD } from "@/types/sub-modules/sub-modules";

interface GetAllHDResponse {
  data: HD[];
}

export const GetAllHDHandler = async (
  token: string,
): Promise<GetAllHDResponse> => {
  const { data } = await api.get<GetAllHDResponse>("/hds", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllHD = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllHDResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["hd-list"],
    queryFn: () => GetAllHDHandler(token),
    ...options,
  });
};
