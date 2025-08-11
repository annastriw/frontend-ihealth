import DashboardAdminReportHistoryPostTestWrapper from "@/components/organisms/dashboard/admin/reports/history/post-test/DashboardAdminReportHistoryPostTestWrapper";

interface DashboardAdminReportHistoryPostTestPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardAdminReportHistoryPostTestPage({
  params,
}: DashboardAdminReportHistoryPostTestPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardAdminReportHistoryPostTestWrapper id={id} />
    </section>
  );
}
