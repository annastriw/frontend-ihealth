// src/app/dashboard/medical/reports/history/post-test/[id]/page.tsx

import DashboardMedicalReportHistoryPostTestWrapper from "@/components/organisms/dashboard/medical/reports/history/post-test/DashboardMedicalReportHistoryPostTestWrapper";

interface DashboardMedicalReportHistoryPostTestPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardMedicalReportHistoryPostTestPage({
  params,
}: DashboardMedicalReportHistoryPostTestPageProps) {
  const { id } = await params;

  return (
    <section>
      <DashboardMedicalReportHistoryPostTestWrapper id={id} />
    </section>
  );
}
