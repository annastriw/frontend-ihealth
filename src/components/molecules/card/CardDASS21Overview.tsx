// src/components/molecules/card/CardDASS21Overview.tsx
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch } from "lucide-react";
import Link from "next/link";

export default function CardDASS21Overview() {
  return (
    <Link href="/dashboard/admin/reports/history/screening-dass" className="group block cursor-pointer">
      <div className="flex flex-row gap-6">
        <div className="group-hover:bg-secondary bg-primary relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg md:flex">
          <FileSearch className="text-background m-auto h-12 w-12" />
        </div>
        <Card className="border-muted group-hover:bg-muted w-full border-2 shadow-transparent">
          <CardHeader className="flex md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <CardTitle className="text-md font-bold md:text-xl">
                Screening Kesehatan Mental DASS-21
              </CardTitle>
              <p className="text-sm text-muted-foreground">Tipe: Kesehatan Mental</p>
            </div>
          </CardHeader>
        </Card>
      </div>
    </Link>
  );
}
