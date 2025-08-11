"use client";

import CardDetailNameOnTest from "@/components/molecules/card/CardDetailNameOnTest";
import CardListHistoryQuestionAdmin from "@/components/molecules/card/CardListHistoryQuestionAdmin";
import CardScoreHistoryPreTest from "@/components/molecules/card/CardScoreHistoryPreTest";
import SearchBarQuestion from "@/components/molecules/search/SearchQuestion";
import { useGetDetailHistoryPreTest } from "@/http/history/pre-test/get-detail-pre-test";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface DashboardAdminReportDetailPreTestWrapperProps {
  id: string;
}

export default function DashboardAdminReportDetailPreTestWrapper({
  id,
}: DashboardAdminReportDetailPreTestWrapperProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailHistoryPreTest(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="space-y-6">
      <CardDetailNameOnTest name={data?.data.user.name ?? ""} />
      <CardScoreHistoryPreTest data={data?.data} isLoading={isPending} />
      <SearchBarQuestion onSearch={setSearchQuery} />
      <CardListHistoryQuestionAdmin
        data={data?.data}
        isLoading={isPending}
        searchQuery={searchQuery}
      />
    </div>
  );
}
