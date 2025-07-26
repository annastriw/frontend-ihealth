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
  body="Selamat datang di Dashboard iHealth Edu. Temukan berbagai informasi dan fitur pendukung untuk menjaga kesehatan Anda, akses modul edukasi, serta tinjau riwayat skrining dan hasil tes secara mudah dan lengkap."
/>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <CardDashboardTitle
          title="Diabetes Melitus"
          icon={Syringe}
          description="Pelajari faktor risiko, pencegahan, dan kelola diabetes Anda."
          link="diabetes-melitus"
        />
        <CardDashboardTitle
          title="Hipertensi"
          icon={HeartPulse}
          description="Ketahui cara memantau tekanan darah dan hidup sehat."
          link="hipertensi"
        />
        <CardDashboardTitle
          title="Kesehatan Mental"
          icon={Brain}
          description="Cek kondisi mental dan dapatkan informasi dukungan psikologis."
          link="mental-health"
        />
        <CardDashboardTitle
          title="Riwayat"
          icon={History}
          description="Lihat riwayat lengkap skrining DSMQ, HSMBQ, DASS-21, serta Pre Test dan Post Test materi Anda."
          link="history"
        />
      </div>
    </>
  );
}
