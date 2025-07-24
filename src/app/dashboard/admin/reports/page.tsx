import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminReportWrapper from "@/components/organisms/dashboard/admin/reports/DashboardAdminReportsWrapper";

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
