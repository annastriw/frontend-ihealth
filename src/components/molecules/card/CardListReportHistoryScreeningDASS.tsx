// src/components/molecules/card/CardListReportHistoryScreeningDASS.tsx
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileSearch } from "lucide-react";
import Link from "next/link";

export interface ScreeningDASSReportItem {
  id: string;
  created_at: string;
  name: string; // misalnya: "Screening DASS oleh John Doe"
}

interface CardListReportHistoryScreeningDASSProps {
  data: ScreeningDASSReportItem[];
  isLoading: boolean;
}

export default function CardListReportHistoryScreeningDASS({
  data,
  isLoading,
}: CardListReportHistoryScreeningDASSProps) {
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
      {data.map((item) => (
        <Link
          key={item.id}
          href={`/dashboard/admin/reports/history/screening-dass/${item.id}`}
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
                    {item.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Tanggal Submit: {new Date(item.created_at).toLocaleString("id-ID")}
                  </p>
                </div>
              </CardHeader>
            </Card>
          </div>
        </Link>
      ))}
    </div>
  );
}
