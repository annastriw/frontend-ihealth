import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Screening } from "@/types/screening/screening";

interface GetAllScreeningResponse {
  data: Screening[];
}

export const GetAllScreeningHandler = async (
  token: string,
): Promise<GetAllScreeningResponse> => {
  const { data } = await api.get<GetAllScreeningResponse>("/screening", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllScreening = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllScreeningResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["screening-list"],
    queryFn: () => GetAllScreeningHandler(token),
    ...options,
  });
};
