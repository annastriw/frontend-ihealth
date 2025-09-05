import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardMedicalReportHistoryScreeningHSMBQWrapper from "@/components/organisms/dashboard/medical/reports/history/screening-hsmbq/DashboardMedicalReportHistoryScreeningHSMBQWrapper";

export default function DashboardMedicalReportHistoryScreeningHSMBQPage() {
  return (
    <section>
      <DashboardTitle
        head="Laporan Screening HSMBQ"
        body="Menampilkan daftar hasil screening HSMBQ (Hipertensi) yang telah dikerjakan oleh pengguna"
      />
      <DashboardMedicalReportHistoryScreeningHSMBQWrapper />
    </section>
  );
}