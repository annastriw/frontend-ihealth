import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardMedicalReportHistoryScreeningDASSWrapper from "@/components/organisms/dashboard/medical/reports/history/screening-dass/DashboardMedicalReportHistoryScreeningDASSWrapper";

export default function DashboardMedicalReportHistoryScreeningDASSPage() {
  return (
    <section>
      <DashboardTitle
        head="Laporan Screening DASS-21 Medis"
        body="Menampilkan daftar hasil screening DASS-21 yang telah dikerjakan oleh tenaga medis"
      />
      <DashboardMedicalReportHistoryScreeningDASSWrapper />
    </section>
  );
}
