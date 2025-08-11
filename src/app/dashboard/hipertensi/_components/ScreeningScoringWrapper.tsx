// src/app/dashboard/hipertensi/_components/ScreeningScoringWrapper.tsx
"use client";

import CardListScreeningScoring from "@/components/molecules/card/CardListScreeningScoring";
import { useGetAllScreeningScoring } from "@/http/screening-scoring/get-all-screening-scoring";
import { useGetAllHistoryScreeningScoring } from "@/http/screening-scoring/get-history-all-screening-scoring";
import { useSession } from "next-auth/react";

export default function ScreeningScoringWrapper() {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetAllScreeningScoring(
    session?.access_token as string,
    "HT", // ✅ Hanya screening scoring untuk Hipertensi
    {
      enabled: status === "authenticated",
    }
  );

  const { data: historyScreeningScoring } = useGetAllHistoryScreeningScoring(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  return (
    <div className="space-y-4">
      <CardListScreeningScoring
        data={data?.data || []}
        isLoading={isPending}
        history={historyScreeningScoring?.data || []}
      />
    </div>
  );
}
