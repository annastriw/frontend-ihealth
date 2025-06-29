import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import DashboardAdminReportDetailPostTestWrapper from "@/components/organisms/dashboard/admin/reports/post-test/DashboardAdminReportDetailPostTestWrapper";

interface DashboardAdminReportDetailPostTestPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardAdminReportDetailPostTestPage({
  params,
}: DashboardAdminReportDetailPostTestPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardTitleBold head="Detail Report Post-Test" />
      <DashboardAdminReportDetailPostTestWrapper id={id} />
    </section>
  );
}
