"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardHistoryPostTestDetailWrapper from "@/components/organisms/dashboard/history/DashboardHistoryPostTestDetailWrapper";

export default function ClientPage({ id }: { id: string }) {
  const router = useRouter();

  useEffect(() => {
    const handler = () => {
      const backTo = sessionStorage.getItem("backToSubmoduleId");
      if (backTo) {
        router.replace(`/dashboard/modules/sub/${backTo}`);
      }
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [router]);

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Post Test"
        body="Menampilkan detail riwayat post test"
      />
      <DashboardHistoryPostTestDetailWrapper id={id} />
    </section>
  );
}
