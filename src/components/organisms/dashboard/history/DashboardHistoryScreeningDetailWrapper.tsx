"use client";

import { useSession } from "next-auth/react";
import { useGetDetailHistoryScreeningDetail } from "@/http/screening/get-history-detail-screening";
import CardListHistoryQuestionScreening from "@/components/molecules/card/CardListHistoryQuestionScreening";

interface DashboardHistoryScreeningDetailWrapperProps {
  id: string;
}

export default function DashboardHistoryScreeningDetailWrapper({
  id,
}: DashboardHistoryScreeningDetailWrapperProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailHistoryScreeningDetail(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  return (
    <div className="space-y-4">
      <CardListHistoryQuestionScreening
        data={data?.data}
        isLoading={isPending}
      />
    </div>
  );
}
