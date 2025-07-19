// src/http/screening-dass/admin-get-screening-dass-detail.ts
import { useQuery } from "@tanstack/react-query";
import { getScreeningDASSDetail } from "./endpoint-screening-dass-detail";
import { ScreeningDASSDetail } from "@/types/screening-dass/screening-dass-detail";

export function useGetScreeningDASSDetail(
  id: string,
  token: string,
  options?: { enabled?: boolean },
) {
  return useQuery<{
    data: ScreeningDASSDetail;
  }>({
    queryKey: ["screening-dass-detail", id],
    queryFn: async () => {
      const data = await getScreeningDASSDetail(id, token);
      return { data };
    },
    enabled: options?.enabled,
  });
}
