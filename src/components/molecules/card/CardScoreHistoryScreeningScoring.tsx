// src/components/molecules/card/CardScoreHistoryScreeningScoring.tsx

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatTime } from "@/utils/hours";

// ✅ Fix: ubah tipe createdAt agar bisa string atau Date
interface CardScoreHistoryScreeningScoringProps {
  score: number;
  createdAt?: string | Date;
  isLoading: boolean;
}

export default function CardScoreHistoryScreeningScoring({
  score,
  createdAt,
  isLoading,
}: CardScoreHistoryScreeningScoringProps) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Total Nilai</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-6 w-20" />
          ) : (
            <h1 className="text-xl font-semibold">{score} Poin</h1>
          )}
        </CardContent>
        <CardFooter>
          {isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <p className="text-muted-foreground">
              Dikerjakan pada {formatTime(createdAt)}
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
