import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardMedicalReportHistoryScreeningDSMQWrapper from "@/components/organisms/dashboard/medical/reports/history/screening-dsmq/DashboardMedicalReportHistoryScreeningDSMQWrapper";

export default function DashboardMedicalReportHistoryScreeningDSMQPage() {
  return (
    <section>
      <DashboardTitle
        head="Laporan Screening DSMQ Medis"
        body="Menampilkan daftar hasil screening DSMQ (Manajemen Diabetes) yang telah dikerjakan oleh pasien."
      />
      <DashboardMedicalReportHistoryScreeningDSMQWrapper />
    </section>
  );
}