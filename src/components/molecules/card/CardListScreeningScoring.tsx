import DialogStartScreeningScoring from "@/components/atoms/dialog/DialogStartScreeningScoring";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  UserHistoryScreeningScoring,
  ScreeningScoring,
} from "@/types/screening-scoring/screening-scoring";
import { Check, FileSearch, FileX2 } from "lucide-react";
import { useState } from "react";

interface CardListScreeningScoringProps {
  data: ScreeningScoring[];
  isLoading: boolean;
  history: UserHistoryScreeningScoring[];
}

export default function CardListScreeningScoring({
  data,
  isLoading,
  history,
}: CardListScreeningScoringProps) {
  const [dialogStartOpen, setDialogStartOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleOpenDialog = (id: string) => {
    setSelectedId(id);
    setDialogStartOpen(true);
  };

  const isAlreadyTaken = (id: string) => {
    return history?.some((h) => h.screening.id === id);
  };

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

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
        <FileX2 className="text-muted-foreground h-16 w-16" />
        <p className="text-muted-foreground">Data belum ada.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((screening) => {
        const alreadyTaken = isAlreadyTaken(screening.id);
        const latestHistory = history.find((h) => h.screening.id === screening.id);

        return (
          <div
            key={screening.id}
            className="group block cursor-pointer"
            onClick={() => handleOpenDialog(screening.id)}
          >
            <div className="flex flex-row gap-6">
              <div className="relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg bg-primary group-hover:bg-secondary md:flex">
                <FileSearch className="text-background m-auto h-12 w-12" />
              </div>
              <Card className="border-muted group-hover:bg-muted w-full border-2 shadow-transparent">
                <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <Badge className="bg-secondary">Screening Skoring</Badge>
                    <CardTitle className="text-md font-bold md:text-xl">
                      {screening.name}
                    </CardTitle>

                    {alreadyTaken && latestHistory && (
                      <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                        <Check className="h-4 w-4 text-green-500" />
                        Terakhir mengerjakan pada{" "}
                        {new Date(latestHistory.created_at).toLocaleString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        );
      })}

      {selectedId && (
        <DialogStartScreeningScoring
          open={dialogStartOpen}
          setOpen={setDialogStartOpen}
          id={selectedId}
        />
      )}
    </div>
  );
}
