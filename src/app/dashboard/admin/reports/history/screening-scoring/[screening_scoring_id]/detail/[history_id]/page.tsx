import { Metadata } from "next";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminReportScreeningScoringDetailWrapper from "@/components/organisms/dashboard/admin/reports/screening-scoring/DashboardAdminReportScreeningScoringDetailWrapper";
import AdminAuthGuard from "@/components/guards/AdminAuthGuard"; // ✅

export const metadata: Metadata = {
  title: "Detail Riwayat Screening",
};

export default function Page({
  params,
}: {
  params: { screening_scoring_id: string; history_id: string };
}) {
  const { screening_scoring_id, history_id } = params;

  return (
    <AdminAuthGuard>
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
    </AdminAuthGuard>
  );
}
