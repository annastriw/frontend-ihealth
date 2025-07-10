// src/app/dashboard/admin/reports/history/screening-scoring/[screening_scoring_id]/detail/[history_id]/page.tsx

import { Metadata } from "next";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminReportScreeningScoringDetailWrapper from "@/components/organisms/dashboard/admin/reports/screening-scoring/DashboardAdminReportScreeningScoringDetailWrapper";

type PageProps = {
  params: {
    screening_scoring_id: string;
    history_id: string;
  };
};

export const metadata: Metadata = {
  title: "Detail Riwayat Screening",
};

export default function Page({ params }: PageProps) {
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