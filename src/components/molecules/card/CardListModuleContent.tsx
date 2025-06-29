"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ModuleContent } from "@/types/modules/modules";
import { Book, Lock } from "lucide-react";
import Link from "next/link";

interface CardListModuleContentProps {
  data?: ModuleContent[];
  isLoading?: boolean;
  isLocked?: boolean;
}

function SubModuleSkeleton() {
  return (
    <div className="flex flex-row gap-6">
      <div className="bg-primary/10 relative hidden aspect-video h-36 w-36 rounded-lg md:flex" />
      <Card className="border-primary/10 w-full border-2 shadow-transparent">
        <CardHeader className="flex md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-6 w-44 rounded-md" />
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

export default function CardListModuleContent({
  data,
  isLoading,
  isLocked = false,
}: CardListModuleContentProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 1 }).map((_, i) => (
          <SubModuleSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data?.map((moduleContent) => {
        const content = (
          <div className="flex flex-row gap-6">
            <div
              className={`${
                isLocked ? "bg-gray-300" : "group-hover:bg-secondary bg-primary"
              } relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg md:flex`}
            >
              <Book className="text-background m-auto h-12 w-12" />
            </div>
            <Card className="border-muted group-hover:bg-muted w-full border-2 shadow-transparent">
              <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <Badge className="bg-secondary/20 text-secondary font-semibold">
                    Booklet Materi
                  </Badge>
                  <CardTitle className="text-md font-bold md:text-xl">
                    {moduleContent.name}
                  </CardTitle>
                  {isLocked && (
                    <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                      <Lock className="text-muted-foreground h-4 w-4" />{" "}
                      Kerjakan Pre Test terlebih dahulu
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>
          </div>
        );

        return isLocked ? (
          <div
            key={moduleContent.id}
            className="group block cursor-not-allowed opacity-70"
          >
            {content}
          </div>
        ) : (
          <Link
            key={moduleContent.id}
            href={`/dashboard/modules/booklet/${moduleContent.id}`}
            className="group block"
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}
