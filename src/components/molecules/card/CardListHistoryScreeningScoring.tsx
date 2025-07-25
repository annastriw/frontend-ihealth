// src/components/molecules/card/CardListHistoryScreeningScoring.tsx

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserHistoryScreeningScoring } from "@/types/screening-scoring/screening-scoring";
import { ClipboardPenLine, FileX2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

interface CardListHistoryScreeningScoringProps {
  data: UserHistoryScreeningScoring[];
  isLoading: boolean;
}

export default function CardListHistoryScreeningScoring({
  data,
  isLoading,
}: CardListHistoryScreeningScoringProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div className="flex flex-row gap-6" key={i}>
            <Skeleton className="hidden aspect-video h-36 w-36 rounded-lg md:flex" />
            <Card className="border-muted w-full border-2 shadow-transparent">
              <CardHeader className="space-y-2">
                <Skeleton className="h-5 w-24 rounded" />
                <Skeleton className="h-6 w-64 rounded" />
                <Skeleton className="h-4 w-40 rounded" />
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
        <FileX2 className="text-muted-foreground h-16 w-16" />
        <p className="text-muted-foreground">Belum ada riwayat screening scoring.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((item) => {
        const formattedDate = format(new Date(item.created_at), "dd MMMM yyyy", {
          locale: idLocale,
        });

        return (
          <Link
            href={`/dashboard/history/screening-scoring/${item.id}`}
            key={item.id}
            className="group block"
          >
            <div className="flex flex-row gap-6">
              <div className="group-hover:bg-secondary bg-primary relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg md:flex">
                <ClipboardPenLine className="text-background m-auto h-12 w-12" />
              </div>

              <Card className="border-muted group-hover:bg-muted w-full border-2 shadow-transparent">
                <CardHeader className="space-y-1">
                  <Badge className="bg-secondary">Screening Scoring</Badge>
                  <CardTitle className="text-md font-bold md:text-xl">
                    {item.screening.name}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">{formattedDate}</p>
                </CardHeader>
              </Card>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
