"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardCAPDMaterialCount from "@/components/molecules/card/CardDashboardTitle";
import { History, MessageSquare, NotebookText, Search } from "lucide-react";

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
        head="Beranda"
        body="Selamat datang di halaman beranda iHealth Edu"
      />
    </>
  );
}
