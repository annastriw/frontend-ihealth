"use client";

import DialogStartPreTest from "@/components/atoms/dialog/DialogStartPreTest";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HistoryPreTest, PreTest } from "@/types/test/pre-test";
import { Check, ClipboardPen } from "lucide-react";
import { useState } from "react";

interface CardListPreTestProps {
  data?: PreTest[];
  isLoading?: boolean;
  history?: HistoryPreTest[];
}

function PreTestSkeleton() {
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

export default function CardListPreTest({
  data,
  isLoading,
  history,
}: CardListPreTestProps) {
  const [dialogStartPreTestOpen, setDialogStartPreTestOpen] = useState(false);
  const [selectedPreTestId, setSelectedPreTestId] = useState<string | null>(
    null,
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 1 }).map((_, i) => (
          <PreTestSkeleton key={i} />
        ))}
      </div>
    );
  }

  const handleDialogStartPretestOpen = (id: string) => {
    setSelectedPreTestId(id);
    setDialogStartPreTestOpen(true);
  };

  const isAlreadyTaken = (preTestId: string) => {
    return history?.some((h) => h.pre_test.id === preTestId);
  };

  return (
    <>
      <div className="space-y-4">
        {data?.map((preTest) => {
          const alreadyTaken = isAlreadyTaken(preTest.id);

          return (
            <div
              key={preTest.id}
              className={`group block ${
                alreadyTaken
                  ? "cursor-not-allowed opacity-70"
                  : "cursor-pointer"
              }`}
              onClick={() =>
                !alreadyTaken && handleDialogStartPretestOpen(preTest.id)
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
                  <ClipboardPen className="text-background m-auto h-12 w-12" />
                </div>
                <Card className="border-muted group-hover:bg-muted w-full border-2 shadow-transparent">
                  <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <Badge className="bg-secondary/20 text-secondary font-semibold">
                        Pre Test
                      </Badge>
                      <CardTitle className="text-md font-bold md:text-xl">
                        {preTest.name}
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
        {selectedPreTestId && (
          <DialogStartPreTest
            open={dialogStartPreTestOpen}
            setOpen={setDialogStartPreTestOpen}
            id={selectedPreTestId}
          />
        )}
      </div>
    </>
  );
}
