"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export default function BreadcrumbPersonalInformation() {
  return (
    <nav className="bg-sidebar fixed z-50 flex h-16 w-full items-center border-b px-6 backdrop-blur dark:bg-slate-950/50">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo/undip.png"
              alt="Sistem Informasi Kesehatan Ginjal"
              width={30}
              height={30}
            />
          </div>
          <h1 className="font-semibold capitalize">Informasi Pribadi</h1>
        </div>
        <div className="pr-8">
          <Button size={"icon"} variant={"ghost"}>
            Panduan
            <Info className="text-primary !h-6 !w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
