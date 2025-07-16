"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

// Card Components
import CardPersonalInformationUserId from "@/components/molecules/card/CardPersonalInformationUserId";
import CardScoreHistoryScreeningScoring from "@/components/molecules/card/CardScoreHistoryScreeningScoring";
import CardListHistoryQuestionScreeningScoring from "@/components/molecules/card/CardListHistoryQuestionScreeningScoring";
import SearchBarQuestion from "@/components/molecules/search/SearchQuestion";

// API Hooks
import { useGetDetailHistoryScreeningScoring } from "@/http/screening-scoring/get-history-detail-screening-scoring";
import { useGetPersonalInformationByUserId } from "@/http/personal-information/get-personal-information-user-id";
import { useGetDetailUser } from "@/http/users/get-detail-users"; // ✅ Tambahan

interface DashboardAdminReportScreeningScoringDetailWrapperProps {
  historyId: string;
  screeningScoringId: string;
}

export default function DashboardAdminReportScreeningScoringDetailWrapper({
  historyId,
  screeningScoringId,
}: DashboardAdminReportScreeningScoringDetailWrapperProps) {
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  // Get detail screening scoring history
  const {
    data: detailData,
    isLoading: isDetailLoading,
  } = useGetDetailHistoryScreeningScoring(
    historyId,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  // Get user ID from response
  const userId = detailData?.data?.user?.id ?? "";

  // Get detail user (untuk ambil disease_type)
  const { data: userDetail } = useGetDetailUser(
    userId,
    session?.access_token as string,
    {
      enabled: status === "authenticated" && !!userId,
    }
  );

  // Get personal information by user ID
  const {
    data: personal,
    isPending: isPersonalLoading,
  } = useGetPersonalInformationByUserId(
    session?.access_token as string,
    userId,
    {
      enabled: !!userId,
    }
  );

  return (
    <div className="space-y-6">
      {/* Informasi Personal User */}
      <CardPersonalInformationUserId
        data={personal?.data}
        isLoading={isPersonalLoading}
        diseaseType={userDetail?.data?.disease_type} // ✅ Tampilkan Diagnosa Medis
      />

      {/* Total Skor */}
      <CardScoreHistoryScreeningScoring
        score={detailData?.data?.sum_score ?? 0}
        createdAt={detailData?.data?.created_at}
        isLoading={isDetailLoading}
      />

      {/* Search Bar */}
      <SearchBarQuestion onSearch={setSearchQuery} />

      {/* List Soal dan Jawaban */}
      <CardListHistoryQuestionScreeningScoring
        answers={detailData?.data?.answers ?? []}
        searchQuery={searchQuery}
        isLoading={isDetailLoading}
        score={detailData?.data?.sum_score ?? 0}
      />
    </div>
  );
}
