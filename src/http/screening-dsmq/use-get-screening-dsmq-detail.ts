// src/http/screening-dsmq/use-get-screening-dsmq-detail.ts
import { useQuery } from "@tanstack/react-query";
import { getScreeningDSMQDetail } from "./get-screening-dsmq-detail";
import { ScreeningDSMQDetail } from "@/types/screening-dsmq/screening-dsmq-detail";

export function useGetScreeningDSMQDetail(
  id: string,
  token: string,
  options?: { enabled?: boolean },
) {
  return useQuery<{
    data: ScreeningDSMQDetail;
  }>({
    queryKey: ["screening-dsmq-detail", id],
    queryFn: async () => {
      const data = await getScreeningDSMQDetail(id, token);
      return { data };
    },
    enabled: options?.enabled,
  });
}
