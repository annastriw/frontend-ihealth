"use client";

import CardDetailNameOnTest from "@/components/molecules/card/CardDetailNameOnTest";
import CardListHistoryQuestionAdmin from "@/components/molecules/card/CardListHistoryQuestionAdmin";
import CardScoreHistoryPostTest from "@/components/molecules/card/CardScoreHistoryPostTest";
import SearchBarQuestion from "@/components/molecules/search/SearchQuestion";
import { useGetDetailHistoryPostTest } from "@/http/history/post-test/get-detail-history-post-test";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface DashboardAdminReportDetailPostTestWrapperProps {
  id: string;
}

export default function DashboardAdminReportDetailPostTestWrapper({
  id,
}: DashboardAdminReportDetailPostTestWrapperProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailHistoryPostTest(
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
      <CardScoreHistoryPostTest data={data?.data} isLoading={isPending} />
      <SearchBarQuestion onSearch={setSearchQuery} />
      <CardListHistoryQuestionAdmin
        data={data?.data}
        isLoading={isPending}
        searchQuery={searchQuery}
      />
    </div>
  );
}
