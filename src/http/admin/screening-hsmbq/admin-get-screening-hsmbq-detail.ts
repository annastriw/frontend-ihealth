// src/http/admin/screening-hsmbq/admin-get-screening-hsmbq-detail.ts
import { useQuery } from "@tanstack/react-query";
import { getScreeningHSMBQDetail } from "@/http/admin/screening-hsmbq/endpoint-screening-hsmbq-detail";
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
