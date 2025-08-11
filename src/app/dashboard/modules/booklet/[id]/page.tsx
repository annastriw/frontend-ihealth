"use client";

import { useEffect, useState } from "react";
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
    });
  }, [params]);

  if (!id) return null; // atau tampilkan loader

  return (
    <section>
      <DashboardModulesBookletWrapper id={id} />
    </section>
  );
}
