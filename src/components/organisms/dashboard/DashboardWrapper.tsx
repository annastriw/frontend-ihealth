"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardDashboardTitle from "@/components/molecules/card/CardDashboardTitle";
import { History, HeartPulse, Syringe, Brain } from "lucide-react";

export default function DashboardWrapper() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/login");
    return null;
  }

  if (session.user.role === "admin") {
    router.push("/dashboard/admin");
    return null;
  }

  if (session.user.role === "medical_personal") {
    router.push("/dashboard/medical");
    return null;
  }

  return (
    <>
      <DashboardTitle
        head="iHealth Edu"
        body="Selamat datang di Dashboard iHealth Edu. Akses modul edukasi kesehatan, kelola skrining dan hasil tes, serta temukan informasi lengkap untuk mendukung gaya hidup sehat Anda."
      />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <CardDashboardTitle
          title="Diabetes Melitus"
          icon={Syringe}
          description="Pelajari faktor risiko, gejala, dan cara pencegahan serta pengelolaan diabetes secara efektif."
          link="diabetes-melitus"
        />
        <CardDashboardTitle
          title="Hipertensi"
          icon={HeartPulse}
          description="Ketahui cara memantau tekanan darah dan langkah-langkah menjaga tekanan darah tetap normal."
          link="hipertensi"
        />
        <CardDashboardTitle
          title="Kesehatan Mental"
          icon={Brain}
          description="Evaluasi kondisi mental Anda dan dapatkan dukungan serta tips menjaga kesehatan psikologis."
          link="mental-health"
        />
        <CardDashboardTitle
          title="Riwayat"
          icon={History}
          description="Akses riwayat lengkap skrining DSMQ, HSMBQ, DASS-21, serta hasil Pre Test dan Post Test materi yang telah Anda kerjakan."
          link="history"
        />
      </div>
    </>
  );
}
