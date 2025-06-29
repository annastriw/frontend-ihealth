import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import DashboardAdminReportDetailPreTestWrapper from "@/components/organisms/dashboard/admin/reports/pre-test/DashboardAdminReportDetailPreTestWrapper";

interface DashboardAdminDetailReportPreTestPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardAdminDetailReportPreTestPage({
  params,
}: DashboardAdminDetailReportPreTestPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardTitleBold head="Detail Report Pre-Test" />
      <DashboardAdminReportDetailPreTestWrapper id={id} />
    </section>
  );
}
