// src/components/atoms/breadcrumb/BreadcrumbWorkScreeningDSMQ.tsx
"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

interface BreadcrumbProps {
  onBack: () => void;
  currentIndex: number;
  totalQuestions: number;
}

export default function BreadcrumbWorkScreeningDSMQ({
  onBack,
  currentIndex,
  totalQuestions,
}: BreadcrumbProps) {
  const percent = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <nav className="fixed z-50 w-full py-2 bg-white/80 backdrop-blur">
      <div className="pad-x-xl space-y-3">
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Image
              src="/images/assets/bg-about-us.png"
              alt="DSMQ"
              width={37}
              height={37}
              className="hidden md:block"
            />
            <h1 className="text-sm sm:text-base font-semibold uppercase">
              Screening DSMQ
            </h1>
          </div>
          <span className="text-muted-foreground text-sm">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>
        <Progress value={percent} className="w-full" />
      </div>
    </nav>
  );
}
