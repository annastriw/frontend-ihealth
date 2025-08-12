// src/components/molecules/card/CardListPostTest.tsx
"use client";

import DialogStartPostTest from "@/components/atoms/dialog/DialogStartPostTest";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HistoryPostTest, PostTest } from "@/types/test/post-test";
import { Check, ClipboardPen } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import clsx from "clsx";

interface CardListPostTestProps {
  data?: PostTest[];
  isLoading?: boolean;
  history?: HistoryPostTest[];
  isLocked?: boolean;
}

function PostTestSkeleton() {
  return (
    <div className="flex flex-row gap-6">
      <div className="bg-primary/10 relative hidden aspect-video h-36 w-36 rounded-lg md:flex" />
      <Card className="border-primary/10 w-full border-2 shadow-transparent">
        <CardHeader className="flex md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-6 w-52 rounded-md" />
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

export default function CardListPostTest({
  data,
  isLoading,
  history,
  isLocked,
}: CardListPostTestProps) {
  const [dialogStartPostTestOpen, setDialogStartPostTestOpen] = useState(false);
  const [selectedPostTestId, setSelectedPostTestId] = useState<string | null>(
    null,
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 1 }).map((_, i) => (
          <PostTestSkeleton key={i} />
        ))}
      </div>
    );
  }

  const handleDialogStartPostTestOpen = (id: string) => {
    if (isLocked) return;
    setSelectedPostTestId(id);
    setDialogStartPostTestOpen(true);
  };

  const findHistory = (postTestId: string) =>
    history?.find((h) => h.post_test.id === postTestId);

  return (
    <div className="space-y-4">
      {data?.map((postTest) => {
        const historyItem = findHistory(postTest.id);
        const alreadyTaken = !!historyItem;

        const formattedDate = historyItem
          ? format(
              new Date(historyItem.created_at),
              "d MMMM yyyy 'pukul' HH:mm",
              {
                locale: idLocale,
              },
            )
          : null;

        return (
          <div
            key={postTest.id}
            onClick={() => handleDialogStartPostTestOpen(postTest.id)}
            className={clsx(
              "group block transition-colors duration-200 ease-in-out",
              isLocked ? "cursor-not-allowed opacity-70" : "cursor-pointer",
            )}
          >
            <div className="flex flex-row gap-6">
              <div
                className={clsx(
                  "relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg transition-colors duration-200 ease-in-out md:flex",
                  isLocked
                    ? "bg-gray-300"
                    : "bg-primary group-hover:bg-secondary",
                )}
              >
                <ClipboardPen className="text-background m-auto h-12 w-12" />
              </div>
              <Card
                className={clsx(
                  "w-full border-2 shadow-transparent transition-colors duration-200 ease-in-out",
                  isLocked
                    ? "border-muted opacity-70"
                    : "border-muted group-hover:bg-muted",
                )}
              >
                <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <Badge className="bg-[oklch(0.9_0.1_145)] font-semibold text-black">
                      Post Test
                    </Badge>
                    <CardTitle className="text-md font-bold md:text-xl">
                      {postTest.name}
                    </CardTitle>

                    {!alreadyTaken && (
                      <div className="text-muted-foreground text-sm font-medium">
                        Belum pernah dikerjakan.
                      </div>
                    )}

                    {alreadyTaken && formattedDate && (
                      <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                        <Check className="h-4 w-4 text-green-500" />
                        Sudah mengerjakan, pada {formattedDate}
                      </div>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        );
      })}

      {selectedPostTestId && !isLocked && (
        <DialogStartPostTest
          open={dialogStartPostTestOpen}
          setOpen={setDialogStartPostTestOpen}
          id={selectedPostTestId}
        />
      )}
    </div>
  );
}
