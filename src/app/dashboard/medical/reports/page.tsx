import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardMedicalReportWrapper from "@/components/organisms/dashboard/medical/reports/DashboardMedicalReportsWrapper";

export default function DashboardMedicalReportsPage() {
  return (
    <section>
      <DashboardTitle
        head="Laporan Keseluruhan"
        body="Menampilkan semua laporan keseluruhan"
      />
      <DashboardMedicalReportWrapper />
    </section>
  );
}
