"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Book, Lock } from "lucide-react";
import { api } from "@/lib/axios";
import { ModuleContent } from "@/types/modules/modules";

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
            console.error(`❌ Gagal ambil last_opened_at untuk ${item.id}`, err);
          }
        })
      );
      setOpenedMap(results);
    };

    fetchLastOpened();
  }, [data, token]);

  const handleClick = async (id: string) => {
    try {
      if (token) {
        await api.post(`/module-contents/${id}/opened`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

                  {lastOpenedAt && (
                    <p className="text-muted-foreground text-sm font-normal">
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
                    </p>
                  )}

                  {isLocked && (
                    <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                      <Lock className="text-muted-foreground h-4 w-4" />
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
          <button
            key={moduleContent.id}
            onClick={() => handleClick(moduleContent.id)}
            className="group block w-full text-left"
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
