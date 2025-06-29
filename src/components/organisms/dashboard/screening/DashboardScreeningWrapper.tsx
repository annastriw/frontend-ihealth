"use client";

import CardListScreening from "@/components/molecules/card/CardListScreening";
import { useGetAllScreening } from "@/http/screening/get-all-screening";
import { useGetAllHistoryScreening } from "@/http/screening/get-history-all-screening";
import { useSession } from "next-auth/react";

export default function DashboardScreeningWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllScreening(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const { data: historyScreening } = useGetAllHistoryScreening(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <div className="space-y-4">
      <CardListScreening
        data={data?.data || []}
        isLoading={isPending}
        history={historyScreening?.data || []}
      />
    </div>
  );
}
