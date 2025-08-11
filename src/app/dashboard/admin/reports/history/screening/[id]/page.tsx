import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminReportHistoryScreeningWrapper from "@/components/organisms/dashboard/admin/reports/history/screening/DashboardAdminReportHistoryScreeningWrapper";

interface DashboardAdminReportHistoryScreeningPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardAdminReportHistoryScreeningPage({
  params,
}: DashboardAdminReportHistoryScreeningPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardTitle
        head="Laporan Screening"
        body="Menampilkan detail laporan keseluruhan screening"
      />
      <DashboardAdminReportHistoryScreeningWrapper id={id} />
    </section>
  );
}
