"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import DashboardModulesBookletWrapper from "@/components/organisms/dashboard/booklet/DashboardModulesBookletWrapper";

interface DashboardModulesBookletPageProps {
  params: Promise<{ id: string }>;
}

export default function DashboardModulesBookletPage({
  params,
}: DashboardModulesBookletPageProps) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then(({ id }) => {
      setId(id);

      // Panggil endpoint untuk update waktu buka
      api
        .post(`/module-content/${id}/opened`)
        .then((res) => {
          console.log("✅ Terakhir buka tercatat:", res.data);
        })
        .catch((err) => {
          console.error("❌ Gagal update buka:", err);
        });
    });
  }, [params]);

  if (!id) return null; // atau tampilkan loader

  return (
    <section>
      <DashboardModulesBookletWrapper id={id} />
    </section>
  );
}
