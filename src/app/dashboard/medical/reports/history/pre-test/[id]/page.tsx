// src/app/dashboard/medical/reports/history/pre-test/[id]/page.tsx

import DashboardMedicalReportHistoryPreTestWrapper from "@/components/organisms/dashboard/medical/reports/history/pre-test/DashboardMedicalReportHistoryPreTestWrapper";

interface DashboardMedicalReportHistoryPreTestPageProps {
  params: {
    id: string;
  };
}

export default async function DashboardMedicalReportHistoryPreTestPage({
  params,
}: DashboardMedicalReportHistoryPreTestPageProps) {
  const { id } = params;

  return (
    <section>
      <DashboardMedicalReportHistoryPreTestWrapper id={id} />
    </section>
  );
}
