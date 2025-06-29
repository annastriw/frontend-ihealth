"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { TesDetail } from "@/types/test/test-detail";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

interface BreadcrumNavWorkProps {
  data?: TesDetail;
  onBack: () => void;
  currentIndex: number;
  totalQuestions: number;
}

export default function BreadcrumbNavWork({
  data,
  onBack,
  currentIndex,
  totalQuestions,
}: BreadcrumNavWorkProps) {
  const progressPercent =
    totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  return (
    <>
      <nav className="fixed z-50 flex w-full items-center py-2 backdrop-blur dark:bg-slate-950/50">
        <div className="pad-x-xl w-full space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {onBack && (
                <Button variant="ghost" size="icon" onClick={onBack}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/images/assets/bg-about-us.png"
                alt="Sistem Informasi Kesehatan Ginjal"
                width={37}
                height={37}
                className="hidden md:block"
              />
              <h1 className="line-clamp-2 font-semibold uppercase">
                {data?.name}
              </h1>
            </div>

            <div className="flex-shrink-0">
              <span className="text-muted-foreground text-sm font-medium">
                {currentIndex + 1} / {totalQuestions}
              </span>
            </div>
          </div>
          <div>
            <Progress value={progressPercent} className="w-full" />
          </div>
        </div>
      </nav>
    </>
  );
}
