"use client";

import DialogStartPostTest from "@/components/atoms/dialog/DialogStartPostTest";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HistoryPostTest, PostTest } from "@/types/test/post-test";
import { Check, ClipboardPen, Lock } from "lucide-react";
import { useState } from "react";

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
  isLocked = false,
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
    setSelectedPostTestId(id);
    setDialogStartPostTestOpen(true);
  };

  const isAlreadyTaken = (postTestId: string) => {
    return history?.some((h) => h.post_test.id === postTestId);
  };

  return (
    <div className="space-y-4">
      {data?.map((postTest) => {
        const alreadyTaken = isAlreadyTaken(postTest.id);
        const isDisabled = alreadyTaken || isLocked;

        return (
          <div
            key={postTest.id}
            className={`group block ${
              isDisabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
            }`}
            onClick={() =>
              !isDisabled && handleDialogStartPostTestOpen(postTest.id)
            }
          >
            <div className="flex flex-row gap-6">
              <div
                className={`${
                  isDisabled
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
                      Post Test
                    </Badge>
                    <CardTitle className="text-md font-bold md:text-xl">
                      {postTest.name}
                    </CardTitle>
                    {alreadyTaken && (
                      <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                        <Check className="h-4 w-4 text-green-500" /> Sudah
                        mengerjakan
                      </div>
                    )}
                    {isLocked && !alreadyTaken && (
                      <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                        <Lock className="text-muted-foreground h-4 w-4" />{" "}
                        Kerjakan Pre Test terlebih dahulu
                      </div>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        );
      })}
      {selectedPostTestId && (
        <DialogStartPostTest
          open={dialogStartPostTestOpen}
          setOpen={setDialogStartPostTestOpen}
          id={selectedPostTestId}
        />
      )}
    </div>
  );
}
