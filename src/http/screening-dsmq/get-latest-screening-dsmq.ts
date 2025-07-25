// src/http/screening-dsmq/get-latest-screening-dsmq.ts
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

export interface ScreeningDSMQLatest {
  id: string;
  latest_submitted_at: string | null;
}

interface GetLatestScreeningDSMQResponse {
  data: ScreeningDSMQLatest;
}

export const getLatestScreeningDSMQHandler = async (
  token: string,
): Promise<ScreeningDSMQLatest> => {
  const { data } = await api.get<GetLatestScreeningDSMQResponse>(
    "/screening-dsmq/latest",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data.data;
};

export const useGetLatestScreeningDSMQ = (
  token: string,
  options?: Partial<UseQueryOptions<ScreeningDSMQLatest, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["screening-dsmq-latest"],
    queryFn: () => getLatestScreeningDSMQHandler(token),
    enabled: !!token,
    ...options,
  });
};
