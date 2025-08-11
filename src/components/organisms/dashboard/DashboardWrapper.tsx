"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardCAPDMaterialCount from "@/components/molecules/card/CardDashboardTitle";
import { History, HeartPulse, Syringe, Brain } from "lucide-react";

export default function DashboardWrapper() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    if (session.user.role === "admin") {
      router.push("/dashboard/admin");
    } else if (session.user.role === "medical_personal") {
      router.push("/dashboard/medical");
    }
  }, [session, status, router]);

  if (!session || session.user.role !== "user") return null;

  return (
    <>
      <DashboardTitle
        head="Beranda"
        body="Selamat datang di halaman beranda iHealth Edu"
      />
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <CardCAPDMaterialCount
            title="Diabetes Melitus"
            icon={Syringe}
            link="diabetes-melitus"
          />
          <CardCAPDMaterialCount
            title="Hipertensi"
            icon={HeartPulse}
            link="hipertensi"
          />
          <CardCAPDMaterialCount
            title="Kesehatan Mental"
            icon={Brain}
            link="mental-health"
          />
          <CardCAPDMaterialCount
            title="Riwayat"
            icon={History}
            link="history"
          />
        </div>
      </div>
    </>
  );
}
