"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useGetAllModules } from "@/http/modulels/get-all-modules";
import { Modules } from "@/types/modules/modules";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardListModule from "@/components/molecules/card/CardListModule";
import ScreeningWrapper from "@/components/organisms/dashboard/screening/ScreeningWrapper";

const typeMap: Record<string, string> = {
  "hipertensi": "HT",
  "diabetes-melitus": "DM",
  "mental-health": "KM",
};

const typeTitleMap: Record<string, { head: string; body: string }> = {
  "hipertensi": {
    head: "Modul Materi Hipertensi",
    body: "Menampilkan semua submodul dan materi untuk Hipertensi",
  },
  "diabetes-melitus": {
    head: "Modul Materi Diabetes Melitus",
    body: "Menampilkan semua submodul dan materi untuk Diabetes Melitus",
  },
  "mental-health": {
    head: "Modul Materi Kesehatan Mental",
    body: "Menampilkan semua submodul dan materi untuk Kesehatan Mental",
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

  const handleClick = (id: string) => {
    router.push(`/dashboard/modules/${id}`);
  };

  if (!selectedType) return <div>Type tidak valid.</div>;
  if (status === "loading" || isLoading) return <div>Loading...</div>;
  if (isError) return <div>Gagal mengambil data modul.</div>;
  if (filteredModules.length === 0) return <div>Tidak ada modul ditemukan.</div>;

  return (
    <div className="space-y-6 px-4 md:px-6 lg:px-8 py-6">
      <DashboardTitle
        head={typeTitleMap[type]?.head || "Modul Materi"}
        body={typeTitleMap[type]?.body || ""}
      />

      {withScreening && (selectedType === "HT" || selectedType === "DM") && (
        <div className="space-y-4">
          <ScreeningWrapper type={selectedType} />
        </div>
      )}

      <div className="space-y-4">
        <CardListModule
          data={filteredModules}
          isLoading={isLoading}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
