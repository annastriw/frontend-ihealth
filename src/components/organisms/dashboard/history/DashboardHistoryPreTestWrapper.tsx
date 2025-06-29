"use client";

import CardListHistoryPreTest from "@/components/molecules/card/CardListHistoryPreTest";
import { useGetAllHistoryPreTest } from "@/http/test/get-history-pre-test";
import { useSession } from "next-auth/react";

export default function DashboardHistoryPreTestWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllHistoryPreTest(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <div>
      <div className="space-y-4">
        <CardListHistoryPreTest data={data?.data || []} isLoading={isPending} />
      </div>
    </div>
  );
}
