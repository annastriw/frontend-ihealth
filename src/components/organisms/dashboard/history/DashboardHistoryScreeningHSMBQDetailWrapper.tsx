// src/components/organisms/dashboard/history/DashboardHistoryScreeningHSMBQDetailWrapper.tsx
"use client";

import { useSession } from "next-auth/react";
import { useGetScreeningHSMBQDetail } from "@/http/screening-hsmbq/use-get-screening-hsmbq-detail";
import CardListHistoryQuestionScreeningHSMBQ from "@/components/molecules/card/CardListHistoryQuestionScreeningHSMBQ";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";

interface DashboardHistoryScreeningHSMBQDetailWrapperProps {
  id: string;
}

export default function DashboardHistoryScreeningHSMBQDetailWrapper({
  id,
}: DashboardHistoryScreeningHSMBQDetailWrapperProps) {
  const { data: session, status } = useSession();

  const {
    data,
    isPending,
    isError,
  } = useGetScreeningHSMBQDetail(id, session?.access_token as string, {
    enabled: status === "authenticated" && !!session?.access_token,
  });

  if (isPending) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-3/4 mt-2" />
            <Skeleton className="h-4 w-2/3 mt-2" />
          </div>
        ))}
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
        <AlertTriangle className="h-8 w-8 mb-2" />
        <p>Data tidak ditemukan atau terjadi kesalahan.</p>
      </div>
    );
  }

  const history = data.data;

  return (
    <CardListHistoryQuestionScreeningHSMBQ
      createdAt={history.created_at}
      score={history.score}
      interpretation={history.interpretation}
      description={history.description}
      answers={history.answers}
      isLoading={false}
    />
  );
}
