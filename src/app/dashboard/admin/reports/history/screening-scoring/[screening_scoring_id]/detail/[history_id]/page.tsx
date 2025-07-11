import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminReportScreeningScoringDetailWrapper from "@/components/organisms/dashboard/admin/reports/screening-scoring/DashboardAdminReportScreeningScoringDetailWrapper";

export const metadata: Metadata = {
  title: "Detail Riwayat Screening",
};

// ✅ Ganti nama interfacing agar tidak tabrakan
interface Props {
  params: {
    screening_scoring_id: string;
    history_id: string;
  };
}

export default async function Page({ params }: Props) {
  const session = await getServerSession(authOptions);

  // AuthGuard: hanya admin yang boleh akses
  if (!session || session.user.role !== "admin") {
    redirect("/dashboard"); // ✅ jangan return redirect, cukup langsung panggil
  }

  const { screening_scoring_id, history_id } = params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening Skoring"
        body="Menampilkan jawaban pengguna dan total skor"
      />
      <DashboardAdminReportScreeningScoringDetailWrapper
        screeningScoringId={screening_scoring_id}
        historyId={history_id}
      />
    </section>
  );
}
