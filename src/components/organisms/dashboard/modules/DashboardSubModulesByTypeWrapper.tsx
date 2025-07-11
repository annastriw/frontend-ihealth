"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useGetAllModules } from "@/http/modulels/get-all-modules";
import { Modules } from "@/types/modules/modules";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import ScreeningWrapper from "@/components/organisms/dashboard/screening/ScreeningWrapper";
import ScreeningScoringWrapper from "@/components/organisms/dashboard/screening-scoring/ScreeningScoringWrapper";
import DashboardSubModulesWrapper from "@/components/organisms/dashboard/sub-modules/DashboardSubModulesWrapper";

const typeMap: Record<string, string> = {
  "hipertensi": "HT",
  "diabetes-melitus": "DM",
  "mental-health": "KM",
};

const typeTitleMap: Record<string, { head: string; body: string }> = {
  "hipertensi": {
    head: "Modul Edukasi Hipertensi",
    body: "Pembelajaran Hipertensi terdiri dari beberapa tahapan penting, yaitu screening untuk mengetahui kondisi awal, pre test untuk mengukur pemahaman awal, materi edukasi, dan post test sebagai evaluasi akhir.",
  },
  "diabetes-melitus": {
    head: "Modul Edukasi Diabetes Melitus",
    body: "Pembelajaran Diabetes Melitus terdiri dari beberapa tahapan penting, yaitu screening untuk mengetahui kondisi awal, pre test untuk mengukur pemahaman awal, materi edukasi, dan post test sebagai evaluasi akhir.",
  },
  "mental-health": {
    head: "Modul Edukasi Kesehatan Mental",
    body: "Pembelajaran Kesehatan Mental terdiri dari beberapa tahapan penting, yaitu screening untuk mengetahui kondisi awal, pre test untuk mengukur pemahaman awal, materi edukasi, dan post test sebagai evaluasi akhir.",
  },
};

interface DashboardSubModulesByTypeWrapperProps {
  type: string;
  withScreening?: boolean;
}

export default function DashboardSubModulesByTypeWrapper({
  type,
  withScreening = false,
}: DashboardSubModulesByTypeWrapperProps) {
  const selectedType = typeMap[type];
  const { data: session, status } = useSession();
  const router = useRouter();

  const [filteredModules, setFilteredModules] = useState<Modules[]>([]);

  const {
    data: modules,
    isLoading,
    isError,
  } = useGetAllModules(session?.access_token as string, selectedType, {
    enabled: status === "authenticated" && !!selectedType,
  });

  useEffect(() => {
    if (modules && modules.length > 0) {
      setFilteredModules(modules);
    }
  }, [modules]);

  if (!selectedType) return <div>Type tidak valid.</div>;
  if (status === "loading" || isLoading) return <div>Loading...</div>;
  if (isError) return <div>Gagal mengambil data modul.</div>;
  if (filteredModules.length === 0) return <div>Tidak ada modul ditemukan.</div>;

  return (
    <div className="space-y-6 px-4 md:px-6 lg:px-8 py-6">
      {/* Judul Halaman */}
      <DashboardTitle
        head={typeTitleMap[type]?.head || "Modul Materi"}
        body={typeTitleMap[type]?.body || ""}
      />

      {/* Screening (jika HT atau DM) */}
      {withScreening && (selectedType === "HT" || selectedType === "DM") && (
        <div className="space-y-4">
          <ScreeningWrapper type={selectedType} />
          <ScreeningScoringWrapper type={selectedType} />
        </div>
      )}

      {/* Pretest → Konten Materi → Posttest per Submodul */}
      <div className="space-y-6">
        {filteredModules.map((module) =>
          module.sub_modules.map((subModule) => (
            <DashboardSubModulesWrapper key={subModule.id} id={subModule.id} />
          ))
        )}
      </div>
    </div>
  );
}
