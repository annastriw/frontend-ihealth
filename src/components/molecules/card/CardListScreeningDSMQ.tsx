"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  getLatestScreeningDSMQHandler,
  ScreeningDSMQLatest,
} from "@/http/screening-dsmq/get-latest-screening-dsmq";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileSearch, Check } from "lucide-react";
import DialogStartScreeningDSMQ from "@/components/atoms/dialog/DialogStartScreeningDSMQ";

export default function CardListScreeningDSMQ() {
  const { data: session, status } = useSession();
  const [latest, setLatest] = useState<ScreeningDSMQLatest | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (status !== "authenticated" || !session?.access_token) return;

    getLatestScreeningDSMQHandler(session.access_token)
      .then((res) => {
        console.log("✅ Latest DSMQ response:", res);
        setLatest(res);
      })
      .catch((err) => console.error("❌ Error fetching latest DSMQ", err))
      .finally(() => setLoading(false));
  }, [status, session?.access_token]);

  if (loading) {
    return (
      <div className="flex flex-row gap-6">
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
    );
  }

  const formattedDate = latest?.latest_submitted_at
    ? new Date(Date.parse(latest.latest_submitted_at)).toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <>
      <div
        className="group block cursor-pointer"
        onClick={() => setDialogOpen(true)}
      >
        <div className="flex flex-row gap-6">
          <div className="relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg bg-primary group-hover:bg-secondary md:flex">
            <FileSearch className="text-background m-auto h-12 w-12" />
          </div>
          <Card className="border-muted group-hover:bg-muted w-full border-2 shadow-transparent">
            <CardHeader className="flex md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <Badge className="bg-secondary">Screening DSMQ</Badge>
                <CardTitle className="text-md font-bold md:text-xl">
                  Diabetes Self-Management Questionnaire (DSMQ)
                </CardTitle>

                {formattedDate ? (
                  <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                    <Check className="h-4 w-4 text-green-500" />
                    Terakhir mengerjakan pada {formattedDate}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-sm font-medium">
                    Belum pernah dikerjakan.
                  </div>
                )}
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Dialog Konfirmasi */}
      <DialogStartScreeningDSMQ
        open={dialogOpen}
        setOpen={setDialogOpen}
        id={latest?.id ?? ""}
      />
    </>
  );
}
