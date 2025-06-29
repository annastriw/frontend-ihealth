import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Screening } from "@/types/screening/screening";
import { FileSearch } from "lucide-react";
import Link from "next/link";

interface CardListReportHistoryScreeningProps {
  data: Screening[];
  isLoading: boolean;
}

export default function CardListReportHistoryScreening({
  data,
  isLoading,
}: CardListReportHistoryScreeningProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div className="flex flex-row gap-6" key={i}>
            <Skeleton className="hidden aspect-video h-36 w-36 rounded-lg md:flex" />
            <Card className="border-muted w-full border-2 shadow-transparent">
              <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24 rounded" />
                  <Skeleton className="h-6 w-64 rounded" />
                  <Skeleton className="h-4 w-40 rounded" />
                </div>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {data.map((screening) => (
        <Link
          href={`/dashboard/admin/reports/history/screening/${screening.id}`}
          key={screening.id}
          className="group block cursor-pointer"
        >
          <div className="flex flex-row gap-6">
            <div className="group-hover:bg-secondary bg-primary relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg md:flex">
              <FileSearch className="text-background m-auto h-12 w-12" />
            </div>
            <Card className="border-muted group-hover:bg-muted w-full border-2 shadow-transparent">
              <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-md font-bold md:text-xl">
                    {screening.name}
                  </CardTitle>
                </div>
              </CardHeader>
            </Card>
          </div>
        </Link>
      ))}
    </div>
  );
}
