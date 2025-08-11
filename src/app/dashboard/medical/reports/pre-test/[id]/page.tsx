import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import DashboardMedicalReportDetailPreTestWrapper from "@/components/organisms/dashboard/medical/reports/pre-test/DashboardMedicalReportDetailPreTestWrapper";

interface DashboardMedicalDetailReportPreTestPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardMedicalDetailReportPreTestPage({
  params,
}: DashboardMedicalDetailReportPreTestPageProps) {
  const { id } = await params;

  return (
    <section>
      <DashboardTitleBold head="Detail Report Pre-Test" />
      <DashboardMedicalReportDetailPreTestWrapper id={id} />
    </section>
  );
}

