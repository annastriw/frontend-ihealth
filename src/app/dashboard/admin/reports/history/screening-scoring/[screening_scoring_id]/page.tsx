//src/app/dashboard/admin/reports/history/screening-scoring/[id]/page.tsx
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminReportHistoryScreeningScoringWrapper from "@/components/organisms/dashboard/admin/reports/history/screening-scoring/DashboardAdminReportHistoryScreeningScoringWrapper";

interface DashboardAdminReportHistoryScreeningScoringPageProps {
  params: Promise<{ screening_scoring_id: string }>;
}

export default async function DashboardAdminReportHistoryScreeningScoringPage({
  params,
}: DashboardAdminReportHistoryScreeningScoringPageProps) {
  const { screening_scoring_id } = await params;

  return (
    <section>
      <DashboardTitle
        head="Laporan Screening Skoring"
        body="Menampilkan detail laporan keseluruhan screening skoring"
      />
      <DashboardAdminReportHistoryScreeningScoringWrapper id={screening_scoring_id} />
    </section>
  );
}

