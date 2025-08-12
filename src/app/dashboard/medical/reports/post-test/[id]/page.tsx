import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import DashboardMedicalReportDetailPostTestWrapper from "@/components/organisms/dashboard/medical/reports/post-test/DashboardMedicalReportDetailPostTestWrapper";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <section>
      <DashboardTitleBold head="Detail Report Post-Test Medis" />
      <DashboardMedicalReportDetailPostTestWrapper id={id} />
    </section>
  );
}
