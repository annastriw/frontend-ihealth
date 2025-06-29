import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HistoryPreTestDetail } from "@/types/test/pre-test";
import { formatTime } from "@/utils/hours";

interface CardScoreHistoryPreTestProps {
  data?: HistoryPreTestDetail;
  isLoading: boolean;
}

export default function CardScoreHistoryPreTest({
  data,
  isLoading,
}: CardScoreHistoryPreTestProps) {
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
            <h1 className="text-xl font-semibold">{data?.sum_score} Poin</h1>
          )}
        </CardContent>
        <CardFooter>
          {isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <p className="text-muted-foreground">
              Dikerjakan pada {formatTime(data?.created_at)}
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
