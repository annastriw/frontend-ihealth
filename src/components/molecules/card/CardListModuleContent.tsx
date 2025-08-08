// src/components/molecules/card/CardListModuleContent.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Book } from "lucide-react";
import { api } from "@/lib/axios";
import { ModuleContent } from "@/types/modules/modules";
import { CheckCircle } from "lucide-react";

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
  isLocked,
}: CardListModuleContentProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.access_token;
  const [openedMap, setOpenedMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchLastOpened = async () => {
      if (!data || !token) return;

      const results: Record<string, string> = {};
      await Promise.all(
        data.map(async (item) => {
          try {
            const res = await api.get(`/module-contents/${item.id}/opened`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (res.data?.last_opened_at) {
              results[item.id] = res.data.last_opened_at;
            }
          } catch (err) {
            console.error(
              `❌ Gagal ambil last_opened_at untuk ${item.id}`,
              err,
            );
          }
        }),
      );
      setOpenedMap(results);
    };

    fetchLastOpened();
  }, [data, token]);

  const handleClick = async (id: string) => {
    if (isLocked) return; // cegah klik kalau terkunci
    try {
      if (token) {
        await api.post(
          `/module-contents/${id}/opened`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }
    } catch (err) {
      console.error("❌ Gagal mencatat waktu buka", err);
    }
    router.push(`/dashboard/modules/booklet/${id}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(1)].map((_, i) => (
          <SubModuleSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data?.map((moduleContent) => {
        const lastOpenedAt = openedMap[moduleContent.id];

        return (
          <div
            key={moduleContent.id}
            onClick={() => handleClick(moduleContent.id)}
            className={`group block ${
              isLocked ? "cursor-not-allowed opacity-70" : "cursor-pointer"
            }`}
          >
            <div className="flex flex-row gap-6">
              <div
                className={`relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg transition-colors duration-200 ease-in-out md:flex ${
                  isLocked
                    ? "bg-gray-300"
                    : "bg-primary group-hover:bg-secondary"
                }`}
              >
                <Book className="text-background m-auto h-12 w-12" />
              </div>
              <Card
                className={`w-full border-2 shadow-transparent transition-colors duration-200 ease-in-out ${
                  isLocked
                    ? "border-muted opacity-70"
                    : "border-muted group-hover:bg-muted"
                }`}
              >
                <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <Badge className="bg-[oklch(0.9_0.1_145)] font-semibold text-black">
                      Booklet Materi
                    </Badge>
                    <CardTitle className="text-md font-bold md:text-xl">
                      {moduleContent.name}
                    </CardTitle>

                    {lastOpenedAt && (
                      <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>
                          Terakhir membuka materi, pada{" "}
                          {new Intl.DateTimeFormat("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }).format(new Date(lastOpenedAt))}{" "}
                          pukul{" "}
                          {new Intl.DateTimeFormat("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                            timeZone: "Asia/Jakarta",
                          }).format(new Date(lastOpenedAt))}
                        </span>
                      </div>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        );
      })}
    </div>
  );
}
