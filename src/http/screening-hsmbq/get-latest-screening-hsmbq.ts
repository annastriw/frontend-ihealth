// src/http/screening-hsmbq/get-latest-screening-hsmbq.ts
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

export interface ScreeningHSMBQLatest {
  id: string;
  latest_submitted_at: string | null;
}

interface GetLatestScreeningHSMBQResponse {
  data: ScreeningHSMBQLatest;
}

export const getLatestScreeningHSMBQHandler = async (
  token: string,
): Promise<ScreeningHSMBQLatest> => {
  const { data } = await api.get<GetLatestScreeningHSMBQResponse>(
    "/screening-hsmbq/latest",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data.data;
};

export const useGetLatestScreeningHSMBQ = (
  token: string,
  options?: Partial<UseQueryOptions<ScreeningHSMBQLatest, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["screening-hsmbq-latest"],
    queryFn: () => getLatestScreeningHSMBQHandler(token),
    enabled: !!token,
    ...options,
  });
};
