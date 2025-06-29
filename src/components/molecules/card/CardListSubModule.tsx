"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SubModules } from "@/types/modules/modules";
import { Book, FileX2 } from "lucide-react";
import Link from "next/link";

interface CardListSubModuleProps {
  data?: SubModules[];
  isLoading?: boolean;
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

export default function CardListSubModule({
  data,
  isLoading,
}: CardListSubModuleProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SubModuleSkeleton key={i} />
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
      {data?.map((subModule) => (
        <Link
          key={subModule.id}
          href={`/dashboard/modules/sub/${subModule.id}`}
          className="group block"
        >
          <div className="flex flex-row gap-6">
            <div className="group-hover:bg-secondary bg-primary relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg md:flex">
              <Book className="text-background m-auto h-12 w-12" />
            </div>
            <Card className="border-muted group-hover:bg-muted w-full border-2 shadow-transparent">
              <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <Badge className="bg-secondary/20 text-secondary font-semibold">
                    Sub Materi
                  </Badge>
                  <CardTitle className="text-md font-bold md:text-xl">
                    {subModule.name}
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
