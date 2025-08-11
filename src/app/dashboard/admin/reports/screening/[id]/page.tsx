import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import DashboardAdminReportScreeningDetailWrapper from "@/components/organisms/dashboard/admin/reports/screening/DashboardAdminReportScreeningDetailWrapper";

interface DashboardAdminDetailReportScreeningPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardAdminDetailReportScreeningPage({
  params,
}: DashboardAdminDetailReportScreeningPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardTitleBold head="Detail Report Screening" />
      <DashboardAdminReportScreeningDetailWrapper id={id} />
    </section>
  );
}
