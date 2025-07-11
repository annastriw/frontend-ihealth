"use client";

import { ScreeningScoringDetail } from "@/types/screening-scoring/screening-scoring";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

interface BreadcrumbWorkScoringProps {
  data: ScreeningScoringDetail;
  onBack: () => void;
  currentIndex: number;
  totalQuestions: number;
}

export default function BreadcrumbWorkScoring({
  data,
  onBack,
  currentIndex,
  totalQuestions,
}: BreadcrumbWorkScoringProps) {
  const progressPercent =
    totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  return (
    <nav className="fixed z-50 flex w-full items-center py-2 backdrop-blur dark:bg-slate-950/50 bg-white/80">
      <div className="pad-x-xl w-full space-y-4">
        <div className="flex items-center justify-between">
          {/* Kembali */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Judul */}
          <div className="flex items-center gap-2">
            <Image
              src="/images/assets/bg-about-us.png"
              alt="Screening"
              width={37}
              height={37}
              className="hidden md:block"
            />
            <h1 className="line-clamp-2 text-sm sm:text-base font-semibold uppercase">
              {data.name}
            </h1>
          </div>

          {/* Posisi soal */}
          <div className="flex-shrink-0">
            <span className="text-muted-foreground text-sm font-medium">
              {currentIndex + 1} / {totalQuestions}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <Progress value={progressPercent} className="w-full" />
        </div>
      </div>
    </nav>
  );
}
