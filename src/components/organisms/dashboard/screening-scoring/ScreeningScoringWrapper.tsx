// src/components/organisms/dashboard/screening-scoring/ScreeningScoringWrapper.tsx
"use client";

import { useSession } from "next-auth/react";
import CardListScreeningScoring from "@/components/molecules/card/CardListScreeningScoring";
import { useGetAllScreeningScoring } from "@/http/screening-scoring/get-all-screening-scoring";
import { useGetAllHistoryScreeningScoring } from "@/http/screening-scoring/get-history-all-screening-scoring";

interface ScreeningScoringWrapperProps {
  type: "HT" | "DM";
}

export default function ScreeningScoringWrapper({ type }: ScreeningScoringWrapperProps) {
  const { data: session, status } = useSession();

  const { data: dataScoring, isPending } = useGetAllScreeningScoring(
    session?.access_token as string,
    type,
    {
      enabled: status === "authenticated",
    }
  );

  const { data: historyScoring } = useGetAllHistoryScreeningScoring(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  return (
    <div className="space-y-4">
      <CardListScreeningScoring
        data={dataScoring?.data || []}
        isLoading={isPending}
        history={historyScoring?.data || []}
      />
    </div>
  );
}
