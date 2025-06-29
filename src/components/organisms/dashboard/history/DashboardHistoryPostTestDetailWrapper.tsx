"use client";

import { useSession } from "next-auth/react";
import CardListHistoryQuestion from "@/components/molecules/card/CardListHistoryQuestion";
import { useGetDetailHistoryPostTest } from "@/http/history/post-test/get-detail-history-post-test";

interface DashboardHistoryPostTestDetailWrapperProps {
  id: string;
}

export default function DashboardHistoryPostTestDetailWrapper({
  id,
}: DashboardHistoryPostTestDetailWrapperProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailHistoryPostTest(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  return (
    <div className="space-y-4">
      <CardListHistoryQuestion data={data?.data} isLoading={isPending} />
    </div>
  );
}
