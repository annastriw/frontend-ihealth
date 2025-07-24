// src/components/organisms/dashboard/history/DashboardHistoryScreeningDSMQDetailWrapper.tsx
"use client";

import { useSession } from "next-auth/react";
import { useGetScreeningDSMQDetail } from "@/http/screening-dsmq/use-get-screening-dsmq-detail";
import CardListHistoryQuestionScreeningDSMQ from "@/components/molecules/card/CardListHistoryQuestionScreeningDSMQ";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";

interface DashboardHistoryScreeningDSMQDetailWrapperProps {
  id: string;
}

export default function DashboardHistoryScreeningDSMQDetailWrapper({
  id,
}: DashboardHistoryScreeningDSMQDetailWrapperProps) {
  const { data: session, status } = useSession();

  const {
    data,
    isPending,
    isError,
  } = useGetScreeningDSMQDetail(id, session?.access_token as string, {
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
    <CardListHistoryQuestionScreeningDSMQ
      createdAt={history.created_at}
      score={history.score}
      interpretation={history.interpretation}
      description={history.description}
      answers={history.answers}
      isLoading={false}
    />
  );
}
