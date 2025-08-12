import DashboardMedicalReportHistoryPreTestWrapper from "@/components/organisms/dashboard/medical/reports/history/pre-test/DashboardMedicalReportHistoryPreTestWrapper";

interface DashboardMedicalReportHistoryPreTestPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardMedicalReportHistoryPreTestPage({
  params,
}: DashboardMedicalReportHistoryPreTestPageProps) {
  const { id } = await params;

  return (
    <section>
      <DashboardMedicalReportHistoryPreTestWrapper id={id} />
    </section>
  );
}
