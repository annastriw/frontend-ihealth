"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useGetAllModules } from "@/http/modulels/get-all-modules";
import { SubModules } from "@/types/modules/modules";
import CardListSubModule from "@/components/molecules/card/CardListSubModule";

const typeMap: Record<string, string> = {
  "hipertensi": "HT",
  "diabetes-melitus": "DM",
  "mental-health": "KM",
};

interface DashboardSubModulesByTypeWrapperProps {
  type: string;
}

export default function DashboardSubModulesByTypeWrapper({
  type,
}: DashboardSubModulesByTypeWrapperProps) {
  const selectedType = typeMap[type];
  const { data: session, status } = useSession();
  const [subModules, setSubModules] = useState<SubModules[]>([]);

  const {
    data: modules,
    isLoading,
    isError,
  } = useGetAllModules(session?.access_token as string, selectedType, {
    enabled: status === "authenticated" && !!selectedType,
  });

  useEffect(() => {
    if (modules && modules.length > 0) {
      const allSubs = modules.flatMap((mod) => mod.sub_modules || []);
      setSubModules(allSubs);
    }
  }, [modules]);

  if (!selectedType) return <div>Type tidak valid.</div>;
  if (status === "loading" || isLoading) return <div>Loading...</div>;
  if (isError) return <div>Gagal mengambil data submodul.</div>;
  if (subModules.length === 0) return <div>Tidak ada submodul ditemukan.</div>;

  return <CardListSubModule data={subModules} isLoading={isLoading} />;
}
