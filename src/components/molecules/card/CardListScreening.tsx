import DialogStartScreening from "@/components/atoms/dialog/DialogStartScreening";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HistoryScreening, Screening } from "@/types/screening/screening";
import { Check, FileSearch, FileX2 } from "lucide-react";
import { useState } from "react";

interface CardListScreeningProps {
  data: Screening[];
  isLoading: boolean;
  history: HistoryScreening[];
}

export default function CardListScreening({
  data,
  isLoading,
  history,
}: CardListScreeningProps) {
  const [dialogStartScreeningOpen, setDialogStartScreeningOpen] =
    useState(false);
  const [selectedScreeningId, setSelectedScreeningId] = useState<string | null>(
    null,
  );

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

  const handleDialogStartPretestOpen = (id: string) => {
    setSelectedScreeningId(id);
    setDialogStartScreeningOpen(true);
  };

  const isAlreadyTaken = (screeningId: string) => {
    return history?.some((h) => h.screening.id === screeningId);
  };
  return (
    <div>
      {data?.map((screening) => {
        const alreadyTaken = isAlreadyTaken(screening.id);

        return (
          <div
            key={screening.id}
            className={`group block ${
              alreadyTaken ? "cursor-not-allowed opacity-70" : "cursor-pointer"
            }`}
            onClick={() =>
              !alreadyTaken && handleDialogStartPretestOpen(screening.id)
            }
          >
            <div className="flex flex-row gap-6">
              <div
                className={`${
                  alreadyTaken
                    ? "bg-gray-300"
                    : "bg-primary group-hover:bg-secondary"
                } relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg md:flex`}
              >
                <FileSearch className="text-background m-auto h-12 w-12" />
              </div>
              <Card className="border-muted group-hover:bg-muted w-full border-2 shadow-transparent">
                <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <Badge className="bg-secondary">Screening</Badge>
                    <CardTitle className="text-md font-bold md:text-xl">
                      {screening.name}
                    </CardTitle>
                    {alreadyTaken && (
                      <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                        <Check className="h-4 w-4 text-green-500" /> Sudah
                        mengerjakan
                      </div>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        );
      })}
      {selectedScreeningId && (
        <DialogStartScreening
          open={dialogStartScreeningOpen}
          setOpen={setDialogStartScreeningOpen}
          id={selectedScreeningId}
        />
      )}
    </div>
  );
}
