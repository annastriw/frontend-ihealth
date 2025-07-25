// src/http/screening-hsmbq/use-get-screening-hsmbq-detail.ts
import { useQuery } from "@tanstack/react-query";
import { getScreeningHSMBQDetail } from "./get-screening-hsmbq-detail";
import { ScreeningHSMBQDetail } from "@/types/screening-hsmbq/screening-hsmbq-detail";

export function useGetScreeningHSMBQDetail(
  id: string,
  token: string,
  options?: { enabled?: boolean },
) {
  return useQuery<{
    data: ScreeningHSMBQDetail;
  }>({
    queryKey: ["screening-hsmbq-detail", id],
    queryFn: async () => {
      const data = await getScreeningHSMBQDetail(id, token);
      return { data };
    },
    enabled: options?.enabled,
  });
}
