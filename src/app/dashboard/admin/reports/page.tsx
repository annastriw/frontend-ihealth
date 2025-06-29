import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminReportWrapper from "@/components/organisms/dashboard/admin/reports/DashboardAdminReportsWrappper";

export default function DashboardAdminReportsPage() {
  return (
    <section>
      <DashboardTitle
        head="Laporan Keseluruhan"
        body="Menampilkan semua laporan keseluruhan"
      />
      <DashboardAdminReportWrapper />
    </section>
  );
}
