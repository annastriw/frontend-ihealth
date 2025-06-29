"use client";

import { useGetDetailHistoryPreTest } from "@/http/history/pre-test/get-detail-pre-test";
import { useSession } from "next-auth/react";
import CardListHistoryQuestion from "@/components/molecules/card/CardListHistoryQuestion";

interface DashboardHistoryPreTestDetailWrapperProps {
  id: string;
}

export default function DashboardHistoryPreTestDetailWrapper({
  id,
}: DashboardHistoryPreTestDetailWrapperProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailHistoryPreTest(
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
